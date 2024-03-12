const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//Employee signup model
const signupempSchema = mongoose.Schema({
    name:{type:String, requiered:true, unique:true},
    // address:{type:String, required:true},
    // phno:{type:Number, requiered:true},
    // email:{type:String, required:true},
    password:{type:String, requiered:true},
})
signupempSchema.plugin(uniqueValidator);

module.exports=mongoose.model('signupempModel',signupempSchema)







