const { StatusCodes } = require('http-status-codes');
const FavorService = require('./favorite.service');

module.exports = {
    getFavoriteOfUser: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            res.status(StatusCodes.OK).json(await FavorService.getFavoriteOfUser(userId));
        }
        catch(err) {
            next(err);
        }
    },
    addProductToList: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const userId = req.headers['x-userId'];
            res.status(StatusCodes.OK).json(await FavorService.addProductToList(userId, productId));
        }
        catch (err) {
            next(err);
        }
    },
    removeFromList: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const userId = req.headers['x-userId'];
            res.status(StatusCodes.OK).json(await FavoriteService.removeFromFavorite(userId, productId));
        }
        catch (err) {
            next(err)
        }
    }
}