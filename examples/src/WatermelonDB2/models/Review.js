import { Model } from "@react-native-ohos/watermelondb";
import { field, relation } from "@react-native-ohos/watermelondb/src/decorators";

export default class Review extends Model {
  static table = "reviews";

  static associations = {
    movie: { type: "belongs_to", key: "movie_id" }
  };

  @field("body") body;

  @relation("movies", "movie_id") movie;

  async deleteReview() {
    await this.markAsDeleted() // syncable
    await this.destroyPermanently() // permanent
  }
}