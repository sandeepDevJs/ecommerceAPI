const {Router} = require("express")
const users = require("./routes/users")

module.exports = () =>{

    const routes = Router()
    routes.use("/users", users)
    return routes
}