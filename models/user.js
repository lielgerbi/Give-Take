const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },

    userName: {
        type: String,
        required: true
    },
    password: {
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
    birthDate: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String
    },
    isManager: {
        type: Boolean,
        required: true
    }
});
const db=mongoose.connection.useDb('give&take')
module.exports = db.model('Users', User);