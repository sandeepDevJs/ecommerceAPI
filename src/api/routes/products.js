const {Router} = require("express")
const { 
    createProductValidator
} = require("../middlewares/validators")

const router = Router()
const { 
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,
    createProduct
} = require("../../services/products")

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