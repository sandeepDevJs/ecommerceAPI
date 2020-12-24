const {Router} = require("express")
const { celebrate } = require("celebrate")
const { auth, authAdmin } = require("../middlewares/auth")
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
        auth,
        authAdmin,
        celebrate(createProductValidator), 
        createProduct
    )

router
    .route("/:id")
    .get(auth, authAdmin, getProductById)
    .put(auth, authAdmin, updateProduct)
    .delete(auth, authAdmin, deleteProduct)

module.exports = router