const OrderService = require('../order/order.repo');
const { BadRequest } = require('../../utils/createError');
const redisRepo = require('../redis/redis.repo');

module.exports = {
    updateBasket: async (userId, product, incrementBy) => {
        const productId = product._id;
        let productInBasket = await redisRepo.hget(`basket:${userId}`, `product:${productId}`);
        let quantityInBasket = 0;
        if (productInBasket) {
            quantityInBasket = JSON.parse(productInBasket).quantity;
        }
        quantityInBasket = parseInt(quantityInBasket);
        let productInventory = await redisRepo.jsonGet(`inventory:${productId}`);
        if (!productInventory) {
            throw BadRequest(`Product is not exist`);
        }
        const { threshold, stock } = productInventory;
        if (threshold < incrementBy + quantityInBasket) {
            throw BadRequest("Product quantity in basket can not exceed threshold");
        }
        if (stock < incrementBy) {
            throw BadRequest("Stock is not enough");
        }
        productInventory.stock = stock - incrementBy;
        quantityInBasket += incrementBy;
        if(quantityInBasket < 0) {
            throw BadRequest("Quantity must be greater than zero");
        }
        if(quantityInBasket == 0){
            await redisRepo.hdel(`basket:${userId}`, `product:${productId}`);
            return;
        }
        await redisRepo.jsonSet(`inventory:${productId}`, '.', productInventory);
        await redisRepo.hset(`basket:${userId}`, `product:${productId}`, JSON.stringify({ product: product, quantity: quantityInBasket }));
        // return await getBasket(userId);
    },
    getBasket: async (userId) => {
        let productList = [];
        const basketList = await redisRepo.hgetall(`basket:${userId}`);
        if (!basketList) return { userId: userId, items: productList };
        for (const key of Object.keys(basketList)) {
            let productString = await redisRepo.hget(`basket:${userId}`, key);
            productList.push(JSON.parse(productString));
        }
        return { userId: userId, items: productList };
    },
    checkoutSelectedItems: async (userId, selectedItem, paymentInfo) => {
        let totalPrice = 0;
        let orderItemList = await Promise.all(selectedItem.map(async item => {
            const productInBasketString = await redisRepo.hget(`basket:${userId}`, `product:${item}`);
            const { product, quantity } = JSON.parse(productInBasketString);
            const orderItem = {
                product: product,
                quantity: quantity,
                subTotalPrice: product.price * quantity
            }
            totalPrice += product.price * quantity;
            await redisRepo.hdel(`basket:${userId}`, `product:${item}`);
            return orderItem;
        }));
        console.log(orderItemList);
        const orderInfo = {
            items: orderItemList,
            totalPrice: totalPrice,
            cardName: paymentInfo.cardName,
            cardNumber: paymentInfo.cardNumber,
            cvv: paymentInfo.cvv,
            expiration: paymentInfo.expiration
        }
        const newOrder = await OrderService.createOrder(userId, orderInfo);
        return newOrder;
    }
}