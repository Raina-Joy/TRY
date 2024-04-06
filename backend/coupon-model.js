const mongoose = require('mongoose')
//Coupon model
const CouponSchema = mongoose.Schema({
    rwcat:{type:String},
    logo:{type:Image},
    brandName:{type:String},
    title:{type:String},
    desc:{type:String},
    code:{type:String},
    doc:{type:Date},
    doe:{type:Date}  
    
})
module.exports=mongoose.model('CouponModel',CouponSchema)







