const createError = require('http-errors');

module.exports = {
    notFound: (message) => createError(404, message),
    badRequest: (message) => createError(400, message)
}