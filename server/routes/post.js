const express = require('express');
var router = express.Router();
const postController = require('../controllers/post');
const authenticate = require("../refreshMiddleware");//todo add auth

router.get('/',authenticate,postController.getPosts);
router.post('/',authenticate,postController.createPost);
router.get('/getPostByUser',authenticate, postController.getPostByUser);
router.get('/delete',authenticate, postController.deletePost);

router.route('/:postID')
    .get(postController.getPosts)
    .patch(postController.updatePost)



//TODO: add get Post To View Between Dates 

module.exports = router;