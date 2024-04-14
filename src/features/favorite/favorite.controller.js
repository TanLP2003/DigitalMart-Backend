const { StatusCodes } = require('http-status-codes');
const FavorService = require('./favorite.service');
const favoriteService = require('./favorite.service');

module.exports = {
    getWishList: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            res.status(StatusCodes.OK).json(await FavorService.getWishList(userId));
        }
        catch(err) {
            next(err);
        }
    },
    addProductToList: async (req, res, next) => {
        try {
            const {userId, productId} = req.params;
            res.status(StatusCodes.OK).json(await FavorService.addProductToList(userId, productId));
        }
        catch (err) {
            next(err);
        }
    },
    removeFromList: async (req, res, next) => {
        try {
            const { userId, productId } = req.params;
            res.status(StatusCodes.OK).json(await favoriteService.removeFromFavorite(userId, productId));
        }
        catch (err) {
            next(err)
        }
    }
}