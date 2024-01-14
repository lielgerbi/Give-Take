const userService = require('../services/user');

const getUsers = async (req, res) => {
  const Users = await userService.getUsers();
  res.json(Users);
};

const getUser = async (req, res) => {
  const user = await userService.getUserByName(req.params.userName);

  if (!user) {
      return res.status(404).json({ errors: ['User not found'] });
  }

  res.json(user);
};

const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body.user);
    res.json(newUser);
};

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.userName, req.body.firstName,
      req.body.lastName, req.body.birthDate, req.body.phoneNumber);

    if (!user) {
      return res.status(404).json({ errors: ['User not found'] });
    }
  
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const user = await userService.deleteUser(req.params.userName);

    if (!user) {
      return res.status(404).json({ errors: ['User not found'] });
    }
  
    res.send();
  };

  module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
  };