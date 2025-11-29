#!/usr/bin/env node

import {
  pipe,
  filter,
  map,
  mapAsync,
  endsWith,
  both,
  prop,
  replace,
  omit,
  merge,
  forEach,
} from 'rambdax'

import babel from '@babel/core'
import klaw from 'klaw-sync'
import mkdirp from 'mkdirp'
import path from 'path'
import fs from 'fs-extra'
import glob from 'glob'
import { fileURLToPath } from 'url'
import prettyJson from 'json-stringify-pretty-compact'
import chokidar from 'chokidar'
import anymatch from 'anymatch'
import rimraf from 'rimraf'

import pkg from './pkg.cjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const resolvePath = (...paths) => path.resolve(__dirname, '..', ...paths)

const SRC_MODULES = 'src'
const CJS_MODULES = 'cjs'

const SOURCE_PATH = resolvePath('src')
const DIST_PATH = resolvePath('dist')

const DIR_PATH = DIST_PATH

const DO_NOT_BUILD_PATHS = [
  /__tests__/,
  /__typetests__/,
  /__playground__/,
  /test\.js/,
  /integrationTest/,
  /__mocks__/,
  /\.DS_Store/,
  /package\.json/,
]

const isNotIncludedInBuildPaths = (value) => !anymatch(DO_NOT_BUILD_PATHS, value)

const cleanFolder = (dir) => rimraf.sync(dir)

const takeFiles = pipe(prop('path'), both(endsWith('.js'), isNotIncludedInBuildPaths))

const takeModules = pipe(filter(takeFiles), map(prop('path')))

const createModulePath = (format) => {
  const formatPathSegment = format === CJS_MODULES ? [] : [format]
  const modulePath = resolvePath(DIR_PATH, ...formatPathSegment)
  return replace(SOURCE_PATH, modulePath)
}

const createFolder = (dir) => mkdirp.sync(resolvePath(dir))

const babelTransform = (format, file) => {
  if (format === SRC_MODULES) {
    // no transform, just return source
    return fs.readFileSync(file)
  }

  const { code } = babel.transformFileSync(file, {})
  return code
}

const paths = klaw(SOURCE_PATH)
const modules = takeModules(paths)

const buildModule = (format) => (file) => {
  const modulePath = createModulePath(format)
  const code = babelTransform(format, file)
  const filename = modulePath(file)

  createFolder(path.dirname(filename))
  fs.writeFileSync(filename, code)
}

const prepareJson = pipe(
  omit(['scripts']),
  merge({
    main: './index.js',
    sideEffects: false,
    types: 'index.d.ts',
  }),
  (obj) => prettyJson(obj),
)

const createPackageJson = (dir, obj) => {
  const json = prepareJson(obj)
  fs.writeFileSync(resolvePath(dir, 'package.json'), json)
}

const copyFiles = (dir, files, rm = resolvePath()) =>
  forEach((file) => {
    fs.copySync(file, path.join(dir, replace(rm, '', file)))
  }, files)

const copyNonJavaScriptFiles = (buildPath) => {
  createPackageJson(buildPath, pkg)
  console.log('%c watermelondbConsoleLogger buildPath:', 'color: #0e93e0;background: #aaefe5;', buildPath);
  copyFiles(buildPath, [
    'LICENSE',
    // 'README.md',
    // 'yarn.lock',
    'WatermelonDB.podspec',
    'react-native.config.js', // NOTE: this is needed for autolinking
    // 'docs',
    'native/shared',
    'harmony',
    'src/specs'
  ])
  
  // Copy specs folder to root directory as well
  const specsSourcePath = resolvePath('src/specs')
  const specsDestPath = path.join(buildPath, 'specs')
  if (fs.existsSync(specsSourcePath)) {
    fs.copySync(specsSourcePath, specsDestPath)
  }
  
  cleanFolder(`${buildPath}/native/ios/WatermelonDB.xcodeproj/xcuserdata`)
  cleanFolder(`${buildPath}/native/android/build`)
  cleanFolder(`${buildPath}/native/android/bin/build`)
  cleanFolder(`${buildPath}/native/android-jsi/.cxx`)
  cleanFolder(`${buildPath}/native/android-jsi/.externalNativeBuild`)
  cleanFolder(`${buildPath}/native/android-jsi/build`)
  cleanFolder(`${buildPath}/native/android-jsi/bin/build`)
  cleanFolder(`${buildPath}/native/windows/.vs`)
  cleanFolder(`${buildPath}/native/windows/x64`)
  cleanFolder(`${buildPath}/native/windows/WatermelonDB/Generated Files`)
  cleanFolder(`${buildPath}/native/windows/WatermelonDB/obj`)
  cleanFolder(`${buildPath}/native/windows/WatermelonDB/x64`)
}

const buildModules = (format) => mapAsync(buildModule(format))
const buildCjsModules = buildModules(CJS_MODULES)
const buildSrcModules = buildModules(SRC_MODULES)

console.log('111')
cleanFolder(DIST_PATH)
console.log('222')
createFolder(DIST_PATH)
console.log('333')
copyNonJavaScriptFiles(DIST_PATH)
console.log('444')

buildSrcModules(modules)
console.log('555')
buildCjsModules(modules)
console.log('666')

// copy typescript definitions
glob(`${SOURCE_PATH}/**/*.d.ts`, {}, (err, files) => {
  if (err) {
    console.error('Error globbing TypeScript definition files:', err)
    return
  }
  files.forEach((file) => {
    // Calculate relative path from SOURCE_PATH to file
    const relativePath = path.relative(SOURCE_PATH, file)
    const destPath = path.join(DIST_PATH, relativePath)
    // Ensure destination directory exists
    createFolder(path.dirname(destPath))
    fs.copySync(file, destPath)
  })
})
