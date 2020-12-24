const {Router} = require("express")
const {celebrate }  = require("celebrate")
const { 
    loginValidator
} = require("../middlewares/validators")

const router = Router()
const { 
    loginUser
} = require("../../services/auth")

router
    .route("/login")
    .post(celebrate(loginValidator), loginUser)

module.exports = router