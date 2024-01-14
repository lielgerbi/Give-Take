const Categories = require('../models/category');

const getCategories = async () => {
    return await Categories.find({});
};

const getCategoryByName = async (categoryName) => {
    return await Categories.findOne({categoryName: categoryName });
};

const newCategory = async (newCategory) => {
    const category = new Categories({
        categoryID: newCategory.categoryID,
        categoryName: newCategory.categoryName,
        subCategories: newCategory.subCategories
    });
    return await category.save();
};


const deleteCategory = async (categoryName) => {
    const post = await getCategoryByName(categoryName);

    if (post) {
        await post.remove();
    }

    return post;
};


module.exports = {
    getCategories, getCategoryByName, newCategory, deleteCategory
}