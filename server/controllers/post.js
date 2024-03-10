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
  res.status(200)
  res.json(post);
};

const createPost = async (req, res) => {
    const newPost = await postService.createPost(req.body.userName,req.body.post);
    res.json(newPost);
};

const updatePost = async (req, res) => {
    const post = await postService.updatePost(req.body._id, req.body.categoryName,
      req.body.subCategory, req.body.photo, req.body.details, req.body.city);

    if (!post) {
      return res.status(404).json({ errors: ['Post not found'] });
    }
  
    res.status(200).json(post);
  };

  const deletePost = async (req, res) => {
    const post = await postService.deletePost(req.body.post._id);

    if (!post) {
      return res.status(404).json({ errors: ['Post not found'] });
    }
    res.status(200)
    res.send();
  };

  const getPostByUser = async (req, res) => {
    const userPosts = await postService.getPostByUser(req.body.userName);
    res.json(userPosts);
  };


  module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostByUser

  };