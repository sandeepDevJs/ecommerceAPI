const mongoose = require("mongoose")
const config = require("../config")

module.exports = async function() {
    try{
<<<<<<< HEAD
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
=======
        await mongoose.connect(config.dbUrl, { 
                                                useNewUrlParser:true, 
                                                useUnifiedTopology:true, 
                                                useCreateIndex: true,
                                                useFindAndModify: false
                                            })
        console.log("<<<<<<<<<<<<= Connected To Db =>>>>>>>>>>>>>>".cyan.bold)
    }catch{
        console.log("AN ERROR OCCURRED WHILE CONNECTING TO DB!!!!!!!!!".red)
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
        process.exit(1)
    }
}
// adminecom8291