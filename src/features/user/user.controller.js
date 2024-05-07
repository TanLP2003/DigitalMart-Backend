const UserService = require('./user.service');
const { StatusCodes } = require('http-status-codes');
module.exports = {
    registerUser: async (req, res, next) => {
        try {
            await UserService.registerUser(req.body);
            res.status(StatusCodes.CREATED).json("Confirmation Email has been send to you email!");
        }
        catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const token = await UserService.login(email, password);
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
            res.status(StatusCodes.NO_CONTENT).json();
        }
        catch (err) {
            next(err);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            const newToken = await UserService.refreshToken(userId, req.body.refreshToken);
            res.status(StatusCodes.OK).json(newToken);
        }
        catch (err) {
            next(err);
        }
    },
    changeAvatar: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            const file = req.file;
            const url = await UserService.changeAvatar(userId, file);
            res.status(StatusCodes.OK).json({ url: url });
        }
        catch (err) {
            next(err);
        }
    },
    updateUserInfo: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            const updatedUser = await UserService.updateUserInfo(userId, req.body);
            res.status(StatusCodes.OK).json({
                userId: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                phonenumber: updatedUser.phonenumber,
                role: updatedUser.role
            });
        }
        catch (err) {
            next(err);
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            const { oldPassword, newPassword } = req.body;
            await UserService.changePassword(userId, oldPassword, newPassword);
            res.status(StatusCodes.ACCEPTED).json();
        }
        catch (err) {
            next(err);
        }
    },
    verify: async (req, res, next) => {
        try {
            const { token } = req.params;
            console.log(token);
            await UserService.verifyUser(token);
            res.status(StatusCodes.OK).json();
        }
        catch (err) {
            next(err);
        }
    }
}