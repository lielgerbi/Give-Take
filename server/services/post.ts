import PostModel, { IPost } from '../models/post';

const getPosts = async (): Promise<IPost[]> => {
    return await PostModel.find({});
};

const getPostById = async (postID: string): Promise<IPost | null> => {
    return await PostModel.findOne({ _id: postID });
};

const createPost = async (userName: string, newPost: Partial<IPost>): Promise<IPost> => {
    const post = new PostModel({
        userName: userName,
        categoryName: newPost.categoryName,
        photo: newPost.photo,
        subCategory: newPost.subCategory,
        details: newPost.details,
        city: newPost.city,
        isAvailable: true
    });
    return await post.save();
};

const updatePost = async (_id: string, categoryName: string, subCategory: string, photo: string, details: string, city: string, comments: string[]): Promise<IPost | null> => {
    const post = await getPostById(_id);

    if (post) {
        post.categoryName = categoryName;
        post.photo = photo;
        post.subCategory = subCategory;
        post.details = details;
        post.city = city;
        post.comments = comments;

        await post.save();
    }

    return post;
};

const deletePost = async (postID: string): Promise<IPost | null> => {
    const post = await getPostById(postID);
    if (post) {
        post.isAvailable = false;
        await post.save();
    }

    return post;
};

const getPostByUser = async (userName: string): Promise<IPost[]> => {
    return await PostModel.find({ userName: userName });
};

export { updatePost, deletePost, createPost, getPostById, getPosts, getPostByUser };



// const Post = require('../models/post');

// const getPosts = async () => {
//     return await Post.find({});
// };

// const getPostById = async (postID) => {
//     return await Post.findOne({ _id: postID });
// };

// const createPost = async (userName,newPost) => {
//     const post = new Post({
//         userName: userName,
//         categoryName: newPost.categoryName,
//         photo: newPost.photo,
//         subCategory: newPost.subCategory,
//         details: newPost.details,
//         city: newPost.city,
//         isAvailable:true
//     });
//     return await post.save();
// };

// const updatePost = async (_id,categoryName, subCategory,photo, details, city,comments ) => {
//     const post = await getPostById(_id);

//     if (post) {
//         post.categoryName = categoryName;
//         post.photo = photo;
//         post.subCategory=subCategory;
//         post.details = details;
//         post.city = city
//         post.comments = comments

//         await post.save();
//     }
    
//     return post;
// };

// const deletePost = async (postID) => {
//     const post = await getPostById(postID);
//     if (post) {
//         post.isAvailable=false  
//         await post.save();
//     }

//     return post;
// };

// const getPostByUser = async (userName) => {
//     return await Post.find({userName:userName});
// };


// module.exports = {
//     updatePost, deletePost, createPost, getPostById, getPosts, getPostByUser
// }