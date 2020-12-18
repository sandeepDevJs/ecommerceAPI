const morgan = require("morgan");
const helmet = require("helmet");

module.exports = (express, app) => {

    app.use(morgan("dev"));
    app.use(helmet())
    app.use(express.json())
}