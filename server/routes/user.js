const express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
const authenticate = require("../refreshMiddleware");//todo add auth


router.post('/',userController.createUser);
router.get('/',authenticate,userController.getUsers);
router.get('/user', userController.getUser);
router.post('/user',authenticate,userController.updateUser);

module.exports = router;