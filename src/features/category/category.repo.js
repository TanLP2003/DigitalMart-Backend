const {Category} = require('./category.model');

module.exports = {
    getAllCategory: async () => {
        return await Category.find({});
    },
    getByName: async (name) => {
        return await Category.findOne({name: name});
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
    }
}