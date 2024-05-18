const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
})


const Category = mongoose.model("categories", categorySchema);

module.exports = { categorySchema, Category };