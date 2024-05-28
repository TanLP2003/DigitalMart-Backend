const { StatusCodes } = require('http-status-codes');
const PaymentService = require('./payment.service');
module.exports = {
    createPayReq: async (req, res, next) => {
        const vnpUrl = PaymentService.createPaymentUrl();
        res.redirect(vnpUrl);
    },
    handleReturnPay: async (req, res, next) => {
        console.log("Body request", req.body)
        console.log("Params request", req.params)
        console.log("Headers", req.headers);
        console.log("Queries", req.query);
        res.status(StatusCodes.OK).json("Success");
    }
}