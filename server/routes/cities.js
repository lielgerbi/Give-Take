const express = require('express');
var router = express.Router();
const citiesController = require('../controllers/cities');

router.route('/')
   .get(citiesController.getCities)


module.exports = router;