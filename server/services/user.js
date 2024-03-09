const user = require('../models/user');
const Users = require('../models/user');

const getUsers = async () => {
    return await Users.find({});
}

const getUserByNamePassword = async (userName,password) => {
    return await Users.findOne({ userName: userName, password: password });
    
};
const getUserByName= async (userName) => {
    return await Users.findOne({ userName: userName });
    
};

const createUser = async (newUser) => {
    const user = new Users({
        userName: newUser.userName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        email: newUser.email,
        isManager: false,
        photo: newUser.photo
    });

    console.log("Adding user:", user);

    try {
        const savedUser = await user.save();
        console.log("User saved successfully:", savedUser);
        return savedUser;
    } catch (error) {
        console.error("Error saving user:", error);
        throw error; // You might want to handle or log the error appropriately
    }
};

const updateUser = async (userName, firstName, lastName, email, password,photo) => {
    console.log("service now")
    console.log(userName, firstName, lastName, email, password, photo)
    const user = await getUserByName(userName ,password);

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



module.exports = {
    getUsers,
    getUserByName,
    createUser,
    updateUser,
    getUserByNamePassword
}