const Post = require('../models/Post');

const getPosts = async () => {
    return await Post.find({});
};

const getPostById = async (postID) => {
    return await Post.findOne({ postID: postID });
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

const updatePost = async (postID, text, photo) => {
    const post = await getUserByName(postID);

    if (post) {
        post.text = text;
        post.photo = photo;

        await post.save();
    }
    
    return post;
};

const deletePost = async (postID) => {
    const post = await getUserByName(postID);

    if (post) {
        await post.remove();
    }

    return post;
};

const getPostByUser = async (userName) => {
    return await Post.find({userName:userName});
};
 
const getPostByGroup = async (groupId) => {
    return await Post.find({groupId:groupId});
};

const getUserPostsToView = async (UserGroups, UserFriends) => {
    myPost = []; 
    for await (const groupId of UserGroups) {
        const GroupPost = await getPostByGroup(groupId);
        myPost.push(GroupPost);
      }
    for await (const userName of UserFriends) {
        const UserPost = await getPostByUser(userName);
        myPost.push(UserPost);
      }
   
};

//TODO: add get Post To View Between Dates 

module.exports = {
    updatePost, deletePost, newPost, getPostById, getPosts, getUserPostsToView, getPostByUser, getPostByGroup
}