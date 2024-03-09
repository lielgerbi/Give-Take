const express = require('express');
var router = express.Router();
const postController = require('../controllers/post');
const authenticate = require("../refreshMiddleware");//todo add auth

router.get('/',authenticate,postController.getPosts);
router.post('/',authenticate,postController.createPost);
router.get('/getPostByUser',authenticate, postController.getPostByUser);
router.post('/delete',authenticate, postController.deletePost);
router.post('/update',authenticate, postController.updatePost);



//TODO: add get Post To View Between Dates 

module.exports = router;