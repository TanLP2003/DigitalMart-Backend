const Joi = require('joi');

const CategoryReqValidate = (req) => {
    const commonSchema = Joi.object({
        name: Joi.string().required(),
    })
    return commonSchema.validate(req);
}

module.exports = CategoryReqValidate;