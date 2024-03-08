const Cities = require('../models/city');

const getCities = async () => {
    console.log("try the test")
    return await Cities.find({});
};





module.exports = {
    getCities
}