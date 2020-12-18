const {Router} = require("express")
const users = require("./routes/users")
const products = require("./routes/products")

module.exports = () =>{

    const routes = Router()
    routes.use("/users", users)
    routes.use("/products", products)
    return routes
}