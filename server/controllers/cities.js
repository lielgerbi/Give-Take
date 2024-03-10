const citiesService = require('../services/cities');

const getCities = async (req, res) => {
  const Cities = await citiesService.getCities();
  res.status(200)
  res.json(Cities);
};

  module.exports = {
    getCities

  };