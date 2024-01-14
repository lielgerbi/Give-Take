const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    postID: {
        type: Number,
        required: true
    },
    userName: {
        type: String,//reference to the user who posted it
        required: true
    },
    categoryName: {
        type: String,//reference to the group (null if it's a personal post)
        required: false
    },
    text: {
        type: String,
        required: true
    },
    photo: {
        type: String,//url to the post's photo, if any
        required: false 
    },
    date: {
        type: Date,
        required: true
    },
    subCategory: {
        type: String,
        required: false 
    },
    isAvailable:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Post', Post);