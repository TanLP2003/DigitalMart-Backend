const { BadRequest, NotFound } = require('../../utils/createError');
const productRepo = require('./product.repo');
const categoryRepo = require('../category/category.repo');
const { createProcessImageJob } = require('../../backgroundtask/imageJobQueue');
const InventoryService = require('../inventory/inventory.service');
const CategoryService = require('../category/category.service');
const uploadService = require('../upload/upload.service');
const { ProductRedisRepo } = require('../../configs/init.db');

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
        const urls = await uploadService.uploadMultiFile(images);
        product.images = urls;
        const newProduct = await productRepo.createProduct(product);
        // await createProcessImageJob(newProduct.id, images, []);
        await InventoryService.createInventory({
            productId: newProduct.id,
            threshold: inventory.threshold,
            stock: inventory.stock
        })
        await ProductRedisRepo.save({
            productId: newProduct.id,
            productName: newProduct.name
        });
        return newProduct;
    },
    deleteProduct: async (id) => {
        const result = await productRepo.deleteProduct(id);
        if (!result) throw BadRequest("Bad request");
    },
    updateProduct: async (id, updateBody, newImages, deletedImage) => {
        console.log("service", newImages);
        if (!updateBody) updateBody = {};
        if (updateBody.category) {
            const category = await categoryRepo.getById(updateBody.category);
            console.log(category);
            if (!category) throw BadRequest(`Category is not existed!`);
        }
        if (!deletedImage) deletedImage = [];
        // await createProcessImageJob(id, newImages, deletedImage);
        let urls = [];
        if (newImages && newImages.length > 0) urls = await uploadService.uploadMultiFile(newImages);
        const updatedProduct = await productRepo.updateProduct(id, updateBody, urls, deletedImage);
        const entityId = await ProductRedisRepo.search().where('productId').matchExact(updatedProduct.id).returnFirstId();
        const productToSearch = await ProductRedisRepo.fetch(entityId);
        productToSearch.productName = updatedProduct.name;
        await ProductRedisRepo.save(productToSearch);
        if (updateBody.stock) {
            await InventoryService.updateInventory(id, 'stock', updateBody.stock);
        }
        if (updateBody.threshold) {
            await InventoryService.updateInventory(id, 'threshold', updateBody.threshold);
        }
        return updatedProduct;
    },
    getByCategory: async (categoryId, options) => {
        return await productRepo.getByCategory(categoryId, options);
    },
    getProductToCache: async () => {
        await productRepo.getProductToCache();
    },
    getTenProductPerCategory: async () => {
        console.log("asdfasdf");
        const categoryList = await CategoryService.getAll();
        let result = await Promise.all(categoryList.map(async category => {
            const tenProduct = await productRepo.getTenProductByCategory(category.id);
            return {
                category: category.name,
                tenProduct: tenProduct
            };
        }));
        console.log(result);
        return result;
    },
    searchProduct: async (name) => {
        console.log(name);
        const products = await ProductRedisRepo.search().where('productName')
            .match(name, { fuzzyMatching: true })
            .return.all();
        return products;
    }
}