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

const getUserByName = async (userName) => {
    return await Users.findOne({ userName: userName });
};

const createUser = async (newUser) => {
    const user = new Users({
        userName: newUser.userName,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        birthDate: newUser.birthDate,
        isManager: newUser.isManager
    });

    if (newUser.phoneNumber)
        user.phoneNumber = phoneNumber;

    return await user.save();
};

const updateUser = async (userName, firstName, lastName, birthDate, phoneNumber) => {
    const user = await getUserByName(userName);

    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.birthDate = birthDate;
        user.phoneNumber = phoneNumber;

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