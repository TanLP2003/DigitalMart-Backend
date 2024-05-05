require('dotenv').config();

const config = {
    mongo: {
        uri: process.env.MONGO_URI
    },
    redis: {
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME
    },
    jwt: {
        secretKey: process.env.SECRET_KEY,
        ACC_TOKEN_TTL: '10m',
        REF_TOKEN_TTL: '1h'
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
    },
    email: {
        appPassword: process.env.APP_PASSWORD
    },
    jobQueue: {
        queueName: 'imageProcessQueue'
    }
}

module.exports = config;