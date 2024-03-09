const categoiresService = require('../services/categories');

const getCategories = async (req, res) => {
  const Categories = await categoiresService.getCategories();
  res.json(Categories);
};

  //TODO: add get Post To View Between Dates 


  module.exports = {
    getCategories
  };