const {Router} = require("express")
const { celebrate } = require("celebrate")

const { subcategoryValidator,
        updateSubcategoryValidator } = require("../middlewares/validators")

const { getSubcategories, 
        createSubcategory,
        deleteSubCategory,
        updateSubCategory,
        getSubCategoryById } = require("../../services/subcategories")

const router = Router()


router
    .route("/")
    .get(getSubcategories)
    .post(celebrate(subcategoryValidator), createSubcategory)

router
    .route("/:id")
    .get(getSubCategoryById)
    .put(celebrate(updateSubcategoryValidator), updateSubCategory)
    .delete(deleteSubCategory)

module.exports = router