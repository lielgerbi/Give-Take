import UserModel, { IUser } from '../models/user';

const getUsers = async (): Promise<IUser[]> => {
    return await UserModel.find({});
};

const getUserByNamePassword = async (userName: string, password: string): Promise<IUser | null> => {
    return await UserModel.findOne({ userName: userName, password: password });
};

const getUserByName = async (userName: string): Promise<IUser | null> => {
    return await UserModel.findOne({ userName: userName });
};

const createUser = async (newUser: Partial<IUser>): Promise<IUser> => {
    const user = new UserModel({
        userName: newUser.userName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        email: newUser.email,
        isManager: false,
        photo: newUser.photo,
        googleUser: newUser.googleUser
    });

    try {
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        console.error("Error saving user:", error);
        throw error; // You might want to handle or log the error appropriately
    }
};

const updateUser = async (userName: string, firstName: string, lastName: string, email: string, password: string, photo: string): Promise<IUser | null> => {
    const user = await getUserByName(userName);

    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.photo = photo;
        await user.save();
    }

    return user;
};

export { getUsers, getUserByName, createUser, updateUser, getUserByNamePassword };