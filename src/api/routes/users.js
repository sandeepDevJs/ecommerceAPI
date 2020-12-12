const { Router } = require("express");
const userService = require("../../services/users")
const customResponse = require("../utils").customResponse
const validators = require("../middlewares/validators")
const router = Router();

//get all users
router.get("/", async (req, res)=>{

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
router.post("/register", validators.signUpValidations, async (req, res) => {

    let data = req.body
    userService.signUp(data)
    
    customResponse(res, {httpCode:200, status:1, message:"Registered Successfully!!", data:null});
})

module.exports = router   