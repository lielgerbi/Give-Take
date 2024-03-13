import { Request, Response } from 'express';
import { getUsers as getUsersService, getUserByNamePassword as getUserByNamePasswordService, createUser as createUserService, updateUser as updateUserService, getUserByName as getUserByNameService } from '../services/user';
import jwt from 'jsonwebtoken';
const secretKey: string  = 'secret_key';

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Arrived to controller for user")
    const userName: string | undefined = req.query.userName as string | undefined;
    const password: string | undefined = req.query.password as string | undefined;

    if (!userName || !password) {
      res.status(400).json({ errors: ['User name or password is missing'] });
      return;
    }

    const user = await getUserByNamePasswordService(userName, password);

    if (!user) {
      res.status(404).json({ errors: ['User not found'] });
    } else {
      const accessToken = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '1d' });
      res.status(200).header('refreshToken', refreshToken).header('authorization', accessToken).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserByNameService(req.body.newUser.userName);
    if (user) {
      res.status(500).json({ errors: ['User name exists'] });
    } else {
      const newUser = await createUserService(req.body.newUser);
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await updateUserService(req.body.userName, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.photo);
    if (!user) {
      res.status(404).json({ errors: ['User not found'] });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const userController = {
  getUsersController,
  getUserController,
  createUserController, 
  updateUserController
};

export default userController;





// const userService = require('../services/user');
// const jwt = require('jsonwebtoken');
// const secretKey = 'secret_key';

// const getUsers = async (req, res) => {
//   const Users = await userService.getUsers();
  
//   res.json(Users);
// };

// const getUser = async (req, res) => {
//   const user = await userService.getUserByNamePassword(req.query.userName, req.query.password);
   
//   if (!user) {
//       console.log("not find" +user)
//       return res.status(404).json({ errors: ['User not found'] });
//   }
//   const accessToken = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
//   const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '1d' });
//   res.status(200);
//   res
//   .header('refreshToken', refreshToken)
//   .header('Authorization', accessToken)
//   .send(user);
  
// };

// const createUser = async (req, res) => {
//   const user = await userService.getUserByName(req.body.newUser.userName);
//       if (user){
//         return res.status(500).json({ errors: ['User name exsit'] });
//       }
//     const newUser = await userService.createUser(req.body.newUser);
//     res.status(200);
//     res.json(newUser);
// };


// const updateUser = async (req, res) => {
//   console.log("update user cintroller")
//   console.log(req.body)
//     const user = await userService.updateUser(req.body.userName, req.body.firstName,
//       req.body.lastName, req.body.email, req.body.password , req.body.photo);

//     if (!user) {
//       return res.status(404).json({ errors: ['User not found'] });
//     }
//     res.json(user);
//   };



//   module.exports = {
//     getUsers,
//     getUser,
//     createUser,
//     updateUser
//   };