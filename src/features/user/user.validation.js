const Joi = require('joi');

const loginRequestValidate = (loginReq) => {
    console.log(loginReq);
    const loginReqSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    return loginReqSchema.validate(loginReq, {abortEarly: true});
}

const signupRequestValidate = (signupReq) => {
    const signupReqSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        gender: Joi.string().required()
    })
    return signupReqSchema.validate(signupReq, {abortEarly: true});
}

const refreshTokenReqValidate = (req) => {
    const refreshTokenReqSchema = Joi.object({
        refreshToken: Joi.string().required()
    })
    return refreshTokenReqSchema.validate(req);
}

module.exports = {
    loginRequestValidate,
    signupRequestValidate,
    refreshTokenReqValidate
}