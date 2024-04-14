const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderItemSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const orderSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true
    }
})