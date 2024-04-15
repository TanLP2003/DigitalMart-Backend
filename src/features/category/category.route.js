const Validation = require('../../middlewares/validation');
const {
    getAll,
    addCategory,
    deleteCategory,
    renameCategory
} = require('./category.controllers');
const CategoryReqValidate = require('./category.validation');

const categoryRouter = require('express').Router();

categoryRouter.get('/', getAll);
categoryRouter.post('/', Validation(CategoryReqValidate), addCategory);
categoryRouter.delete('/:name', Validation(CategoryReqValidate), deleteCategory);
categoryRouter.put('/:id', Validation(CategoryReqValidate), renameCategory)
module.exports = categoryRouter;