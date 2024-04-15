const Basket = require('./basket.model');
const {redisClient} = require('../../configs/init.db')

module.exports = {
    getBasketFromDb: async (userId) => {
        let basket = await Basket.findOne({userId: userId}).populate('items.product');
        if(!basket) basket = await Basket.create({userId: userId});
        return basket;
    },
    getBasketFromCache: async (userId) => {
        let basket = await redisClient.get(`basket:${userId}`);
        if(basket) return JSON.parse(basket);
        return null;
    },
    writeBasketToCache: async (key, value) => {
        let basketKey = `basket:${key}`;
        await redisClient.set(basketKey, JSON.stringify(value));
    },
    // addItem: async (userId, productId) => {
    //     const basket = await Basket.findOne({ userId: userId });
    //     const existingItemIndex = basket.items.findIndex(item => item.product.equals(productId));
    //     if (existingItemIndex !== -1) {
    //         basket.items[existingItemIndex].quantity += 1;
    //     } else {
    //         basket.items.push({ product: productId, quantity: 1 });
    //     }
    //     const updatedBasket = await (await basket.save()).populate('items.product');
    //     await redisClient.set(`basket:${userId}`, JSON.stringify(updatedBasket));
    //     return updatedBasket;
    // },
    updateBasket: async (basket, index, productId, incrementBy) => {
        if(index === -1){
            basket.items.push({product: productId, quantity: incrementBy});
        }else {
            basket.items[index].quantity += incrementBy
            if(basket.items[index].quantity === 0) {
                basket.items = basket.items.filter((item, idx) => idx !== index);
            }
        }
        const updatedBasket = await (await basket.save()).populate('items.product');
        return updatedBasket;
    }
}