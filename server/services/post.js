const Post = require('../models/post');

const getPosts = async () => {
    return await Post.find({});
};

const getPostById = async (postID) => {
    return await Post.findOne({ _id: postID });
};

const newPost = async (newPost) => {
    const post = new Post({
        postID: newPost.postID,
        userName: newPost.userName,
        text: newPost.text,
        photo: newPost.photo,
        groupId: newPost.groupId,
        timestamp: newUser.timestamp
    });

    
    post.postType = newUser.groupId==null ? 'personal' : 'group'
    return await post.save();
};

const updatePost = async (_id,categoryName, subCategory,photo, details, city ) => {
    const post = await getPostById(_id);

    if (post) {
        post.categoryName = categoryName;
        post.photo = photo;
        post.subCategory=subCategory;
        post.details = details;
        post.city = city

        await post.save();
    }
    
    return post;
};

const deletePost = async (postID) => {
    const post = await getPostById(postID);
    if (post) {
        post.isAvailable=false  
        await post.save();
    }

    return post;
};

const getPostByUser = async (userName) => {
    return await Post.find({userName:userName});
};


//TODO: add get Post To View Between Dates 

module.exports = {
    updatePost, deletePost, newPost, getPostById, getPosts, getPostByUser
}