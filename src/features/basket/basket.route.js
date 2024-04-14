const BasketController = require('./basket.controller');
const basketRouter = require('express').Router();

basketRouter.get('/:userId', BasketController.getBasket);
basketRouter.post('/:userId/:productId', BasketController.addItem);

module.exports = basketRouter;