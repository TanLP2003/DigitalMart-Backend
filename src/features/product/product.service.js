const { BadRequest, NotFound } = require('../../utils/createError');
const productRepo = require('./product.repo');
const categoryRepo = require('../category/category.repo');
const { createProcessImageJob } = require('../../backgroundtask/imageJobQueue');
const InventoryService = require('../inventory/inventory.service');

module.exports = {
    getAll: async (options) => {
        return await productRepo.getAll(options);
    },
    getById: async (id) => {
        const product = await productRepo.getProductById(id);
        return product;
    },
    createProduct: async (product, inventory, images) => {
        const category = await categoryRepo.getById(product.category);
        if (!category) throw BadRequest(`Category is not existed!`);
        const newProduct = await productRepo.createProduct(product);
        await createProcessImageJob(newProduct.id, images, []);
        await InventoryService.createInventory({
            productId: newProduct.id,
            productName: newProduct.name,
            threshold: inventory.threshold,
            stock: inventory.stock
        })
        return newProduct;
    },
    deleteProduct: async (id) => {
        const result = await productRepo.deleteProduct(id);
        if (!result) throw BadRequest("Bad request");
    },
    updateProduct: async (id, updateBody, newImages, deletedImage) => {
        if (updateBody.category) {
            const category = await categoryRepo.getById(updateBody.category);
            console.log(category);
            if (!category) throw BadRequest(`Category is not existed!`);
        }
        if (!deletedImage) deletedImage = [];
        await createProcessImageJob(id, newImages, deletedImage);
        return await productRepo.updateProduct(id, updateBody);
    },
    getByCategory: async (categoryId, options) => {
        return await productRepo.getByCategory(categoryId, options);
    },
    getProductToCache: async () => {
        await productRepo.getProductToCache();
    },
}