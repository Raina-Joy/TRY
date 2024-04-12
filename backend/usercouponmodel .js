const mongoose = require('mongoose')
//Admin model
const UserCouponSchema = mongoose.Schema({
    userid:{type:String},
    receivedCoupon:{type:Object}
})
module.exports=mongoose.model('userCouponmodel',UserCouponSchema)







