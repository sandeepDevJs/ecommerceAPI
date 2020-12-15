module.exports.get = async (Model, id=null, field=null) => {
 try{

    if(id === null){
        return await Model.find()

    }else if(field === null){
        return await Model.find({_id:id})

    }else{
        return await Model.findOne(field)
    }

 }catch(err){
    console.log(err)
    return null
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