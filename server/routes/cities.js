// const express = require('express');
// var router = express.Router();
// const citiesController = require('../controllers/cities');
// const authenticate = require("../refreshMiddleware");

// /**
//  * @swagger
//  * tags:
//  *   name: Cities
//  *   description: API for managing cities
//  */
// /**
//  * @swagger
//  * /cities:
//  *   get:
//  *     summary: Get all cities
//  *     tags: [Cities]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       '200':
//  *         description: Successful response
//  *         content:
//  *           application/json:
//  *             example: [{"_id":"id","name": "City1"}, {"_id":"id","name": "City2"}]
//  *       '401':
//  *         description: Unauthorized, invalid or missing authentication token
//  *         content:
//  *           application/json:
//  *             example: {"error": "Unauthorized"}
//  */
// router.get('/',authenticate,citiesController.getCities);

// module.exports = router;