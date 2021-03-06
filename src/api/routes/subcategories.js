const {Router} = require("express")
const { celebrate } = require("celebrate")
const { auth, authAdmin } = require("../middlewares/auth")

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
    .get(auth, getSubcategories)
    .post(
        auth,
        authAdmin,
        celebrate(subcategoryValidator), 
        createSubcategory
    )

router
    .route("/:id")
    .get(auth, getSubCategoryById)
    .put(
        auth,
        authAdmin,
        celebrate(updateSubcategoryValidator), 
        updateSubCategory
    )
    .delete(auth, authAdmin, deleteSubCategory)

module.exports = router