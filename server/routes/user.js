const express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
const authenticate = require("../refreshMiddleware");


// routes/users.js

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           example: {"newUser": {"userName": "newUser", "password": "password", "firstName": "John", "lastName": "Doe", "email": "newuser@example.com", "photo": "photolink"}}
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example: {"userName": "newUser", "password": "password", "firstName": "John", "lastName": "Doe", "email": "newuser@example.com", "photo": "photolink"}
 *       '500':
 *         description: User name already exists
 *         content:
 *           application/json:
 *             example: {"errors": ["User name exists"]}
 */
router.post('/',userController.createUser);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"userName": "user", "password": "password", "firstName": "Adi", "lastName": "Levi", "email": "user@gmail.com", "isManager": false, "photo": "photolink"}]
 *       '401':
 *         description: Unauthorized, invalid or missing authentication token
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized"}
 */
router.get('/',authenticate,userController.getUsers);
/**
 * @swagger
 * /users/user:
 *   get:
 *     summary: Get user by username and password
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: userName
 *         required: true
 *         description: User's username
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         description: User's password
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"userName": "user", "password": "password", "firstName": "Adi", "lastName": "Levi", "email": "user@gmail.com", "isManager": false, "photo": "photolink"}
 *         headers:
 *           Authorization:
 *             description: Bearer token for authentication
 *             schema:
 *               type: string
 *           refreshToken:
 *             description: Token for refreshing the access token
 *             schema:
 *               type: string
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example: {"errors": ["User not found"]}
 */
router.get('/user', userController.getUser);
/**
 * @swagger
 * /users/user:
 *   post:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User data to update
 *       required: true
 *       content:
 *         application/json:
 *           example: {"userName": "user", "firstName": "John", "lastName": "Doe", "email": "user@example.com", "password": "newpassword", "photo": "newphotolink"}
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example: {"userName": "user", "firstName": "John", "lastName": "Doe", "email": "user@example.com", "password": "newpassword", "photo": "newphotolink"}
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example: {"errors": ["User not found"]}
 *       '401':
 *         description: Unauthorized, invalid or missing authentication token
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized"}
 */
router.post('/user',authenticate,userController.updateUser);

module.exports = router;