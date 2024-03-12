const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//Admin model
const AdminSchema = mongoose.Schema({
    name:{type:String, requiered:true, unique:true},
    
    password:{type:String, requiered:true},
})
AdminSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Adminmodel',AdminSchema)







