/**
 *
 * Third party Middlewares
 *
 */

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

module.exports = (express, app) => {
	app.use(express.json());
	app.use(morgan("dev"));
	app.use(helmet());
	app.use(cors());
	app.use("/api/images", express.static("src/uploads/"));
};
