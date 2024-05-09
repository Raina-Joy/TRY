

const mongoose = require('mongoose')
//Admin model
const EmpPickUpSchema = mongoose.Schema({
    empId:{type:String},
    empName:{type:String},
    pickupData:{type: Object},
    assigndate:{type:String},
    status:{type:String}, 
    finisheddate:{type:Date},
    confirmdate:{type:Date}

})
module.exports=mongoose.model('EmpPickupModel',EmpPickUpSchema)



//pickupData:{type: Object, ref: 'PickupTableModel'},



