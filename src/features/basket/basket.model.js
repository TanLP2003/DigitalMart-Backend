const mongoose = require('mongoose');

const {Schema} = mongoose;

const basketItemSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number,
        required: true
    }
})

const basketSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    items: {
        type: [basketItemSchema],
        default: []
    }
})

const Basket = mongoose.model('baskets', basketSchema);
module.exports = Basket;