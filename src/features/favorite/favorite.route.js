const FavoriteController = require('./favorite.controller');
const favoriteRouter = require('express').Router();

favoriteRouter.get('/:userId', FavoriteController.getWishList);
favoriteRouter.post('/:userId/:productId', FavoriteController.addProductToList);
favoriteRouter.delete('/:userId/:productId', FavoriteController.removeFromList);

module.exports = favoriteRouter;