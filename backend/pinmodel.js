const mongoose = require('mongoose')
//Coupon model
const pincodeSchema = mongoose.Schema({
    postoffice:{type:String},
    pincode:{type: Number}
    
})
module.exports=mongoose.model('pincodesModel',pincodeSchema)







