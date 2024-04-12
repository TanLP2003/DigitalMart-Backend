const Token = require('./token.model');
const crypto = require('crypto');
const config = require('../../configs/config');
const { generateToken } = require('../../utils/auth');
const { refreshToken } = require('../user/user.service');

module.exports = {
    generateRefreshToken: async (userId) => {
        const newRefreshToken = await Token.create({
            userId: userId,
            refreshToken: generateToken({userId: userId}, {expiresIn: '1h'}),
        });
        return newRefreshToken.refreshToken;
    },
    generateAccessToken: async (userId) => {
        return generateToken({userId: userId}, {expiresIn: '10m'});
    },
    getByUserId: async (userId) => {
        return await Token.findOne({userId: userId});
    },
    deleteByUserId: async (userId) => {
        await Token.deleteMany({userId: userId});
    },
    checkTokenExisted: async (userId, refreshToken) => {
        const tokens = await Token.findOne({userId: userId, refreshToken: refreshToken});
        return tokens ? true : false;
    }
}