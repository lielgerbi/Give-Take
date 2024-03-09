const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    isManager: {
        type: Boolean,
        required: false
    },
    photo:{
        type: String,//url to the post's photo, if any
        required: false 
    }
});

const db=mongoose.connection.useDb('give&take')
module.exports = db.model('Users', User);