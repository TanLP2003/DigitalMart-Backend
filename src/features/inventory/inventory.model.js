const mongoose = require('mongoose');
const {Schema} = mongoose;

const inventorySchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true 
    },
    threshold: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

const Inventory = mongoose.model('inventories', inventorySchema);

module.exports = Inventory;