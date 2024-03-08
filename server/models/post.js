const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    userName: {
        type: String,//reference to the user who posted it
        required: true
    },
    categoryName: {
        type: String,//reference to the group (null if it's a personal post)
        required: false
    },
    details: {
        type: String,
        required: false
    },
    photo: {
        type: String,//url to the post's photo, if any
        required: false 
    },
    subCategory: {
        type: String,
        required: false 
    },
    isAvailable:{
        type: Boolean,
        required: false
    },
    city:{
        type:String,
        required:false
    },
    comments:{
        type: Array,
        required: false
    }
});
const db=mongoose.connection.useDb('give&take')
module.exports = db.model('Post', Post);