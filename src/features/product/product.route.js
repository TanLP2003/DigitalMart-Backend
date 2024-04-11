const productRouter = require('express').Router();
const {
    getById,
    addProduct,
    deleteProduct
} = require('./product.controller');

productRouter.get('/:id', getById);
productRouter.post('/', addProduct);
productRouter.delete('/:id', deleteProduct);
module.exports = productRouter;