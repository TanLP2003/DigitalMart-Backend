const UserService = require('./user.service');
const {StatusCodes} = require('http-status-codes');
module.exports = {
    registerUser: async(req, res, next) => {
        try {
            const newUser = await UserService.registerUser(req.body);
            res.status(StatusCodes.CREATED).json(newUser);
        }
        catch(err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const {username, password} = req.body;
            const token = await UserService.login(username, password);
            res.status(StatusCodes.OK).json(token);
        }
        catch (err) {
            next(err);
        }
    },
    logout: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            await UserService.logout(userId);
            res.status(200).json();
        }
        catch(err){
            next(err);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            const newToken = await UserService.refreshToken(userId, req.body.refreshToken);
            res.status(200).json(newToken);
        }
        catch (err){
            next(err);
        } 
    }
}