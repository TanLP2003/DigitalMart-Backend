const { StatusCodes } = require('http-status-codes');
const OrderService = require('./order.service');

module.exports = {
    getOrderOfUser: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            res.status(StatusCodes.OK).json(await OrderService.getOrderOfUser(userId));
        }
        catch (err) {
            next(err);
        }
    },
    getAllOrder: async (req, res, next) => {
        try {
            console.log("all")
            res.status(StatusCodes.OK).json(await OrderService.getAllOrder());
        }
        catch (err) {
            next(err);
        }
    },
    // createOrder: async (req, res, next) => {
    //     try {
    //         const userId = req.headers['x-userId'];
    //         const result = await OrderService.createOrder(userId, req.body);
    //         res.status(StatusCodes.OK).json(result);
    //     }
    //     catch (err) {
    //         next(err);
    //     }
    // }
}