const mongoose = require('mongoose');
const {createClient} = require('redis');
const config = require('./config');

const connectDatabases = async () => {
    await mongoose.connect(config.mongo.uri);
    const client = createClient({
            host: config.redis.host,
            port: config.redis.port
        }, {
            password: config.
        }
        )
    return client;
}

module.exports = connectDatabases;