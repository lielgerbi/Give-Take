const citiesService = require('../services/cities');

const getCities = async (req, res) => {
  const Cities = await citiesService.getCities();
  res.json(Cities);
};


// const createCity = async (req, res) => {
//     const newCategory = await categoiresService.createCategory(req.body.post);
//     res.json(newCategory);
// };


  //TODO: add get Post To View Between Dates 


  module.exports = {
    getCities

  };