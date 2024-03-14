import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
  userName: string;
  categoryName?: string;
  details?: string;
  photo?: string;
  subCategory?: string;
  isAvailable?: boolean;
  city?: string;
  comments?: object[];
}

const postSchema: Schema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: false,
  },
  details: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  subCategory: {
    type: String,
    required: false,
  },
  isAvailable: {
    type: Boolean,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  comments: {
    type: [Object],
    required: false,
  },
});

const PostModel: Model<IPost> = mongoose.connection.useDb('give&take').model<IPost>('Post', postSchema);

export default PostModel;