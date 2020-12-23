const {Router} = require("express")
const { celebrate } = require("celebrate")
const { categoryValidator } = require("../middlewares/validators")
const { auth, authAdmin } = require("../middlewares/auth")

const { getCategories, 
        createCategory, 
        deleteCategory,
        getCategoryById,
        updateCategory } = require("../../services/categories")

const router = Router()


router
    .route("/")
    .get(auth, getCategories)
    .post(
        authAdmin,
        celebrate(categoryValidator), 
        createCategory
    )

router
    .route("/:id")
    .get(auth, getCategoryById)
    .put(
        authAdmin, 
        celebrate(categoryValidator), 
        updateCategory
    )
    .delete(authAdmin, deleteCategory)

module.exports = router