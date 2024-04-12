const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const saltRounds = 5;

module.exports = {
    hashPassword: async (password) => {
        try {
            let hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        }
        catch (err) {
            console.log(err);
        }
    },
    comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    },
    generateToken: (payload, options) => {
        return jwt.sign(payload, config.jwt.secretKey, options);
    },
    verifyToken: (token) => {
        return jwt.verify(token, config.jwt.secretKey);
    }
}