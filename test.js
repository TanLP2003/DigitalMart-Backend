const redis = require('redis');
const config = require('./src/configs/config');

// async function testRedis() {
//     const client = await createClient({
//         password: config.redis.password,
//         socket: {
//             host: config.redis.host,
//             port: config.redis.port
//         }
//     })
//     // .on('err', err => console.log(err))
//     .connect();

//     await client.set('Test', "123");
//     const value = await client.get('Test');
//     console.log(value);
//     await client.disconnect();
// }
const client = redis.createClient(config.redis.port, config.redis.host, {
    password: config.redis.password
})

async function testRedis() {
    client.set('my name', "le phu tan");
    const value = client.get('my name');
    console.log(value);
}

testRedis();