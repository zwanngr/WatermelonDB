import { Model } from '@nozbe/watermelondb'
import { relation, text, writer } from '@nozbe/watermelondb/decorators'

export default class Note extends Model {
  static table = 'notes'

  static associations = {
    tasks: { type: 'belongs_to', key: 'task_id' },
  }

  @text('body') body
  @relation('tasks', 'task_id') task

  @writer async updateBody(nextBody) {
    await this.update((note) => {
      note.body = nextBody
    })
  }
}

