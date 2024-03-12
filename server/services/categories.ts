import CategoryModel from '../models/category';
import { ICategory } from '../models/category';
const getCategories = async (): Promise<ICategory[]> => {
    return await CategoryModel.find({});
};

export { getCategories };



// const Categories = require('../models/category');

// const getCategories = async () => {
//     return await Categories.find({});
// };

// module.exports = {
//     getCategories
// }