const bcrypt = require("bcrypt")


module.exports.encrypt = async (plainPassword) =>{

    let salt = await bcrypt.genSalt(10)
    try {
        return await bcrypt.hash(plainPassword, salt)
    } catch (error) {
        throw new Error(error)
    }

}