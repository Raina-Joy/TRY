const mongoose = require('mongoose')
const PickUpTableSchema = mongoose.Schema({
    cuid:{type:String},
    name:{type:String},
    address:{type:String},
    phno:{type:Number},
    pincode:{type:Number},
    email:{type:String},
    date:{type:String},
    time:{type:String},
    category:{type:String},
    status:{type: String}
})


module.exports=mongoose.model('PickupTableModel',PickUpTableSchema)

//status:{type: String, ref: 'EmpPickupModel'}
