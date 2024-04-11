const productService = require('./product.services');

module.exports = {
    getById: async (req, res, next) => {
        const product = await productService.getById(req.params.id);
        res.status(200).json(product);
    },
    addProduct: async (req, res, next) => {
        try {
            console.log(req.body);
            const newProduct = await productService.createProduct(req.body);
            res.status(201).json(newProduct);   
        }
        catch (err) {
            next(err)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            await productService.deleteProduct(req.params.id);
            res.status(200).json("Success");
        }
        catch (err) {
            next(err)
        }
    }
}