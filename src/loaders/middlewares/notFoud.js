const ErrorResponse = require("../../utils/errorResponse")
module.exports = (req, res, next) => {
    next(new ErrorResponse("Path Not Found!!", 404))
}