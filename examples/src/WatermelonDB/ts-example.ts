// tslint:disable: max-classes-per-file
import { Database } from '@react-native-ohos/watermelondb/src'
import { setGenerator } from '@react-native-ohos/watermelondb/src/utils/common/randomId'
import SQLiteAdapter from "@react-native-ohos/watermelondb/src/adapters/sqlite"
import { SyncDatabaseChangeSet, synchronize } from "@react-native-ohos/watermelondb/src/sync"
import { AppSchema } from "./AppSchema"
import { Blog, Post } from "./model"
// import './__typetests__'
// Create an enum for all Table Names.
// This will help in documenting where all exact table names need to be passed.




// Define a custom ID generator.
function randomString(): string {
  return 'RANDOM STRING'
}

setGenerator(randomString)

// or as anonymous function:
setGenerator(() => 'RANDOM STRING')

const adapter = new SQLiteAdapter({
  dbName: "WatermelonDemo",
  schema: AppSchema,
  onSetUpError: (error) => { 
    console.log('%c onSetUpError error:', 'color: #0e93e0;background: #aaefe5;', error);
  },
})

export const db = new Database({
  adapter,
  modelClasses: [Blog, Post],
})

export const runSync = async () => {
  return synchronize({
    database: db,
    async pullChanges({ lastPulledAt, schemaVersion, migration }) {
      // just for demo purposes, this should come from the server
      const serverTS = new Date().getTime()
      const serverChanges: SyncDatabaseChangeSet = {
        posts: {
          created: [],
          updated: [],
          deleted: ["some-id"],
        },
      }

      return { changes: serverChanges, timestamp: serverTS }
    },
    async pushChanges({ changes, lastPulledAt }) {
      return undefined
    },
  })
}