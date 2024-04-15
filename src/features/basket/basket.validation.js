const Joi = require('joi');
const {OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE} = require('../../utils/validators')

const updateBasketReqValidate = (req) => {
    const updateBasketSchema = Joi.object({
        productId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        quantity: Joi.number().greater(0)
    })
    return updateBasketSchema.validate(req);
}

module.exports = {
    updateBasketReqValidate
}