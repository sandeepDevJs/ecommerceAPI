const {Router} = require("express")
const {celebrate }  = require("celebrate")
const { 
    signUpValidator, 
    updateValidator,
    loginValidator
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
const { authAdmin } = require("../middlewares/auth")

router
    .route("/")
    .get(authAdmin, getUsers)
    .post(celebrate(signUpValidator),createUser)

router
    .route("/login")
    .post(celebrate(loginValidator) ,loginUser)


router
    .route("/:id")
    .get(authAdmin, getUserById)
    .put(
        authAdmin,
        celebrate(updateValidator), 
        updateUser
    )
    .delete(authAdmin, deleteUser)

module.exports = router