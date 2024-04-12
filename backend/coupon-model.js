const mongoose = require('mongoose')
//Coupon model
const CouponSchema = mongoose.Schema({
    category:{type:String},
    brandname:{type:String},
    title:{type:String},
    desc:{type:String},
    code:{type:String},
    doc:{type:Date},
    doe:{type:Date}  
    
})
module.exports=mongoose.model('CouponModel',CouponSchema)







