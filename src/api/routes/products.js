const {Router} = require("express")
const { celebrate } = require("celebrate")
const router = Router()

const { 
    createProductValidator
} = require("../middlewares/validators")

const { 
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,
    createProduct
} = require("../../services/products")

//Routes
router
    .route("/")
    .get(getProducts)
    .post(celebrate(createProductValidator), createProduct)

router
    .route("/:id")
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = router