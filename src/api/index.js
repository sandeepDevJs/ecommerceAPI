const {Router} = require("express") 
const users = require("./routes/users")
const products = require("./routes/products")

module.exports = () => {
    router = Router()

    router.use("/users", users);
    router.use("/products", products);
    return router
}