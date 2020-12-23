const asyncHandler = require("./asyncHandler")
const ErrorResponse = require("../../utils/errorResponse")
const { verify } = require("../../utils/jwt")

module.exports.auth = asyncHandler( async (req, res, next) =>{

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return next(new ErrorResponse("You're Not Authorize To Access This Particular Route", 401))
    }

    let decoded = verify(token)
    req.userData = decoded
    next() 
})

module.exports.authAdmin = asyncHandler( async (req, res, next) => {

    if (req.userData) {
        if (req.userData.isAdmin) {
            return next()
        }
        return next(new ErrorResponse("You're Not Authorize To Access This Particular Route", 401))
    }
    return next(new ErrorResponse("You're Not Authorize To Access This Particular Route", 401))

}) 