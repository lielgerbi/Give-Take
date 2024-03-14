import PostModel, { IPost } from '../models/post';

const getPosts = async (): Promise<IPost[]> => {
    return await PostModel.find({isAvailable: true});
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

const updatePost = async (_id: string, categoryName: string, subCategory: string, photo: string, details: string, city: string, comments: object[]): Promise<IPost | null> => {
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