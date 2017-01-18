import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const FacebookPosts = new SimpleSchema({
  _id: {
    type: String
  },
  owner: {
    type: String,
    optional: true
  },
  post: {
    type: String
  }
});
