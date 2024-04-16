const Joi = require('joi');
const {OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE} = require('../../utils/validators')

const updateBasketReqValidate = (req) => {
    const updateBasketSchema = Joi.object({
        productId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        incrementBy: Joi.number().greater(0)
    })
    return updateBasketSchema.validate(req);
}

const checkoutBasketReqValidate = (req) => {
    const checkoutBasketSchema = Joi.object({
        selectedItems: Joi.array().min(1).items(
            Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        )
    });
    return checkoutBasketSchema.validate(req);
}

module.exports = {
    updateBasketReqValidate,
    checkoutBasketReqValidate
}