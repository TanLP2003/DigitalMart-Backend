const UserRepo = require('./user.repo');
const TokenService = require('../token/token.service');
const {comparePassword} = require('../../utils/auth');
const { NotFound, BadRequest } = require('../../utils/createError');

module.exports = {
    registerUser: async (user) => {
        const newUser = await UserRepo.createUser(user);
        return newUser;
    },
    login: async (username, password) => {
        const existedUser = await UserRepo.getUserByName(username);
        if(!existedUser) throw NotFound(`User with name ${username} does not exist`);
        const result = comparePassword(password, existedUser.password);
        if(!result) throw BadRequest(`Wrong Password`); 
        console.log(existedUser.role);
        return {
            accessToken: await TokenService.generateAccessToken(existedUser.id, existedUser.role),
            refreshToken: await TokenService.generateRefreshToken(existedUser.id, existedUser.role)
        }
    },
    logout: async (userId) => {
        await TokenService.deleteByUserId(userId);
    },
    refreshToken: async (userId, token) => {
        await TokenService.deleteByToken(userId, token);
        return {
            accessToken: await TokenService.generateAccessToken(userId),
            refreshToken: await TokenService.generateRefreshToken(userId, token)
        }
    },
    changeAvatar: async (avatar) => {

    }
}