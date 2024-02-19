const postService = require('../services/post');

const getPosts = async (req, res) => {
  const Posts = await postService.getPosts();
  res.json(Posts);
};

const getPostById = async (req, res) => {
  const post = await postService.getPostById(req.params.postID);

  if (!post) {
      return res.status(404).json({ errors: ['Pser not found'] });
  }

  res.json(post);
};

const createPost = async (req, res) => {
    const newPost = await postService.createPost(req.body.post);
    res.json(newPost);
};

const updatePost = async (req, res) => {
    const post = await postService.updatePost(req.params.postID, req.body.userName,
      req.body.text, req.body.photo, req.body.groupId, req.body.timestamp);

    if (!post) {
      return res.status(404).json({ errors: ['Post not found'] });
    }
  
    res.json(post);
  };

  const deletePost = async (req, res) => {
    const post = await postService.deletePost(req.params.postId);

    if (!post) {
      return res.status(404).json({ errors: ['Post not found'] });
    }
  
    res.send();
  };

  const getPostByUser = async (req, res) => {
    const userPosts = await postService.getPostByUser(req.body.userName);
    res.json(userPosts);
  };

  //TODO: add get Post To View Between Dates 


  module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostByUser

  };