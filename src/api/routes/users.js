const { Router } = require("express");
const userService = require("../../services/users")
const customResponse = require("../utils").customResponse
const validators = require("../middlewares/validators")
const auths = require("../middlewares/auth")
const router = Router();

//get all users
router.get("/", [auths.checkUser, auths.authAdmin], async (req, res)=>{

    let data = await userService.getUser()
    customResponse(res, data)

})

//get user by id
router.get("/:id", async (req, res) => {

    let id = req.params.id
    let data = await userService.getUser(id)

    customResponse(res, data)

})

//User Sign up
router.post("/", validators.signUpValidations, async (req, res) => {

    let data = req.body
    data = await userService.signUp(data)
    
    customResponse(res, data);
})

// User Login
router.post("/login", validators.signInValidations, async(req, res) => {
    let data = req.body
    data = await userService.login(data)
    
    customResponse(res, data);
})

module.exports = router   