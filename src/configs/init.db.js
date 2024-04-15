const mongoose = require('mongoose');
const {createClient} = require('redis');
const config = require('./config');

const redisClient = createClient({
    password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port
    },
    // username: config.redis.username
});

const connectDatabases = async () => {
    await mongoose.connect(config.mongo.uri);
    await redisClient.connect();
}

module.exports = {
    connectDatabases, redisClient
}