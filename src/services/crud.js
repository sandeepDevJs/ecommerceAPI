module.exports.get = async (Model, id=null) => {
 try{

    if(id === null){
        return await Model.find()
    }else{
        return await Model.find({_id:id})
    }

 }catch(err){
    return false
 }
}

module.exports.create = async (Model, data) =>{
    try{
        let insertedData = await new Model(data).save()
        return insertedData
    }catch{
        console.error("An error occurred while creating new data");
        process.exit(1)
    }
    
}