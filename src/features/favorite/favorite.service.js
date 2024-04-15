const FavoriteRepo = require('./favorite.repo');
const ProductRepo = require('../product/product.repo');
const { BadRequest } = require('../../utils/createError');

module.exports = {
    getFavoriteOfUser: async (userId) => {
        let favorite = await FavoriteRepo.getFavoriteFromCache(userId);
        if(favorite) return favorite;
        favorite = await FavoriteRepo.getFavoriteFromDb(userId);
        await FavoriteRepo.writeFavoriteToCache(userId, favorite);
        return 
    },
    addProductToList: async (userId, productId) => {
        const product = await ProductRepo.getProductById(productId);
        if(!product) throw BadRequest("Product is not existed");
        const favorite = await FavoriteRepo.getFavoriteFromDb(userId);
        const existingItemIndex = favorite.items.findIndex(item => item.equals(product.id));
        if (existingItemIndex !== -1) return await favorite.populate('items');
        const updatedFavorite = await FavoriteRepo.addProductToList(favorite, product);
        await FavoriteRepo.writeFavoriteToCache(userId, updatedFavorite);
        return updatedFavorite;
    },
    removeFromFavorite: async (userId, productId) => {
        const product = await ProductRepo.getProductById(productId);
        if (!product) throw BadRequest("Product is not existed");
        const existingItemIndex = favorite.items.findIndex(item => item.equals(product.id));
        if (existingItemIndex === -1) return await favorite.populate('items');
        const updatedFavorite =  await FavoriteRepo.removeFromList(userId, productId);
        await FavoriteRepo.writeFavoriteToCache(userId, updatedFavorite);
        return updatedFavorite;
    }
}