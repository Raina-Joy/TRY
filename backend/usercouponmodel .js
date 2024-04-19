const mongoose = require('mongoose')
//Admin model
const UserCouponSchema = mongoose.Schema({
    userid:{type:String},
    receivedCoupon:{type:Object},
    state:{type:String}
})
module.exports=mongoose.model('userCouponmodel',UserCouponSchema)







