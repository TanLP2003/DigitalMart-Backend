const { StatusCodes } = require('http-status-codes');
const OrderService = require('./order.service');

module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            const orderInfo = req.body;
            res.status(StatusCodes.OK).json(await OrderService.createOrder(userId, orderInfo));
        }
        catch(err) {
            next(err);
        }
    },
    getOrderOfUser: async (req, res, next) => {
        try {
            const userId = req.headers['x-userId'];
            res.status(StatusCodes.OK).json(await OrderService.getOrderOfUser(userId));
        }
        catch(err) {
            next(err);
        }
    },
    getAllOrder: async (req, res, next) => {
        try {
            console.log("all")
            res.status(StatusCodes.OK).json(await OrderService.getAllOrder());
        }   
        catch (err){
            next(err);
        }
    }
}