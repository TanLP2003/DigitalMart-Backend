const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        double: true,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    brand: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    metadata: {
        type: Map,   
        of: String
    }
})

module.exports = Product = mongoose.model("products", productSchema);