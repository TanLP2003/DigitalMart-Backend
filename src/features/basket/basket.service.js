const BasketRepo = require('./basket.repo');
const ProductRepo = require('../product/product.repo');
const OrderService = require('../order/order.repo');
const { BadRequest } = require('../../utils/createError');

module.exports = {
    getBasket: async (userId) => {
        const basketFromCache = await BasketRepo.getBasketFromCache(userId);
        if(basketFromCache) return basketFromCache;
        const basketFromDb = await BasketRepo.getBasketFromDb(userId);
        await BasketRepo.writeBasketToCache(userId, basketFromDb);
        return basketFromDb;
    },
    // addItem: async (userId, productId) => {
    //     const product = await ProductRepo.getProductById(productId);
    //     if(!product) throw BadRequest("Product is not existed");
    //     // let basket = await BasketRepo.getBasket(userId);
    //     await ProductRepo.updateProduct(productId, { stock: product.stock - 1 }, [], []);
    //     const basket = await BasketRepo.addItem(userId, productId);
    //     return basket;
    // },
    updateBasket: async (userId, productId, incrementBy) => {
        const product = await ProductRepo.getProductById(productId);
        if (!product) throw BadRequest("Product is not existed");
        const basket = await BasketRepo.getBasketFromDb(userId);
        const existingItemIndex = basket.items.findIndex(item => item.product.equals(productId));
        if (incrementBy > 0 && incrementBy > product.stock) {
            throw BadRequest("Product is out of stock");
        }
        if(incrementBy < 0) {
            if(existingItemIndex === -1 || basket.items[existingItemIndex].quantity + incrementBy < 0) {
                throw BadRequest("Product not existed in Basket or Invalid value change");
            }
        }
        await ProductRepo.updateProduct(productId, { stock: product.stock - incrementBy }, [], []);
        const updatedBasket = await BasketRepo.updateBasket(basket, existingItemIndex, productId, incrementBy);
        await BasketRepo.writeBasketToCache(userId, updatedBasket);
        return updatedBasket;
    },
    checkoutSelectedItems: async (userId, selectedItems) => {
        const basket = await BasketRepo.getBasketFromDb(userId);
        let totalPrice = 0;
        const needDeletedBasketItems = [];
        const orderItems = selectedItems.map(item => {
            const basketItem = BasketRepo.getBasketItemInfo(basket, item);
            console.log("basket Item", basketItem);
            if(!basketItem) throw BadRequest("Product is not in basket");
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
    }
}