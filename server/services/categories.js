const Categories = require('../models/category');

const getCategories = async () => {
    return await Categories.find({});
};

// const newCategory = async (newCategory) => {
//     const category = new Categories({
//         categoryID: newCategory.categoryID,
//         categoryName: newCategory.categoryName,
//         subCategories: newCategory.subCategories
//     });
//     return await category.save();
// };




module.exports = {
    getCategories
}