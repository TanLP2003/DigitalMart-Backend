const productRouter = require('express').Router();
const uploadMulter = require('../../configs/multer');
const Authentication = require('../../middlewares/checkAuth');
const Validation = require('../../middlewares/validation');
const CONSTANT = require('../../utils/constant');
const {
    getById,
    addProduct,
    deleteProduct,
    updateProduct,
    getByCategory
} = require('./product.controller');
const { addProductValidate, updateProductValidate } = require('./product.validation');

productRouter.get('/:id', getById);
productRouter.post('/', Authentication(CONSTANT.ROLE.ADMIN), uploadMulter.array('images'), Validation(addProductValidate), addProduct);
productRouter.delete('/:id', Authentication(CONSTANT.ROLE.ADMIN), deleteProduct);
productRouter.put('/:id', Authentication(CONSTANT.ROLE.ADMIN), uploadMulter.array('newImages'), Validation(updateProductValidate), updateProduct);
productRouter.get('/category/:category', getByCategory);

module.exports = productRouter;