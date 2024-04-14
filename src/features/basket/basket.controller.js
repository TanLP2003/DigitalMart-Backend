const { StatusCodes } = require('http-status-codes');
const BasketService = require('./basket.service');

module.exports = {
    getBasket: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const basket = await BasketService.getBasket(userId);
            res.status(StatusCodes.OK).json(basket);
        }
        catch(err) {
            next(err);
        }
    },
    addItem: async (req, res, next) => {
        try {
            const {userId, productId} = req.params;
            const updatedBasket = await BasketService.addItem(userId, productId);
            res.status(StatusCodes.ACCEPTED).json(updatedBasket);
        }
        catch(err) {
            next(err);
        }
    }
}