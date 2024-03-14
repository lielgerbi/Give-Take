import CategoryModel from '../models/category';
import { ICategory } from '../models/category';

const getCategories = async (): Promise<ICategory[]> => {
    return await CategoryModel.find({});
};

export { getCategories };