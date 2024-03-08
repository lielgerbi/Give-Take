const userService = require('../services/user');
const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';

const getUsers = async (req, res) => {
  const Users = await userService.getUsers();
  
  res.json(Users);
};

const getUser = async (req, res) => {
  const user = await userService.getUserByName(req.query.userName, req.query.password);
   
  if (!user) {
      console.log("not find" +user)
      return res.status(404).json({ errors: ['User not found'] });
  }
  const accessToken = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '1d' });

  res
  .header('refreshToken', refreshToken)
  .header('Authorization', accessToken)
  .send(user);
  
};

const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body.newUser);
    res.json(newUser);
};

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.body.userName, req.body.firstName,
      req.body.lastName, req.body.email, req.body.password);

    if (!user) {
      return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
  };



  module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser
  };