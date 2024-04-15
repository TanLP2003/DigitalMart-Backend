const userRouter = require('express').Router();
const uploadMulter = require('../../configs/multer');
const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const { signupRequestValidate, loginRequestValidate, refreshTokenReqValidate } = require('./user.validation');
const UserController = require('./user.controller');
const CONSTANT = require('../../utils/constant');

userRouter.post('/signup', Validation(signupRequestValidate), UserController.registerUser)
userRouter.post('/login', Validation(loginRequestValidate), UserController.login);
userRouter.post('/logout', Authentication(CONSTANT.ROLE.ALL), UserController.logout);
userRouter.post('/refreshToken', Authentication(CONSTANT.ROLE.ALL), Validation(refreshTokenReqValidate), UserController.refreshToken);
userRouter.put('/changeAvatar', Authentication(CONSTANT.ROLE.CUSTOMER), uploadMulter.single('avatar'), UserController.changeAvatar);

module.exports = userRouter;