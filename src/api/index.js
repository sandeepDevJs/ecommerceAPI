<<<<<<< HEAD
const {Router} = require("express")
const users = require("./routes/users")

module.exports = () =>{

    const routes = Router()
    routes.use("/users", users)
    return routes
=======
const {Router} = require("express") 
const users = require("./routes/users")
const products = require("./routes/products")

module.exports = () => {
    router = Router()

    router.use("/users", users);
    router.use("/products", products);
    return router
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
}