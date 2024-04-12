require('dotenv').config();

const config = {
    mongo: {
        uri: process.env.MONGO_URI
    },
    redis: {
        uri: ''
    },
    jwt: {
        secretKey: process.env.SECRET_KEY
    }
}

module.exports = config;