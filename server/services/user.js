const user = require('../models/user');
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

const updateUser = async (userName, firstName, lastName, email, password) => {
    console.log(userName, firstName, lastName, email, password)
    const user = await getUserByName(userName ,password);

    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        await user.save();
    }
    
    return user;
};



module.exports = {
    getUsers,
    getUserByName,
    createUser,
    updateUser
}