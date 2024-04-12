const userRouter = require('express').Router();
const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const { signupRequestValidate, loginRequestValidate } = require('../../validators/auth.validation');
const UserController = require('./user.controller');

userRouter.post('/signup', Validation(signupRequestValidate), UserController.registerUser)
userRouter.post('/login', Validation(loginRequestValidate), UserController.login);
userRouter.post('/logout', Authentication, UserController.logout);
userRouter.post('/refreshToken', Authentication, UserController.refreshToken);

module.exports = userRouter;