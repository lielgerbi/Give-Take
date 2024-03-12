import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
  userName: string;
  categoryName?: string;
  details?: string;
  photo?: string;
  subCategory?: string;
  isAvailable?: boolean;
  city?: string;
  comments?: string[];
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
    type: [String],
    required: false,
  },
});

const PostModel: Model<IPost> = mongoose.connection.useDb('give&take').model<IPost>('Post', postSchema);

export default PostModel;




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const Post = new Schema({
//     userName: {
//         type: String,//reference to the user who posted it
//         required: true
//     },
//     categoryName: {
//         type: String,//reference to the group (null if it's a personal post)
//         required: false
//     },
//     details: {
//         type: String,
//         required: false
//     },
//     photo: {
//         type: String,//url to the post's photo, if any
//         required: false 
//     },
//     subCategory: {
//         type: String,
//         required: false 
//     },
//     isAvailable:{
//         type: Boolean,
//         required: false
//     },
//     city:{
//         type:String,
//         required:false
//     },
//     comments:{
//         type: Array,
//         required: false
//     }
// });
// const db=mongoose.connection.useDb('give&take')
// module.exports = db.model('Post', Post);