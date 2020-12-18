<<<<<<< HEAD
const dbLoader = require("./db.connection")
const middlwares = require("./middlewares")
const routes = require("./routes")
const errorHandler = require("./middlewares/error")
module.exports = (express, app) => {
    const colors = require("colors")
    dbLoader()
    middlwares(express, app)
    routes(app)
    app.use(errorHandler)
=======
const expressLoaders = require("./express")
const dbLoader = require("./db.connection")

module.exports.initialize = async({express, app}) => {
    await expressLoaders.loadModules({express, app})
    await dbLoader()
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
}