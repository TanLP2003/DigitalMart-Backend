const Favorite = require('./favorite.model');
const {redisClient} = require('../../configs/init.db');

module.exports = {
    getFavoriteFromCache: async (userId) => {
        let loveList = await redisClient.get(`favorite:${userId}`);
        if (loveList) return JSON.parse(loveList);
        return null;
    },
    writeFavoriteToCache: async (key, value) => {
        let favoriteKey = `favorite:${key}`;
        await redisClient.set(favoriteKey, JSON.stringify(value));
    },
    getFavoriteFromDb: async (userId) => {
        let loveList = await Favorite.findOne({userId: userId}).populate('items').exec();
        if(!loveList) loveList = await Favorite.create({userId: userId});
        return loveList;
    },
    addProductToList: async (favorite, product) => {
        favorite.items.push(product.id);
        const updatedFavorite = await (await favorite.save()).populate('items');
        return updatedFavorite;
    },
    removeFromList: async (favorite, index) => {
        favorite.items = favorite.items.filter((_, idx) => idx !== index);
        const updatedFavorite = await (await favorite.save()).populate('items');
        return updatedFavorite;
    }
}