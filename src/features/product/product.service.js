const { BadRequest, NotFound } = require('../../utils/createError');
const productRepo = require('./product.repo');
const categoryRepo = require('../category/category.repo');
const UploadService = require('../upload/upload.service');

module.exports = {
    getById: async (id) => {
        const product = await productRepo.getProductById(id);
        return product;
    },
    createProduct: async (product, images) => {
        const category = await categoryRepo.getById(product.category);
        console.log(category);
        if(!category) throw BadRequest(`Category is not existed!`);
        const urls = await UploadService.uploadMultiFile(images);
        product.images = urls;
        const newProduct = await productRepo.createProduct(product);
        return newProduct;
    },
    deleteProduct: async (id) => {
        const result = await productRepo.deleteProduct(id);
        if(!result) throw BadRequest("Bad request");
    },
    updateProduct: async (id, updateBody, newImage, deletedImage) => {
        if(updateBody.category){
            const category = await categoryRepo.getById(updateBody.category);
            console.log(category);
            if (!category) throw BadRequest(`Category is not existed!`);
        }
        let urls = [];
        if(newImage.length > 0){
            urls = await UploadService.uploadMultiFile(newImage);
        }
        if(!deletedImage) deletedImage = [];
        return await productRepo.updateProduct(id, updateBody, urls, deletedImage);
    },
    getByCategory: async (categoryId) => {
        return await productRepo.getByCategory(categoryId);
    }
}