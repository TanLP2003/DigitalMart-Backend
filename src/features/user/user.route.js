const userRouter = require('express').Router();
const uploadMulter = require('../../configs/multer');
const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const { signupRequestValidate, loginRequestValidate, refreshTokenReqValidate, updateUserInfoReqValidate, changePasswordReqValidate, forgotPasswordReqValidate } = require('./user.validation');
const UserController = require('./user.controller');
const CONSTANT = require('../../utils/constant');

userRouter.post('/signup', Validation(signupRequestValidate), UserController.registerUser)
userRouter.post('/login', Validation(loginRequestValidate), UserController.login);
userRouter.post('/logout', Authentication(CONSTANT.ROLE.ALL), UserController.logout);
userRouter.post('/refreshToken', Authentication(CONSTANT.ROLE.ALL), Validation(refreshTokenReqValidate), UserController.refreshToken);
userRouter.put('/changeAvatar', Authentication(CONSTANT.ROLE.CUSTOMER), uploadMulter.single('avatar'), UserController.changeAvatar);
userRouter.put('/updateInfo', Authentication(CONSTANT.ROLE.CUSTOMER), Validation(updateUserInfoReqValidate), UserController.updateUserInfo);
userRouter.put('/changePassword', Authentication(CONSTANT.ROLE.ALL), Validation(changePasswordReqValidate), UserController.changePassword);
userRouter.get('/verify/:token', UserController.verify)
userRouter.put('/forgotPassword', Authentication(CONSTANT.ROLE.CUSTOMER), Validation(forgotPasswordReqValidate), UserController.forgotPassword);

module.exports = userRouter;