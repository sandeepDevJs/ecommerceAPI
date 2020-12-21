const {Router} = require("express")
const { celebrate } = require("celebrate")
const router = Router()

const { 
    createProductValidator, 
    updateProductValidator
} = require("../middlewares/validators")

const { 
    getProducts,
    updateProduct,
    deleteProduct,
    createProduct,
    getProductById
} = require("../../services/products")

//Routes
router
    .route("/")
    .get(getProducts)
    .post(celebrate(createProductValidator), createProduct)

router
    .route("/:id")
    .get(getProductById)
    .put(celebrate(updateProductValidator), updateProduct)
    .delete(deleteProduct)

module.exports = router