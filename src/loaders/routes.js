const { Router } = require("express")
const config = require("../config")
routes = require("../api")

//set main routes
//eg:- localhot/api/
module.exports = (app) => {
    app.use(config.apiPrefix, routes())
}