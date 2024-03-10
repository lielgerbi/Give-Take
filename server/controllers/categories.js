const categoiresService = require('../services/categories');

const getCategories = async (req, res) => {
  const Categories = await categoiresService.getCategories();
  res.json(Categories);
}; 


module.exports = {
    getCategories
};