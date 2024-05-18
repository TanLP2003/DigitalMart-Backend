const { BadRequest } = require('../../utils/createError');
const uploadService = require('../upload/upload.service');
const categoryRepo = require('./category.repo');

module.exports = {
    getAll: async () => {
        return await categoryRepo.getAllCategory();
    },
    addCategory: async (category, image) => {
        const imageUrl = await uploadService.uploadSingleFile(image);
        category.image = imageUrl;
        return await categoryRepo.addCategory(category);
    },
    deleteCategory: async (name) => {
        let result = await categoryRepo.deleteCategory(name);
        if (!result) throw BadRequest("Bad Request");
    },
    renameCategory: async (id, newName) => {
        return await categoryRepo.renameCategory(id, newName);
    }
}