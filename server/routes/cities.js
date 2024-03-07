const express = require('express');
var router = express.Router();
const citiesController = require('../controllers/cities');
const authenticate = require("../refreshMiddleware");//todo add auth

router.get('/',authenticate,citiesController.getCities);

// router.route('/')
//    .get(citiesController.getCities)


module.exports = router;