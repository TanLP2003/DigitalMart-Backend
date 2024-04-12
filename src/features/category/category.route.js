const {
    getAll,
    addCategory,
    deleteCategory,
    renameCategory
} = require('./category.controllers');

const categoryRouter = require('express').Router();

categoryRouter.get('/', getAll);
categoryRouter.post('/', addCategory);
categoryRouter.delete('/:name', deleteCategory);
categoryRouter.put('/:id', renameCategory)
module.exports = categoryRouter;