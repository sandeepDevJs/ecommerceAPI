const dbLoader = require("./db.connection");
const middlwares = require("./middlewares");
const routes = require("./routes");
const errorHandler = require("./middlewares/error");
const notFoudHandler = require("./middlewares/notFoud");

module.exports = (express, app) => {
	const colors = require("colors");
	//load DB
	dbLoader();

	//third Party & custom middlewares
	middlwares(express, app);

	//all routes
	routes(app);

	//404 Handler
	app.use(notFoudHandler);

	//Error Handler
	app.use(errorHandler);
};
