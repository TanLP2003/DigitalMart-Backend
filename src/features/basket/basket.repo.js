const Basket = require('./basket.model');
const {redisClient} = require('../../configs/init.db')

module.exports = {
    getBasket: async (userId) => {
        let basket = await redisClient.get(`basket:${userId}`);
        if(basket) return JSON.parse(basket);
        basket = await Basket.findOne({userId: userId}).populate('items.product');
        await redisClient.set(`basket:${userId}`, JSON.stringify(basket));
        return basket;
    },
    createBasket: async (userId) => {
        await Basket.create({userId: userId});
    },
    addItem: async (userId, productId) => {
        const basket = await Basket.findOne({ userId: userId });
        const existingItemIndex = basket.items.findIndex(item => item.product.equals(productId));
        if (existingItemIndex !== -1) {
            basket.items[existingItemIndex].quantity += 1;
        } else {
            basket.items.push({ product: productId, quantity: 1 });
        }
        const updatedBasket = await (await basket.save()).populate('items.product');
        await redisClient.set(`basket:${userId}`, JSON.stringify(updatedBasket));
        return updatedBasket;
    },
    updateBasket: async (userId, productId, incrementBy) => {

    },
    deleteItem: async (userId, productId) => {
        const basket = await Basket.findOne
    }
}