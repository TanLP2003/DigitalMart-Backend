const {Category} = require('./category.model');
const Product = require('../product/product.model');
module.exports = {
    getAllCategory: async () => {
        return await Category.find({});
    },
    getById: async (id) => {
        return await Category.findById(id);
    },
    addCategory: async (category) => {
        const newCategory = await Category.create(category);
        return newCategory;
    },
    deleteCategory: async (name) => {
        const deletedCategory = await Category.findOneAndDelete({name: name});
        return !deletedCategory ? false: true; 
    },
    renameCategory: async (id, newName) => {
        return await Category.findByIdAndUpdate(id, {name: newName}, {new: true});
    }
}