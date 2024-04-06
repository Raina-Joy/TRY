const mongoose = require('mongoose')
//Admin model
const PickUpSchema = mongoose.Schema({
    userid:{type:String, requiered:true},
    name:{type:String, requiered:true},
    address:{type:String, requiered:true},
    phno:{type:Number, requiered:true},
    pincode:{type:Number, requiered:true},
    email:{type:String, requiered:true},
    date:{type:String, requiered:true},
    time:{type:String, requiered:true},
    rwcat:{type:String, requiered:true},
})
module.exports=mongoose.model('PickupModel',PickUpSchema)







