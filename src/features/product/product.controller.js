const productService = require('./product.service');

module.exports = {
    getById: async (req, res, next) => {
        const product = await productService.getById(req.params.id);
        res.status(200).json(product);
    },
    addProduct: async (req, res, next) => {
        try {
            console.log(req.body);
            console.log(req.files);
            const newProduct = await productService.createProduct(req.body, req.files);
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
    },
    updateProduct: async (req, res, next) => {
        const {id} = req.params;
        try {
            const updatedProduct = await productService.updateProduct(id, req.body);
            res.status(200).json(updatedProduct);
        }
        catch(err) {
            next(err);
        }
    },
    getByCategory: async (req, res, next) => {
        res.status(200).json(await productService.getByCategory(req.params.category))
    }
}