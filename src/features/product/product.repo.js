const Product = require('./product.model');

const createProduct = async (product) => {
    console.log("repo", product);
    const newProduct = await Product.create(product);
    return newProduct;
}

const getProductById = async (id) => {
    const product = await Product.findById(id).populate('category', 'name -_id');
    return product;
}

const updateProduct = async (id, updateBody, newImages, deletedImages) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateBody);
    if(newImages.length > 0) updatedProduct.images.push(...newImages);
    if(deletedImages.length > 0) deletedImages.forEach(deletedImage => {
        const index = updatedProduct.images.indexOf(deletedImage);
        if (index !== -1) {
            updatedProduct.images.splice(index, 1);
        }
    });
    await updatedProduct.save();
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