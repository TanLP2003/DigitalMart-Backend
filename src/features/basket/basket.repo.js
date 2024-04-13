const Basket = require('./basket.model');
const {redisClient} = require('../../configs/init.db')

module.exports = {
    createBasket: async (userId) => {
        await Basket.create({userId: userId});
        console.log(redisClient);
    },
    addItem: async () => {

    },
    updateBasket: async (productId, incrementBy) => {

    },
    deleteItem: async (productId) => {

    }
}