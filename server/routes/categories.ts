import express, { Router } from 'express';
import { Request, Response } from 'express';
import categoriesController from '../controllers/categories';
import authenticate from "../refreshMiddleware";

const router: Router = express.Router();

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
router.get('/', authenticate, (req: Request, res: Response) => {
    categoriesController.getCategoriesController(req, res);
});

export default router;