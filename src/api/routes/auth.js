/**
 * 
 * Routes--
 * 
 * All Backend process are in services folder
 * 
 */

const {Router} = require("express")
const {celebrate }  = require("celebrate")
const { 
    loginValidator,
    emailValidator,
    passwordValidator
} = require("../middlewares/validators")

const router = Router()
const { 
    loginUser,
    forgotPassword,
    resetPassword
} = require("../../services/auth")

router
    .route("/login")
    .post(celebrate(loginValidator), loginUser)

router
    .route("/forgotPassword")
    .post(celebrate(emailValidator), forgotPassword)

router
    .route("/resetPassword/:token", resetPassword)
    .put(celebrate(passwordValidator), resetPassword)

module.exports = router