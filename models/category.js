const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    
    categoryID: {
        type: Int,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    subCategories: {
        type: Array,
        required: false
    }

});

module.exports = mongoose.model('category', Category);