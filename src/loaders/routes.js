const { Router } = require("express")
const config = require("../config")
routes = require("../api")
module.exports = (app) => {
    app.use(config.apiPrefix, routes())
}