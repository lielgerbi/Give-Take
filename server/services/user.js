const Users = require('../models/user');

const getUsers = async () => {
    return await Users.find({});
    // Users.find({})
    // .then(function(users) {
    //   if (users) {
    //     console.log(users);
    //     return users;
    //   } else {
    //     console.log("no")
    //   }
    // }) 
}

const getUserByName = async (userName,password) => {
    return await Users.findOne({ userName: userName, password: password });
};

const createUser = async (newUser) => {
    const user = new Users({
        userName: newUser.userName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        email: newUser.email,
        isManager: false
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

const updateUser = async (userName, firstName, lastName, email) => {
    const user = await getUserByName(userName);

    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await user.save();
    }
    
    return user;
};

const deleteUser = async (userName) => {
    const user = await getUserByName(userName);

    if (user) {
        await user.remove();
    }

    return user;
};

module.exports = {
    getUsers,
    getUserByName,
    createUser,
    updateUser,
    deleteUser
}