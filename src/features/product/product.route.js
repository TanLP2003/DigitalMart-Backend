const productRouter = require('express').Router();
const Authentication = require('../../middlewares/checkAuth');
const {
    getById,
    addProduct,
    deleteProduct,
    updateProduct,
    getByCategory
} = require('./product.controller');

productRouter.get('/:id', Authentication, getById);
productRouter.post('/', addProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);
productRouter.get('/:category', getByCategory);
module.exports = productRouter;