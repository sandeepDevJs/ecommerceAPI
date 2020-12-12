const {Router} = require("express")
const productsService = require("../../services/products")

router = Router()

//get all products
router.get("/", async (req, res) => {
    let data = await productsService.getProducts()
    res.status(data.httpCode)
       .send({
           status: data.status,
           message:data.message, 
           data: data.data
        })
})

module.exports = router