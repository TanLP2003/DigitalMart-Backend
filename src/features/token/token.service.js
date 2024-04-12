const { verifyToken } = require('../../utils/auth');
const { BadRequest } = require('../../utils/createError');
const TokenRepo = require('./token.repo');

module.exports = {
    generateRefreshToken: async(userId) => {
        const existedToken = await TokenRepo.getByUserId(userId);
        if (existedToken) {
            try {
                const _ = verifyToken(existedToken.refreshToken);
                return existedToken.refreshToken;
            }
            catch (err) {
                await TokenRepo.deleteByUserId(userId);
            }
        }
        return await TokenRepo.generateRefreshToken(userId);
    },
    generateAccessToken: async (userId) => {
        return TokenRepo.generateAccessToken(userId);
    },
    deleteByUserId: async (userId) => {
        await TokenRepo.deleteByUserId(userId);
    },
    deleteByToken: async (userId, refreshToken) => {
        if(!(await TokenRepo.checkTokenExisted(userId, refreshToken))) throw BadRequest("RefreshToken is not existed!");
        await TokenRepo.deleteByUserId(userId);
    }
}