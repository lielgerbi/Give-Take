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
        required: true
    },
    isManager: {
        type: Boolean,
        required: true
    }
});

const db=mongoose.connection.useDb('give&take')
module.exports = db.model('Users', User);