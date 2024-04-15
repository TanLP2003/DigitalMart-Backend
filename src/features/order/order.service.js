const userRepo = require('../user/user.repo');
const OrderRepo = require('./order.repo');

module.exports = {
    getOrderOfUser: async (userId) => {
        const orders = await OrderRepo.getOrderByUserId(userId);
        return orders;
    },
    createOrder: async (userId, orderInfo) => {
        const newOrder = await OrderRepo.createOrder(userId, orderInfo);
        return newOrder;
    },
    getAllOrder: async () => {
        return await OrderRepo.getAllOrder();
    }
}