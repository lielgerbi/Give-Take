 const express = require('express');
 var router = express.Router();
 const categoriesController = require('../controllers/categories');
 const authenticate = require("../refreshMiddleware");

 /**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */
 /**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"_id":"id","name": "Category1"}, {"_id":"id","name": "Category2"}]
 *       '401':
 *         description: Unauthorized, invalid or missing authentication token
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized"}
 */
router.get('/',authenticate,categoriesController.getCategories);


module.exports = router;