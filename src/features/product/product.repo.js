const Product = require('./product.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const createProduct = async (product) => {
    product.category = new ObjectId(product.category);
    const newProduct = await Product.create(product);
    return newProduct;
}

const getProductById = async (id) => {
    const product = await Product.findById(id).populate('category', 'name -_id');
    return product;
}

const updateProduct = async () => {

}

const deleteProduct = async (id) => {
    const deleteProduct = await Product.findByIdAndDelete(id);
    return !deleteProduct ? false : true;
}

const getByCategory = async (category) => {
    
}

module.exports = productRepo = {
    getProductById, 
    getByCategory,
    createProduct,
    updateProduct,
    deleteProduct
}