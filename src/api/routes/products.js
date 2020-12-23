const {Router} = require("express")
const { celebrate } = require("celebrate")
const { authAdmin } = require("../middlewares/auth")
const router = Router()

const { 
    createProductValidator
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
    .post(
        authAdmin,
        celebrate(createProductValidator), 
        createProduct
    )

router
    .route("/:id")
    .get(authAdmin, getProductById)
    .put(authAdmin, updateProduct)
    .delete(authAdmin, deleteProduct)

module.exports = router