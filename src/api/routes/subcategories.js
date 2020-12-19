const {Router} = require("express")
const { celebrate } = require("celebrate")

const { subcategoryValidator } = require("../middlewares/validators")

const { getSubcategories, createSubcategory } = require("../../services/subcategories")

const router = Router()


router
    .route("/")
    .get(getSubcategories)
    .post(celebrate(subcategoryValidator), createSubcategory)


module.exports = router