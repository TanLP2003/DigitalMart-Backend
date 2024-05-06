const Order = require('./order.model');

module.exports = {
    getAllOrder: async () => {
        const orders = await Order.find({})
            .populate({
                path: 'items',
                populate: { path: 'product' }
            })
            .exec();
        return orders;
    },
    getOrderByUserId: async (userId) => {
        const orders = await Order.find({ userId: userId })
            .populate({
                path: 'items',
                populate: { path: 'product' }
            })
            .exec();
        return orders;
    },
    createOrder: async (userId, orderInfo) => {
        const newOrder = await (await Order.create({ userId: userId, ...orderInfo })).populate({
            path: 'items',
            populate: { path: 'product' }
        });
        return newOrder;
    }
}