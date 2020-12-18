module.exports.get = async (Model, id=null, field=null) => {
 try{

    if(id === null){
        return await Model.find()

    }else if(field === null){

        let data =  await Model.find({_id:id})
        return data

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
        return false
    }
    
}


module.exports.update = async (Model, filter, data) => {
    try {
     
        let updatedData = await Model.findOneAndUpdate(filter, data, { new : true })
        return updatedData
    } catch (error) {
        console.error("An error occurred while Updating data");
        return false
    }
}