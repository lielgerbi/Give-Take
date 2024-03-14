import { Request, Response } from 'express';
import { getPosts, getPostById, createPost as createPostService, updatePost as updatePostService, deletePost as deletePostService, getPostByUser as getPostByUserService } from '../services/post';

const getPostsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPostByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.params.postID)
    const post = await getPostById(req.params.postID);

    if (!post) {
      res.status(404).json({ errors: ['Post not found'] });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createPostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPost = await createPostService(req.body.userName, req.body.post);
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updatePostController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body)
    const post = await updatePostService(req.body._id, req.body.categoryName, req.body.subCategory, req.body.photo, req.body.details, req.body.city, req.body.comments);
     
    if (!post) {
      res.status(404).json({ errors: ['Post not found'] });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletePostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await deletePostService(req.body.post._id);

    if (!post) {
      res.status(404).json({ errors: ['Post not found'] });
    } else {
      res.send();
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPostByUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userPosts = await getPostByUserService(req.body.userName);
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const postController = {
  getPostsController,
  getPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
  getPostByUserController,
};

export default postController;