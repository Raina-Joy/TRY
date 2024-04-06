const mongoose = require('mongoose')
//Admin model
const EmpPickUpSchema = mongoose.Schema({
    empId:{type:String},
    empName:{type:String},
    pickupData:{type:Object}
})
module.exports=mongoose.model('EmpPickupModel',EmpPickUpSchema)







