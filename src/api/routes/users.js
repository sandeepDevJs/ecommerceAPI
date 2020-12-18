<<<<<<< HEAD
const {Router} = require("express")
const { 
    signUpValidator, 
    updateValidator, 
    logInValidator, 
    idValidator,
    queryValidator
} = require("../middlewares/validators")

const router = Router()
const { 
    getUsers, 
    getUserById, 
    createUser, 
    deleteUser, 
    updateUser, 
    loginUser
} = require("../../services/users")

router
    .route("/")
    .get([queryValidator, getUsers])
    .post([signUpValidator, createUser])

router
    .route("/login")
    .post([logInValidator, loginUser])


router
    .route("/:id")
    .get([idValidator, getUserById])
    .put([updateValidator, updateUser])
    .delete([idValidator, deleteUser])

module.exports = router
=======
const { Router } = require("express");
const userService = require("../../services/users")
const customResponse = require("../utils").customResponse
const { validator, idValidator } = require("../middlewares/validators")
const auths = require("../middlewares/auth")
const router = Router();

//get all users
router.get("/", [auths.checkUser, auths.authAdmin], async (req, res)=>{

    let data = await userService.getUser()
    customResponse(res, data)

})

//get user by id
router.get("/:id", [auths.checkUser, auths.authAdmin, idValidator], async (req, res) => {

    let id = req.params.id
    let data = await userService.getUser(id)

    customResponse(res, data)

})

//User Sign up
router.post("/", (req, res, next) => validator(req, res, next, "signUp"), async (req, res) => {

    let data = req.body
    data = await userService.signUp(data)
    
    customResponse(res, data);
})

// User Login
router.post("/login", (req, res, next) => validator(req, res, next, "logIn"), async(req, res) => {
    let data = req.body
    data = await userService.login(data)
    
    customResponse(res, data);
})

//Update User Data
router.put("/:id", [
                    auths.checkUser, 
                    auths.authAdmin,  
                    idValidator, 
                    (req, res, next) => validator(req, res, next, "update")
                ], 
                async (req, res) => {

                    let requestedData = req.body
                    let id = req.params.id
                    let data = await userService.UserUpdate(id, requestedData)

                    customResponse(res, data)
                })

module.exports = router   
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
