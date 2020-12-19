const ErrorResponse = require("../../utils/errorResponse")
const { isCelebrateError } = require("celebrate")
module.exports = (err, req, res, next) =>{
    
    let error = { ...err }
    error.message = err.message

    //mongoose bad ObjectId
    if (err.name==="CastError") {
        error = new ErrorResponse(`Resourse Not Found id of ${err.value}`, 404)
    }

    //mongoose duplicate error
    if (err.code === 11000) {
        error = new ErrorResponse(`Resourse Already Exists`, 400)
    }

    //if validation Error
    if (err.name === "ValidationError") {
        let validationErrors = Object.values(err.errors).map(e => e.message)
        error = new ErrorResponse(validationErrors, 400)
    }

    //if celebrate error
    if(isCelebrateError(err)){
        error = new ErrorResponse(err.details.get("body").details[0].message, 400)
    }

    res.status(error.statusCode || 500).send({
        success:0,
        error:error.message || "Server Error"
    })
}