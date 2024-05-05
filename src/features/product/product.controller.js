const productService = require('./product.service');

module.exports = {
    getById: async (req, res, next) => {
        const product = await productService.getById(req.params.id);
        res.status(200).json(product);
    },
    addProduct: async (req, res, next) => {
        try {
            // console.log(req.body);
            // console.log(req.files);
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
            const updatedProduct = await productService.updateProduct(id, req.body.data, req.files, req.body.deletedImages);
            res.status(200).json(updatedProduct);
        }
        catch(err) {
            next(err);
        }
    },
    getByCategory: async (req, res, next) => {
        const pageNumber = req.query.page || 1;
        const result = await productService.getByCategory(req.params.category, {pageNumber: pageNumber, pageSize: 9999});
        res.status(200).json({
            products: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage
        });
    },
    getProductToCache: async (req, res, next) => {
        await productService.getProductToCache();
        res.status(200).json({});
    }
}