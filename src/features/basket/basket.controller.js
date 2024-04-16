const { StatusCodes } = require('http-status-codes');
const BasketService = require('./basket.service');

module.exports = {
    getBasket: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            console.log(userId);
            const basket = await BasketService.getBasket(userId);
            res.status(StatusCodes.OK).json(basket);
        }
        catch(err) {
            next(err);
        }
    },
    // addItem: async (req, res, next) => {
    //     try {
    //         const {userId, productId} = req.params;
    //         const updatedBasket = await BasketService.addItem(userId, productId);
    //         res.status(StatusCodes.ACCEPTED).json(updatedBasket);
    //     }
    //     catch(err) {
    //         next(err);
    //     }
    // },
    updateBasket: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            console.log(userId);
            const updatedBasket = await BasketService.updateBasket(userId, req.body.productId, req.body.incrementBy);
            res.status(StatusCodes.OK).json(updatedBasket);
        }
        catch(err) {
            next(err);
        }
    },
    checkoutBasket: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            const newOrder = await BasketService.checkoutSelectedItems(userId, req.body.selectedItems);
            res.status(StatusCodes.OK).json(newOrder);
        }
        catch (err) {
            next(err);
        }
    }
}