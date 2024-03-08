const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    subCategories: {
        type: Array,
        required: false
    }

});
const db=mongoose.connection.useDb('give&take')
module.exports = db.model('Category', Category);