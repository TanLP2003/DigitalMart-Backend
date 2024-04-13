const UserRepo = require('./user.repo');
const BasketRepo = require('../basket/basket.repo');
const TokenService = require('../token/token.service');
const {comparePassword} = require('../../utils/auth');
const { NotFound, BadRequest } = require('../../utils/createError');

module.exports = {
    registerUser: async (user) => {
        const newUser = await UserRepo.createUser(user);
        await BasketRepo.createBasket(newUser.id);
        return newUser;
    },
    login: async (username, password) => {
        const existedUser = await UserRepo.getUserByName(username);
        if(!existedUser) throw NotFound(`User with name ${username} does not exist`);
        const result = comparePassword(password, existedUser.password);
        if(!result) throw BadRequest(`Wrong Password`); 
        return {
            accessToken: await TokenService.generateAccessToken(existedUser.id),
            refreshToken: await TokenService.generateRefreshToken(existedUser.id)
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