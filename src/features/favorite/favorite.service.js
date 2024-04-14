const FavoriteRepo = require('./favorite.repo');
const ProductRepo = require('../product/product.repo');
const { BadRequest } = require('../../utils/createError');

module.exports = {
    getWishList: async (userId) => {
        return await FavoriteRepo.getWishList(userId);
    },
    addProductToList: async (userId, productId) => {
        const product = await ProductRepo.getProductById(productId);
        if(!product) throw BadRequest("Product is not existed");
        const updatedFavorite = await FavoriteRepo.addProductToList(userId, product);
        return updatedFavorite;
    },
    removeFromFavorite: async (userId, productId) => {
        const product = await ProductRepo.getProductById(productId);
        if (!product) throw BadRequest("Product is not existed");
        return await FavoriteRepo.removeFromList(userId, productId);
    }
}