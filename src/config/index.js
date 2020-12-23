const dotenv = require("dotenv")

ifErr = dotenv.config()
if (ifErr.error) {
    throw new Error("WE COULDN'T FIND .ENV FILE")
}

module.exports = {
    port: parseInt(process.env.PORT),

    apiPrefix: "/api",

    dbUrl : process.env.MONGODB_URI,

    privateKey : process.env.JWT_SECRET,

    keyExp: process.env.JWT_EXP
}