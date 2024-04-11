require('dotenv').config();

const db = {
    mongo: {
        uri: process.env.MONGO_URI
    },
    redis: {
        uri: ''
    }
}

module.exports = db;