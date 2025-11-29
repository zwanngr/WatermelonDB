const {mergeConfig, getDefaultConfig} = require('@react-native/metro-config');
const {createHarmonyMetroConfig} = require('@react-native-oh/react-native-harmony/metro.config');
const path = require('path');
const fs = require('fs');

/**
 * @type {import("metro-config").ConfigT}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // resolver: {
  //   resolveRequest: (context, moduleName, platform) => {
  //     // 处理 @react-native-ohos/watermelondb 的子路径导入
  //     // 当使用 file:../ 时，需要映射到项目根目录的 src 目录
  //     if (moduleName.startsWith('@react-native-ohos/watermelondb/')) {
  //       const subPath = moduleName.replace('@react-native-ohos/watermelondb/', '');
  //       // 映射到项目根目录（examples 的上一级）的 src 目录
  //       const watermelonPath = path.resolve(__dirname, '../src');
  //       const resolvedPath = path.resolve(watermelonPath, subPath);
        
  //       // 尝试不同的文件扩展名
  //       const extensions = ['', '.js', '.jsx', '.ts', '.tsx'];
  //       for (const ext of extensions) {
  //         const fullPath = resolvedPath + ext;
  //         if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
  //           return {
  //             type: 'sourceFile',
  //             filePath: fullPath,
  //           };
  //         }
  //       }
  //       // 如果找不到文件，尝试作为目录（查找 index.js）
  //       const indexPath = path.join(resolvedPath, 'index.js');
  //       if (fs.existsSync(indexPath)) {
  //         return {
  //           type: 'sourceFile',
  //           filePath: indexPath,
  //         };
  //       }
  //       // 如果还是找不到，尝试查找目录本身
  //       if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
  //         const dirIndexPath = path.join(resolvedPath, 'index.js');
  //         if (fs.existsSync(dirIndexPath)) {
  //           return {
  //             type: 'sourceFile',
  //             filePath: dirIndexPath,
  //           };
  //         }
  //       }
  //     }
  //     // 对于我们不处理的模块，或者找不到文件的模块，返回 null
  //     // Metro 会使用内置的默认解析逻辑
  //     return null;
  //   },
  // },
};

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  createHarmonyMetroConfig({
    reactNativeHarmonyPackageName: '@react-native-oh/react-native-harmony',
  }),
  config,
);
