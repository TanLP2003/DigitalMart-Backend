const {
    getAll,
    addCategory,
    deleteCategory
} = require('./category.controllers');

const categoryRouter = require('express').Router();

categoryRouter.get('/', getAll);
categoryRouter.post('/', addCategory);
categoryRouter.delete('/:name', deleteCategory);

module.exports = categoryRouter;