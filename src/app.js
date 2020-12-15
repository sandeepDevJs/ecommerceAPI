const loaders = require("./loaders")
const config = require("./config")
const express = require("express");

async function startServer() {
    
    const app = express();
    await loaders.initialize({express: express, app : app})

    app.listen(config.port, () => console.log("<<<<<<<<<<<<<<<<= Server Started At Port 4000 =>>>>>>>>>>>>>>>>>".green.bold))

}

process.on("unhandledRejection", (error) => {
    console.log("ERROR: "+error)
    process.exit(1)
})

startServer();