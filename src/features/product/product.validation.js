const Joi = require('joi');
const {OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE} = require('../../utils/validators');

const addProductValidate = (req) => {
    const addProductSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().max(300).required(),
        price: Joi.number().required(),
        brand: Joi.string(),
        stock: Joi.number().min(1).required(),
        category: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        metadata: Joi.object().default({})
    })
    return addProductSchema.validate(req);
}

const updateProductValidate = (req) => {
    const updateProductSchema = Joi.object({
        data: Joi.object().keys({
            name: Joi.string().min(3),
            description: Joi.string().max(300),
            price: Joi.number(),
            brand: Joi.string(),
            stock: Joi.number().min(0),
            category: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            metadata: Joi.object().default({})
        }),
        deletedImages: Joi.array().default([]) 
    })
    return updateProductSchema.validate(req);
}

module.exports = {
    addProductValidate, updateProductValidate
}

