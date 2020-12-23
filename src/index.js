const express = require("express")
const loaders = require("./loaders")

const app = express()
const port = process.env.PORT || 4000
app.use(express.json())

loaders(express, app)

app.listen(port, () => console.log(`server Strated At Port ${port}`.cyan.inverse.underline.bold))

process.on("unhandledRejection", (error) => {
    console.log("ERROR: ", error)
    process.exit(1)
})

process.on('uncaughtException', (error)  => {
    console.log('Oh my god, something terrible happened: ',  error.red.bold);
    process.exit(1);
})
