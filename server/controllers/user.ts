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
    console.log(req.query)
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
      const accessToken = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '1d' });
      res.status(200).header('refreshToken', refreshToken).header('authorization', accessToken).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUserController = async (req: Request, res: Response): Promise<void> => {
  console.log("update controller");
  console.log(req.body);
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