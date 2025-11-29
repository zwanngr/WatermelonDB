import { db } from './ts-example';
import {
  Database,
  Model,
  Q,
  Query,
  Relation,
} from '@react-native-ohos/watermelondb';
import SQLiteAdapter from '@react-native-ohos/watermelondb/adapters/sqlite';
import { Blog, Post } from './model';
import { TableName } from './constants';

// const blogsCollection = db.collections.get<Blog>(TableName.BLOGS)
// const postsCollection = db.collections.get<Post>(TableName.POSTS)

export async function resetDemoData() {
  console.log('%c  db:', 'color: #0e93e0;background: #aaefe5;', db);
  // console.log('%c  Database:', 'color: #0e93e0;background: #aaefe5;', Database);
  // console.log(
  //   '%c  SQLiteAdapter:',
  //   'color: #0e93e0;background: #aaefe5;',
  //   SQLiteAdapter,
  // );

  //   await db.write(async () => {
  //     const posts = await postsCollection.query().fetch()
  //     await Promise.all(posts.map((post) => post.destroyPermanently()))

  //     const blogs = await blogsCollection.query().fetch()
  //     await Promise.all(blogs.map((blog) => blog.destroyPermanently()))
  //   })
}

// export async function seedDemoData() {
//   return db.write(async () => {
//     const blog = await blogsCollection.create((newBlog) => {
//       newBlog.name = 'WatermelonDB Demo'
//     })

//     await postsCollection.create((newPost) => {
//       newPost.blog.set(blog)
//       newPost.name = '第一篇文章'
//       newPost.content = '欢迎来到 WatermelonDB demo'
//       newPost.isNasty = false
//     })

//     await postsCollection.create((newPost) => {
//       newPost.blog.set(blog)
//       newPost.name = '需要审核的文章'
//       newPost.content = '这是一篇需要审核的文章'
//       newPost.isNasty = true
//     })

//     return blog
//   })
// }

// export async function fetchDemoResult(blog: Blog) {
//   const posts = await blog.posts.fetch()
//   const nastyPosts = await blog.nastyPosts.fetch()

//   return {
//     blogName: blog.name,
//     totalPosts: posts.length,
//     nastyPosts: nastyPosts.length,
//     firstPostBody: posts[0]?.content,
//   }
// }

export async function runWatermelonDemo() {
  console.log(
    '%c WechatLibTurboModuleLogger runWatermelonDemo2:',
    'color: #0e93e0;background: #aaefe5;',
    'runWatermelonDemo',
  );
  await resetDemoData();
  //   const blog = await seedDemoData()

  //   const beforeModeration = await fetchDemoResult(blog)
  //   await db.write(async () => {
  //     await blog.moderateAll()
  //   })
  //   const afterModeration = await fetchDemoResult(blog)

  //   return { beforeModeration, afterModeration }
}

// export { runSync }

// declare const module: any
// declare const require: any

// if (typeof module !== 'undefined' && typeof require !== 'undefined' && require.main === module) {
//   runWatermelonDemo()
//     .then((result) => {
//       console.log('WatermelonDB demo result:', JSON.stringify(result, null, 2))
//       return runSync()
//     })
//     .then(() => {
//       console.log('Sync flow executed(模拟环境)')
//     })
//     .catch((error: unknown) => {
//       console.error('WatermelonDB demo failed', error)
//     })
// }
