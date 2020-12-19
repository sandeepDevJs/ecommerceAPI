const {Router} = require("express")
const {celebrate }  = require("celebrate")
const { 
    signUpValidator, 
    updateValidator,
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
    .get(getUsers)
    .post(celebrate(signUpValidator),createUser)

router
    .route("/login")
    .post(loginUser)


router
    .route("/:id")
    .get(getUserById)
    .put(celebrate(updateValidator), updateUser)
    .delete(deleteUser)

module.exports = router