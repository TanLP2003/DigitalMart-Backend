const Basket = require('./basket.model');

module.exports = {
    createBasket: async (userId) => {
        await Basket.create({userId: userId});
    },
    addItem: async () => {

    },
    updateBasket: async (productId, incrementBy) => {

    },
    deleteItem: async (productId) => {

    }
}