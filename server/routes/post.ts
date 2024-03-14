import express, { Router } from 'express';
import postController from '../controllers/post';
import authenticate from '../refreshMiddleware';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"_id":"id","userName": "User","categoryName":"clothes-women", "subCategory":"shoes", "isAvailable": "true","details":"details","city":"city", "comments":"comments", "photo":"link t photo"}]
 *       '401':
 *         description: Unauthorized, invalid or missing authentication token
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized"}
 */
router.get('/', authenticate, postController.getPostsController);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Post data
 *       required: true
 *       content:
 *         application/json:
 *           example: {"userName": "User","categoryName":"clothes-women", "subCategory":"shoes", "isAvailable": "true","details":"details","city":"city", "comments":"comments", "photo":"link t photo"}
 *     responses:
 *       '200':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             example: {"_id":"id","userName": "User","categoryName":"clothes-women", "subCategory":"shoes", "isAvailable": "true","details":"details","city":"city", "comments":"comments", "photo":"link t photo"}
 *       '401':
 *         description: Unauthorized, invalid or missing authentication token
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized"}
 */
router.post('/', authenticate, postController.createPostController);

/**
 * @swagger
 * /posts/getPostByUser:
 *   get:
 *     summary: Get posts by user
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userName
 *         required: true
 *         description: User's username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"_id":"id","userName": "User","categoryName":"clothes-women", "subCategory":"shoes", "isAvailable": "true","details":"details","city":"city", "comments":"comments", "photo":"link t photo"}]
 *       '401':
 *         description: Unauthorized, invalid or missing authentication token
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized"}
 */
router.get('/getPostByUser', authenticate, postController.getPostByUserController);

/**
 * @swagger
 * /posts/delete:
 *   post:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Post data
 *       required: true
 *       content:
 *         application/json:
 *           example: {"post": {"_id": "123456789012345678901234"}}
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *       '404':
 *         description: Post not found
 *         content:
 *           application/json:
 *             example: {"errors": ["Post not found"]}
 *       '401':
 *         description: Unauthorized, invalid or missing authentication token
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized"}
 */
router.post('/delete', authenticate, postController.deletePostController);

/**
 * @swagger
 * /posts/update:
 *   post:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Post data to update
 *       required: true
 *       content:
 *         application/json:
 *           example: {"_id":"id","userName": "User","categoryName":"clothes-women", "subCategory":"shoes", "isAvailable": "true","details":"details","city":"Newcity", "comments":"comments", "photo":"link t photo"}
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             example: {"_id":"id","userName": "User","categoryName":"clothes-women", "subCategory":"shoes", "isAvailable": "true","details":"details","city":"Newcity", "comments":"comments", "photo":"link t photo"}
 *       '404':
 *         description: Post not found
 *         content:
 *           application/json:
 *             example: {"errors": ["Post not found"]}
 *       '401':
 *         description: Unauthorized, invalid or missing authentication token
 *         content:
 *           application/json:
 *             example: {"error": "Unauthorized"}
 */
router.post('/update', authenticate, postController.updatePostController);


/**
 * @swagger
 * posst/getPostID/{postID}:
 *   get:
 *     summary: Get Post by ID
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         description: The ID of the post to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post found. Returns the post object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   example: "12345"
 *       '404':
 *         description: Post not found
 *         content:
 *           application/json:
 *             example: {"errors": ["Post not found"]}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal Server Error"}
 */


router.get('/getPostID/:postID', authenticate, postController.getPostByIdController);


export default router;