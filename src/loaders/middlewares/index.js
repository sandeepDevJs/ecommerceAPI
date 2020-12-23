const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors")

module.exports = (express, app) => {

    // app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    app.use(morgan("dev"));
    app.use(helmet())
    app.use(cors())

}