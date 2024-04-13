const productRouter = require('express').Router();
const uploadMulter = require('../../configs/multer');
const Authentication = require('../../middlewares/checkAuth');

const {
    getById,
    addProduct,
    deleteProduct,
    updateProduct,
    getByCategory
} = require('./product.controller');

productRouter.get('/:id', Authentication, getById);
productRouter.post('/', uploadMulter.array('images'), addProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);
productRouter.get('/:category', getByCategory);
module.exports = productRouter;