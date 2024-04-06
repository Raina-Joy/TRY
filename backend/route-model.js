const mongoose = require('mongoose')
//Admin model
const EmpRouteSchema = mongoose.Schema({
    empid:{type:String, requiered:true},
    empname:{type:String, requiered:true},
    emppin:{type:Number, requiered:true},
    collectionpins:{
        pin1: Number,
        pin2:Number,
        pin3:Number
    }

    
})
module.exports=mongoose.model('EmpRouteModel',EmpRouteSchema)







