const expressLoaders = require("./express")
const dbLoader = require("./db.connection")

module.exports.initialize = async({express, app}) => {
    await expressLoaders.loadModules({express, app})
    await dbLoader()
}