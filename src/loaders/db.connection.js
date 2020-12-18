const mongoose = require("mongoose")
const config = require("../config")

module.exports = async function() {
    try{
        await mongoose.connect(
            config.dbUrl, 
            { 
                useNewUrlParser:true, 
                useUnifiedTopology:true, 
                useCreateIndex: true,
                useFindAndModify: false
            })
        console.log("<<<<<<<<<<<<= Connected To Db =>>>>>>>>>>>>>>".cyan.bold)
    }catch(err){
        console.log("AN ERROR OCCURRED WHILE CONNECTING TO DB!!!!!!!!!".red)
        console.log(err.red)
        process.exit(1)
    }
}
// adminecom8291