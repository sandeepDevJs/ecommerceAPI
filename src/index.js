const express = require("express")
const loaders = require("./loaders")

const app = express()
const port = process.env.PORT || 4000

loaders(express, app)

app.listen(port, () => console.log("server Strated"))

process.on("unhandledRejection", (error) => {
    console.log("ERROR: ", error)
    process.exit(1)
})

process.on('uncaughtException', (error)  => {
    console.log('Oh my god, something terrible happened: ',  error.red);
    process.exit(1);
})
