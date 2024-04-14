const Favorite = require('./favorite.model');
const {redisClient} = require('../../configs/init.db');

module.exports = {
    getWishList: async (userId) => {
        let loveList = await redisClient.get(`favorite:${userId}`);
        if(loveList) return JSON.parse(loveList);
        loveList = await Favorite.findOne({userId: userId}).populate('items');
        if(!loveList) loveList = await Favorite.create({userId: userId});
        await redisClient.set(`favorite:${userId}`, JSON.stringify(loveList));
        return loveList;
    },
    addProductToList: async (userId, product) => {
        let favorite = await Favorite.findOne({userId: userId});
        const existingItemIndex = favorite.items.findIndex(item => item.equals(product.id));
        if(existingItemIndex !== -1) return await favorite.populate('items');
        favorite.items.push(product.id);
        const updatedFavorite = await (await favorite.save()).populate('items');
        await redisClient.set(`favorite:${userId}`, JSON.stringify(updatedFavorite));
        return updatedFavorite;
    },
    removeFromList: async (userId, productId) => {
        const favorite = await Favorite.findOne({userId: userId});
        favorite.items = favorite.items.filter(item => !item.equals(productId));
        const updatedFavorite = await (await favorite.save()).populate('items');
        await redisClient.set(`favorite:${userId}`, JSON.stringify(updatedFavorite));
        return updatedFavorite;
    }
}