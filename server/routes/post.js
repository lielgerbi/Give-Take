const express = require('express');
var router = express.Router();
const postController = require('../controllers/post');

router.route('/')
    .get(postController.getPosts)
    .post(postController.createPost);

router.route('/:postID')
    .get(postController.getPosts)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

router.route('/getPostByUser')
    .get(postController.getPostByUser);


//TODO: add get Post To View Between Dates 

module.exports = router;