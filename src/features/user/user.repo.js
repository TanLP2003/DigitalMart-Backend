const User = require('./user.model');

module.exports = {
    createUser: async (user) => {
        const newUser = await User.create(user);
        return newUser;
    },
    getUserByName: async (username) => {
        return await User.findOne({username: username});
    }
}