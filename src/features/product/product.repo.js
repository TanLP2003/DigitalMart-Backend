const Product = require('./product.model');

const createProduct = async (product) => {
    const newProduct = await Product.create(product);
    return newProduct;
}

const getProductById = async (id) => {
    const product = await Product.findById(id).populate('category', 'name -_id');
    return product;
}

const updateProduct = async (id, update) => {
    await Product.findByIdAndUpdate(id, update);
    const updatedProduct = Product.findById(id);
    return updatedProduct;
}

const deleteProduct = async (id) => {
    const deleteProduct = await Product.findByIdAndDelete(id);
    return !deleteProduct ? false : true;
}

const getByCategory = async (category) => {
    const products = await Product.find({category: category});
    return products;
}



module.exports = productRepo = {
    getProductById, 
    getByCategory,
    createProduct,
    updateProduct,
    deleteProduct
}