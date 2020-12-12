const morgan = require("morgan");
const helmet = require("helmet");
const config = require("../config");
const router = require("../api")

module.exports.loadModules = async({express, app}) => {

    app.use(morgan("dev"));
    app.use(helmet())
    app.use(express.json())
    app.use(config.apiPrefix, router())

}