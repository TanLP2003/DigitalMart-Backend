const userRouter = require('express').Router();
const uploadMulter = require('../../configs/multer');
const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const { signupRequestValidate, loginRequestValidate } = require('../../validators/auth.validation');
const UserController = require('./user.controller');

userRouter.post('/signup', Validation(signupRequestValidate), UserController.registerUser)
userRouter.post('/login', Validation(loginRequestValidate), UserController.login);
userRouter.post('/logout', Authentication, UserController.logout);
userRouter.post('/refreshToken', Authentication, UserController.refreshToken);
userRouter.put('/changeAvatar', uploadMulter.single('avatar'), UserController.changeAvatar);

module.exports = userRouter;