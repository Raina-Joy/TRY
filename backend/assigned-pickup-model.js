const mongoose = require('mongoose')
const AssignedPickUpSchema = mongoose.Schema({

    empid:{type:String},
    empname:{type:String},
    pickupid: {type:String},
    assignmentdate:{type:Date},
    status:{type:String}
})
module.exports=mongoose.model('assignedpickupModel',AssignedPickUpSchema)







