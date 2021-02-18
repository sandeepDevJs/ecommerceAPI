const express = require("express");
const loaders = require("./loaders");
const config = require("./config");

const app = express();
const port = process.env.PORT || 4000;

//Load all DB, middlerwares & routes
loaders(express, app);

app.listen(port, () =>
	console.log(`server Strated At Port ${port}`.cyan.inverse.underline.bold)
);

//UNHANDLED ERROR HANDLINGs
process.on("unhandledRejection", (error) => {
	if (config.env !== "development") {
		console.log("ERROR!!");
	} else {
		console.log("ERROR: ", error);
	}
});

process.on("uncaughtException", (error) => {
	if (config.env === "development") {
		console.log("Oh my god, something terrible happened: ", error);
	} else {
		console.log("Oh my god, something terrible happened: ");
	}
});
