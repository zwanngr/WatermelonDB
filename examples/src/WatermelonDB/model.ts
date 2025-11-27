import { Model, Q, Query, Relation } from '@react-native-ohos/watermelondb/src';
import {
  action,
  children,
  field,
  lazy,
  relation,
  text,
} from '@react-native-ohos/watermelondb/src/decorators';
import { Associations } from '@react-native-ohos/watermelondb/src/Model';
import { TableName } from './constants';

export class Blog extends Model {
  static table = TableName.BLOGS;

  static associations: Associations = {
    [TableName.POSTS]: { type: 'has_many', foreignKey: 'blog_id' },
  };

  @field('name') name: string;

  @children(TableName.POSTS) posts!: Query<Post>;

  @lazy nastyPosts = this.posts.extend(Q.where('is_nasty', true));

  @action async moderateAll() {
    await this.nastyPosts.destroyAllPermanently();
  }
}

export class Post extends Model {
  static table = TableName.POSTS;

  static associations: Associations = {
    [TableName.BLOGS]: { type: 'belongs_to', key: 'blog_id' },
  };

  @field('name') name!: string;
  @text('body') content!: string;
  @field('is_nasty') isNasty!: boolean;

  @relation(TableName.BLOGS, 'blog_id') blog!: Relation<Blog>;
}
