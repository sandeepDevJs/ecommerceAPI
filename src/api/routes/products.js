const {Router} = require("express")
const { celebrate } = require("celebrate")
const router = Router()

const { 
    createProductValidator, 
    updateValidator,
    updateProductValidator
} = require("../middlewares/validators")

const { 
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
    .put(celebrate(updateProductValidator), updateProduct)
    .delete(deleteProduct)

module.exports = router