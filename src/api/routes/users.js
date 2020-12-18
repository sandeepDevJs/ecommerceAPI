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