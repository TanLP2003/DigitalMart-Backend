const categoryService = require('./category.services');

module.exports = {
    getAll: async (req, res) => {
        res.status(200).json(await categoryService.getAll());
    } ,
    addCategory: async (req, res) => {
        const newCategory = await categoryService.addCategory(req.body);
        res.status(200).json(newCategory);
    },
    deleteCategory: async (req, res) => {
        try {
            await categoryService.deleteCategory(req.params.name);
            res.status(200).json();
        }
        catch(err) {
            next(err);
        }
    }
}