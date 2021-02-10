/**
 *
 * Third party Middlewares
 *
 */

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");

module.exports = (express, app) => {
	app.use(express.json());
	app.use(morgan("dev"));

	//header protection
	app.use(helmet());

	//CORS
	app.use(cors());

	//sanitization
	app.use(mongoSanitize());

	//xss protection
	app.use(xss());

	//Rate Limiting
	let limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 30000 });
	app.use(limiter);

	//prevent http param pollution
	app.use(hpp());

	app.use("/api/images", express.static("src/uploads/"));
};
