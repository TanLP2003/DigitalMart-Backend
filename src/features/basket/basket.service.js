const BasketRepo = require('./basket.repo');
const ProductRepo = require('../product/product.repo');
const { BadRequest } = require('../../utils/createError');
module.exports = {
    getBasket: async (userId) => {
        return await BasketRepo.getBasket(userId);
    },
    addItem: async (userId, productId) => {
        const product = await ProductRepo.getProductById(productId);
        if(!product) throw BadRequest("Product is not existed");
        // let basket = await BasketRepo.getBasket(userId);
        await ProductRepo.updateProduct(productId, { stock: product.stock - 1 });
        const basket = await BasketRepo.addItem(userId, productId);
        return basket;
    }
}