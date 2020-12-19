const {Router} = require("express")
const { celebrate } = require("celebrate")
const { categoryValidator } = require("../middlewares/validators")

const { getCategories, createCategory, deleteCategory } = require("../../services/categories")

const router = Router()


router
    .route("/")
    .get(getCategories)
    .post(celebrate(categoryValidator), createCategory)

router
    .route("/:id")
    .delete(deleteCategory)

module.exports = router