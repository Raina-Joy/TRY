const mongoose = require('mongoose')
//Admin model
const PickUpSchema = mongoose.Schema({
    userid:{type:String},
    name:{type:String},
    address:{type:String},
    phno:{type:Number},
    pincode:{type:Number},
    email:{type:String},
    date:{type:String},
    time:{type:String},
    category:{type:String},
})
// PickUpSchema.index({ userid: 1 }, { unique: false })

module.exports=mongoose.model('PickupModel',PickUpSchema)








