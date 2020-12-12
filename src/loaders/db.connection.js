const mongoose = require("mongoose")
const config = require("../config")

module.exports = async function() {
    try{
        await mongoose.connect(config.dbUrl, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true })
        console.log("===Connected To Db===")
    }catch{
        console.log("AN ERROR OCCURRED WHILE CONNECTING TO DB!!!!!!!!!")
    }
}
// adminecom8291