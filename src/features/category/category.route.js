const uploadMulter = require('../../configs/multer');
const Validation = require('../../middlewares/validation');
const CategoryController = require('./category.controllers');
const CategoryReqValidate = require('./category.validation');

const categoryRouter = require('express').Router();

categoryRouter.get('/', CategoryController.getAll);
categoryRouter.post('/', uploadMulter.single('image'), Validation(CategoryReqValidate), CategoryController.addCategory);
categoryRouter.delete('/:name', Validation(CategoryReqValidate), CategoryController.deleteCategory);
categoryRouter.put('/:id', Validation(CategoryReqValidate), CategoryController.renameCategory)
categoryRouter.get('/number-of-categories', CategoryController.getNumberOfCategories)

module.exports = categoryRouter;