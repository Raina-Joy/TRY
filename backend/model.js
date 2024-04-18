const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
function generateUserId() {
    // Generate a unique ID using any method you prefer
    // For example, you can use a timestamp combined with a random number
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
const signupSchema = mongoose.Schema({
    cuid: { type: String, default: generateUserId},
    name:{type:String, requiered:true},
    phno:{type:Number, requiered:true, unique:true},
    email:{type:String, requiered:true, unique:true},
    password:{type:String, requiered:true}

})
signupSchema.plugin(uniqueValidator);

module.exports=mongoose.model('signupModel',signupSchema)


