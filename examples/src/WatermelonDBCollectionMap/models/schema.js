import { appSchema, tableSchema } from "@react-native-ohos/watermelondb";

// 定义测试 Schema
// export const mySchema = appSchema({
//   version: 1,
//   tables: [
//     tableSchema({
//       name: 'mock_tasks',
//       columns: [
//         { name: 'name', type: 'string' },
//         { name: 'is_completed', type: 'boolean' }
//       ]
//     }),
//     tableSchema({
//       name: 'mock_projects',
//       columns: [
//         { name: 'body', type: 'string' },
//         { name: 'task_id', type: 'string', isIndexed: true }
//       ]
//     })
//   ]
// });

// 从 mockDatabase 改造为 WatermelonDB 标准 Schema 格式
export const mockDatabaseSchema = appSchema({
  // Schema 版本号（WatermelonDB 必选，默认填 1 即可）
  version: 1,
  // 表定义数组（对应 mockDatabase 中 tables 里的 key）
  tables: [
    // 对应 mock_projects 表
    tableSchema({
      name: 'mock_projects',
      // 字段定义（mockDatabase 无字段信息，这里示例补充通用字段，可根据实际需求调整）
      columns: [
        // 示例字段1：内容字段（字符串类型）
        { name: 'body', type: 'string' },
        // 示例字段2：关联 task 的 ID（字符串类型，加索引）
        { name: 'task_id', type: 'string', isIndexed: true },
        // 可根据实际需求追加更多字段，比如：
        // { name: 'created_at', type: 'number' }, // 时间戳
      ]
    }),
    // 对应 mock_tasks 表
    tableSchema({
      name: 'mock_tasks',
      columns: [
        // 示例字段1：任务名称（字符串类型）
        { name: 'name', type: 'string' },
        // 示例字段2：完成状态（布尔类型）
        { name: 'is_completed', type: 'boolean' },
      ]
    })
  ]
});
