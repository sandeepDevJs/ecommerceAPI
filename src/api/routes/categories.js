const {Router} = require("express")
const { celebrate } = require("celebrate")
const { categoryValidator } = require("../middlewares/validators")

const { getCategories, 
        createCategory, 
        deleteCategory,
        getCategoryById,
        updateCategory } = require("../../services/categories")

const router = Router()


router
    .route("/")
    .get(getCategories)
    .post(celebrate(categoryValidator), createCategory)

router
    .route("/:id")
    .get(getCategoryById)
    .put(celebrate(categoryValidator), updateCategory)
    .delete(deleteCategory)

module.exports = router