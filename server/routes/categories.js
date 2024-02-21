 const express = require('express');
 var router = express.Router();
 const categoriesController = require('../controllers/categories');

router.route('/')
    .get(categoriesController.getCategories)

router.route('/:categoryName')
    .get(categoriesController.getCategoryByName);


//TODO: add get Post To View Between Dates 

module.exports = router;