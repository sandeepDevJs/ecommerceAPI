const {Router} = require("express")
const users = require("./routes/users")
const products = require("./routes/products")
const categories = require("./routes/categories")
const subcategories = require("./routes/subcategories")
const auth = require("./routes/auth")

module.exports = () =>{

    const routes = Router()
    routes.use("/auth", auth)
    routes.use("/users", users)
    routes.use("/products", products)
    routes.use("/categories", categories)
    routes.use("/subcategories", subcategories)
    return routes
}