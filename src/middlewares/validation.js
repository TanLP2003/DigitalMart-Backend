const Validation = (validationFunc) => (req, res, next) => {
    const {error} = validationFunc(req.body);
    if(error) next(error);
    next();
}

module.exports = Validation;