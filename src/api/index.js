const {Router} = require("express")
const users = require("./routes/users")
const products = require("./routes/products")
const categories = require("./routes/categories")
const subcategories = require("./routes/subcategories")

module.exports = () =>{

    const routes = Router()
    routes.use("/users", users)
    routes.use("/products", products)
    routes.use("/categories", categories)
    routes.use("/subcategories", subcategories)
    return routes
}