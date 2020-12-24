const crypto = require("crypto")
const asyncHandler = require("../api/middlewares/asyncHandler")
const crudOPs = require("../models")
const { verify } = require("../utils/encrypter")
const { generateToken } = require("../utils/jwt")

module.exports.loginUser = asyncHandler(async(req, res) =>{

    let { email , password }  = req.body
    let userData = await crudOPs.getData("users", 0, { email }, "+password")
    let result = await verify(password, userData[0].password)        
    if (result) {
        let token = generateToken(userData[0])
        res.send({success:true, message:"You're logged In", token})
    }else{
        res.status(401).send({success:false, message:"Invalid Credentials!!"})
    }

})

module.exports.forgotPassword = asyncHandler( async (req, res) => {

    let { email } = req.body
    let userData = await crudOPs.getData("users", 0, { email })
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetPasswordToken =  crypto
                                .createHash("sha256")
                                .update(resetToken)
                                .digest('hex')


})
//11690