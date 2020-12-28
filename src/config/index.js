
/**
 * 
 * This file holds all config from enviroment
 * 
 */


const dotenv = require("dotenv")

ifErr = dotenv.config()
if (ifErr.error) {
    throw new Error("WE COULDN'T FIND .ENV FILE")
}

module.exports = {
    port: parseInt(process.env.PORT),

    apiPrefix: process.env.apiPrefix,

    homeURL: process.env.url,

    dbUrl : process.env.MONGODB_URI,

    privateKey : process.env.JWT_SECRET,

    keyExp: process.env.JWT_EXP,

    smtp_host: process.env.SMTP_HOST,

    smtp_port: process.env.SMTP_PORT,

    smtp_email: process.env.SMTP_EMAIL,

    smtp_password: process.env.SMTP_PASS,

    from_email: process.env.FROM_EMAIL,

    from_name: process.env.FROM_NAME
}