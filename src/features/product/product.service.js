const { BadRequest, NotFound } = require('../../utils/createError');
const productRepo = require('./product.repo');
const categoryRepo = require('../category/category.repo');

module.exports = {
    getById: async (id) => {
        const product = await productRepo.getProductById(id);
        return product;
    },
    createProduct: async (product) => {
        const category = await categoryRepo.getById(product.category);
        console.log(category);
        if(!category) throw BadRequest(`Category is not existed!`);
        const newProduct = await productRepo.createProduct(product);
        return newProduct;
    },
    deleteProduct: async (id) => {
        const result = await productRepo.deleteProduct(id);
        if(!result) throw BadRequest("Bad request");
    },
    updateProduct: async (id, update) => {
        return await productRepo.updateProduct(id, update);
    },
    getByCategory: async (categoryId) => {
        return await productRepo.getByCategory(categoryId);
    }
}