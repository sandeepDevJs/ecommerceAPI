const {Router} = require("express")
const { 
    signUpValidator, 
    updateValidator,
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
    .post([createProductValidator, createProduct])

router
    .route("/:id")
    .get(getProductById)
    .put([updateValidator, updateProduct])
    .delete(deleteProduct)

module.exports = router