import { Request, Response } from 'express';
import { getCategories } from '../services/categories';

const getCategoriesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const categoriesController = {
  getCategoriesController
};

export default categoriesController;




// const categoiresService = require('../services/categories');

// const getCategories = async (req, res) => {
//   const Categories = await categoiresService.getCategories();
//   res.json(Categories);
// }; 


// module.exports = {
//     getCategories
// };