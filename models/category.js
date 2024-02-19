const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    
    categoryID: {
        type: String,
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

module.exports = mongoose.model('Category', Category);