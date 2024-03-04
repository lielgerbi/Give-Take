const express = require('express');
var router = express.Router();
const userController = require('../controllers/user');


router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);


router.route('/user')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;