const Categories = require('../models/category');

// const getCategories = async () => {
//     Categories.find({}).then(categories => {
//         console.log('All Categories:', categories);
//       })
//       .catch(error => {
//         console.error('Error retrieving categories:', error);
//       });
// };

// const getCategoryByName = async (categoryName) => {
//     return await Categories.findOne({categoryName: categoryName });
// };

// const newCategory = async (newCategory) => {
//     const category = new Categories({
//         categoryID: newCategory.categoryID,
//         categoryName: newCategory.categoryName,
//         subCategories: newCategory.subCategories
//     });
//     return await category.save();
// };




module.exports = {
    //getCategories, getCategoryByName, newCategory
}