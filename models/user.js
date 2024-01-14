const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
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

module.exports = mongoose.model('User', User);