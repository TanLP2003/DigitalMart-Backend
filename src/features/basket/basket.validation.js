const Joi = require('joi');
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('../../utils/validators')

const updateBasketReqValidate = (req) => {
    const updateBasketSchema = Joi.object({
        product: Joi.object().keys({
            _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            name: Joi.string().required(),
            description: Joi.string().max(300).required(),
            images: Joi.array().required(),
            price: Joi.number().required(),
            brand: Joi.string().required(),
            category: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
            metadata: Joi.object().default({}),
        }),
        incrementBy: Joi.number().greater(0).required()
    })
    return updateBasketSchema.validate(req);
}

const checkoutBasketReqValidate = (req) => {
    console.log("validating.....");
    const checkoutBasketSchema = Joi.object({
        selectedItems: Joi.array().min(1).items(
            Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        ),
        cardName: Joi.string().required(),
        cardNumber: Joi.string().required(),
        cvv: Joi.string().required(),
        expiration: Joi.string().required()
    });
    return checkoutBasketSchema.validate(req);
}

module.exports = {
    updateBasketReqValidate,
    checkoutBasketReqValidate
}