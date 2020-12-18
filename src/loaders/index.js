const dbLoader = require("./db.connection")
const middlwares = require("./middlewares")
const routes = require("./routes")
const errorHandler = require("./middlewares/error")
const notFoudHandler = require("./middlewares/notFoud")

module.exports = (express, app) => {
    const colors = require("colors")
    dbLoader()
    middlwares(express, app)
    routes(app)
    app.use(notFoudHandler)
    app.use(errorHandler)
}