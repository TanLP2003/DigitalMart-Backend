const BasketRepo = require('./basket.repo');
const ProductRepo = require('../product/product.repo');
const OrderService = require('../order/order.repo');
const { BadRequest } = require('../../utils/createError');
const redisRepo = require('../redis/redis.repo');
const { redis } = require('../../configs/config');

module.exports = {
    // getBasket: async (userId) => {
    //     const basketFromCache = await BasketRepo.getBasketFromCache(userId);
    //     if (basketFromCache) return basketFromCache;
    //     const basketFromDb = await BasketRepo.getBasketFromDb(userId);
    //     await BasketRepo.writeBasketToCache(userId, basketFromDb);
    //     return basketFromDb;
    // },
    // addItem: async (userId, productId) => {
    //     const product = await ProductRepo.getProductById(productId);
    //     if(!product) throw BadRequest("Product is not existed");
    //     // let basket = await BasketRepo.getBasket(userId);
    //     await ProductRepo.updateProduct(productId, { stock: product.stock - 1 }, [], []);
    //     const basket = await BasketRepo.addItem(userId, productId);
    //     return basket;
    // },
    // updateBasket: async (userId, productId, incrementBy) => {
    //     const product = await ProductRepo.getProductById(productId);
    //     if (!product) throw BadRequest("Product is not existed");
    //     const basket = await BasketRepo.getBasketFromDb(userId);
    //     const existingItemIndex = basket.items.findIndex(item => item.product.equals(productId));
    //     if (incrementBy > 0 && incrementBy > product.stock) {
    //         throw BadRequest("Product is out of stock");
    //     }
    //     if(incrementBy < 0) {
    //         if(existingItemIndex === -1 || basket.items[existingItemIndex].quantity + incrementBy < 0) {
    //             throw BadRequest("Product not existed in Basket or Invalid value change");
    //         }
    //     }
    //     await ProductRepo.updateProduct(productId, { stock: product.stock - incrementBy }, [], []);
    //     const updatedBasket = await BasketRepo.updateBasket(basket, existingItemIndex, productId, incrementBy);
    //     await BasketRepo.writeBasketToCache(userId, updatedBasket);
    //     return updatedBasket;
    // },
    checkoutSelectedItems: async (userId, selectedItems) => {
        const basket = await BasketRepo.getBasketFromDb(userId);
        let totalPrice = 0;
        const needDeletedBasketItems = [];
        const orderItems = selectedItems.map(item => {
            const basketItem = BasketRepo.getBasketItemInfo(basket, item);
            console.log("basket Item", basketItem);
            if (!basketItem) throw BadRequest("Product is not in basket");
            const orderItem = {
                product: basketItem.product,
                quantity: basketItem.quantity,
                subTotalPrice: basketItem.product.price * basketItem.quantity
            };
            totalPrice += orderItem.subTotalPrice;
            needDeletedBasketItems.push(basketItem);
            return orderItem;
        });
        const orderInfo = {
            items: orderItems,
            totalPrice: totalPrice
        };
        const newOrder = await OrderService.createOrder(userId, orderInfo);
        const updatedBasket = await BasketRepo.deleteFromBasket(basket, needDeletedBasketItems);
        await BasketRepo.writeBasketToCache(userId, updatedBasket);
        return newOrder;
    },
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
        await redisRepo.jsonSet(`inventory:${productId}`, '.', productInventory);
        // await redisRepo.hset(`basket:${userId}:product:quantity`, `${productId}`, quantityInBasket);
        await redisRepo.hset(`basket:${userId}`, `product:${productId}`, JSON.stringify({ product: product, quantity: quantityInBasket }));
    },
    getBasket: async (userId) => {
        let productList = [];
        const basketList = await redisRepo.hgetall(`basket:${userId}`);
        if (!basketList) return productList;
        for (const key of Object.keys(basketList)) {
            let productString = await redisRepo.hget(`basket:${userId}`, key);
            productList.push(JSON.parse(productString));
        }
        return productList;
    },
    createBasket: async (userId) => {

    }
}