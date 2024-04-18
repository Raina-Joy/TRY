const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const signupempModel = require('./empmodel')
const signupModel = require('./model');
const route = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const adminmodel = require('./adminmodel');
const pickupTable = require("./pickup-model")
const assignedpickupTable = require('./assigned-pickup-model')
const emprouteModel = require('./route-model');
const emppickupModel = require("./epickupmodel");
const couponModel = require('./coupon-model');
const usercouponModel = require('./usercouponmodel ');
mongoose.connect('mongodb://localhost:27017/gedb').then(()=>{console.log('Connected to DB')}).catch(()=>{console.log('Error connecting to DB')})

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.get('/allu',async(req,res)=>{
    const alluser = await signupModel.find();
    console.log(alluser);
    res.send(alluser);
})

app.post('/sign-up', (req,res)=>{
    bcrypt.hash(req.body.password, 10).then(hash=>
    {
        const signup = new signupModel(
            {
                
                name: req.body.name,
                phno:req.body.phno,
                email:req.body.email,
                password: hash
            })
  
    
    signup.save().then(result=>{
        res.status(201).json({
            message:'User Created',
            status:true,
            result: result
        })
    }).catch(err=>{
        res.status(500).json({
            message:'Error occured',
            status:false,
            error:err

        })  
      })
    })
})


// 

app.post('/login', (req, res) => {
    let userFound;
    let userNotFound = false;
    let incorrectPassword = false;

    signupModel.findOne({ phno: req.body.phno })
        .then(user => {
            if (!user) {
                userNotFound = true;
                return;
            }
            userFound = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if (userNotFound) {
                return res.status(401).json({
                    'message': 'User not found',
                    status: 402
                });
            }

            if (!result) {
                incorrectPassword = true;
                return;
            }

            const token = jwt.sign({ name: userFound.name, userId: userFound._id}, "secret_string", { expiresIn: "1h" });
            return res.status(200).json({
                token: token,
                expiresIn: 3600,
                status: 200,
                currentuser: userFound.name,
                currentuserid: userFound._id,
                cuid:userFound.cuid
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Error with authentication'
            });
        });
});


////Employee data
app.get('/allemp',async(req,res)=>{
    const allemp = await signupempModel.find();
    res.send(allemp)
})

app.post('/signupemp', (req,res)=>{
    bcrypt.hash(req.body.password, 10).then(hash=>
    {
        const signupemp = new signupempModel(
            {
                name: req.body.name,
                address:req.body.address,
                pincode:req.body.pincode,
                phno:req.body.phno,
                email:req.body.email,
                password: hash
            })
  
    
            signupemp.save().then(result=>{
                res.status(201).json({
                    status:true,
                    message:'User Created'
                    // result: result
                })
            }).catch(err=>{
                res.status(500).json({
                    status:false,
                    message:'Error occured',
                    error:err
        
                })  
              })
            })
        })



        app.post('/loginemp', (req, res) => {
            let userFound;
        
            signupempModel.findOne({ name: req.body.name })
                .then(user => {
                    if (!user) {
                        return res.status(401).json({
                            'message': 'User not found'
                        });
                    }
                    userFound = user;
                    
                    return bcrypt.compare(req.body.password, user.password);
                })
                .then(result => {
                    if (!result) {
                        return res.status(401).json({
                            message: 'Password is incorrect'
                        });
                    }
        
                    const token = jwt.sign({ name: userFound.name, userId: userFound._id }, "secret_string", { expiresIn: "1h" });
                    return res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        currentuser:userFound.name,
                        currentuserid:userFound._id
                    });
                })
                .catch(err => {
                    return res.status(401).json({
                        message: 'Error with authentication'
                    });
                });
        });
        
        


//admin

app.post('/admin', (req,res)=>{
    bcrypt.hash(req.body.password, 10).then(hash=>
    {
        const admin = new adminmodel(
            {
                name: req.body.name,
                password: hash
            })
  
    
    admin.save().then(result=>{
        res.status(201).json({
            message:'Admin Created',
            result: result
        })
    }).catch(err=>{
        res.status(500).json({
            message:'Error occured',
            error:err

        })  
      })
    })
})

app.post('/loginadmin',(req,res)=>{
    let userFound;

    adminmodel.findOne({name:req.body.name})
    .then(user=>{
        if(!user)
            {
                return res.status(401).json({
                    'message':'User not found'
                })
                
              
            }
            userFound = user;
            return bcrypt.compare(req.body.password, user.password)
    }).then(result=>{
        if(!result)
        {
            return res.status(401).json({
                message:'Password is incorrect'
            })
            
        }

        const token = jwt.sign({name:userFound.name, userId:userFound._id},"secret_string",{expiresIn:"1h"})
        return res.status(200).json({
            token:token,
            expiresIn: 3600, 
            currentuser:userFound.name,
            currentuserid:userFound._id
        })
        
    })
    .catch(err=>{
        return res.status(401).json({
            message:'Error with authentification'
        })
        
    })
})


//Data section

app.get('/findpickupbyid', async (req, res) => {
    try {
        const cuid = req.query.data; // Access cuid from query parameters
        console.log('fetched cuid ', cuid);
        const pickups = await pickupTable.find({ cuid });
        res.status(200).json(pickups);
    } catch (error) {
        console.error('Error fetching pickups by cuid:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch pickups by cuid', error: error.message });
    }
});



  

app.post('/addpickup',(req,res)=>{
    const pickuptable = new pickupTable(
        {
            cuid:req.body.cuid,
            name: req.body.name,
            address:req.body.address,
            phno:req.body.phno,
            pincode:req.body.pincode,
            email:req.body.email,
            date:req.body.date,
            time:req.body.time,
            category:req.body.category,
            status:req.body.status
        })
        pickuptable.save().then(result=>{
            return res.status(201).json({
                message:'Data entered',
                status: 201
            })
        })
        .catch(err=>{
            
                return res.status(401).json({
                    message:'Data add failed',
                    error:err,
                    status:401
            
        })
        
})
})
app.get('/allpickupreq',async(req,res)=>{
    const allpickupreq = await pickupTable.find();
    res.send(allpickupreq)
})

// app.post('/assignpickup',(req,res)=>{
//     const pickuptable = new pickupTable(
//         {
//             empid:req.body.empid,
//             empname: req.body.empname,
//             pickupid:req.body.pickupid,
//             assigndate:req.body.assigndate,
//             status:req.body.status
//         })
//         pickuptable.save().then(result=>{
//             return res.status(201).json({
//                 message:'Data entered',
//                 status: 201
//             })
//         })
//         .catch(err=>{
            
//                 return res.status(401).json({
//                     message:'Data add failed',
//                     error:err,
//                     status:401
            
//         })
        
// })
// })
app.post('/addroute',(req,res)=>{
    const emproutemodel = new emprouteModel({
        empid:req.body.empid,
        empname:req.body.empname,
        emppin:req.body.emppin,
        collectionpins:{
            pin1: req.body.collectionpins.pin1,
            pin2:req.body.collectionpins.pin2,
            pin3:req.body.collectionpins.pin3
        }   
    })
    emproutemodel.save().then(result=>{
        return res.status(201).json({
            message:'Data entered',
            status: 201
        })
    })
    .catch(err=>{
        
            return res.status(401).json({
                message:'Data add failed',
                status:401
        
    })
    
})
    
})

app.get('/allroute',async(req,res)=>{
    const allroute = await emprouteModel.find();
    res.send(allroute)
})

app.get('/match',(req,res)=>{

    const targetPin = parseInt(req.query.data); // The pin code you want to match

// Your MongoDB query
emprouteModel.aggregate([
    {
      $match: {
        $or: [
          { "collectionpins.pin1": targetPin },
          { "collectionpins.pin2": targetPin },
          { "collectionpins.pin3": targetPin }
        ]
      }
    },
    {
      $project: {
        collectionpins: 1,
        empid: 1,
        empname: 1,
        emppin: 1
      }
    }
  ])
  .exec() // No callback function
  .then(results => {
    // Now you can process the results
    results.forEach(result => {

      // Access the collectionpins and other properties of each document
      return res.send(result)
        
    });
  })
  .catch(err => {
    console.error(err); // Handle error
  });
})

app.post('/emppudata',(req,res)=>{
    const emppickupdata = new emppickupModel(
        {
            empId:req.body.empId,
            empName: req.body.empName,
            pickupData:req.body.pickupData,
            assigndate:req.body.assigndate,
            status:req.body.status


            
        })
        emppickupdata.save().then(result=>{
            return res.status(201).json({
                message:'Data entered',
                status: 201
            })
        })
        .catch(err=>{
            
                return res.status(401).json({
                    message:'Data add failed',
                    status:401
            
        })
        
})
})

// async function updatePickupStatus(pickupId, newStatus) {
//     try {
//         const updatedPickup = await PickupModel.findByIdAndUpdate(pickupId, { status: newStatus }, { new: true });
//         // Now, find and update corresponding entry in EmpPickupModel
//         const empPickup = await EmpPickupModel.findOneAndUpdate({ pickupData: updatedPickup._id }, { status: newStatus }, { new: true });
//         return { updatedPickup, empPickup };
//     } catch (error) {
//         console.error('Error updating status:', error);
//         throw error;
//     }
// }
app.get('/sendstatus', async(req, res)=>{
    const status = req.query.status;
    const pickupid = req.query.pickupid;
    console.log("received data", status, pickupid);
    try {
        const updatedPickup = await pickupTable.findByIdAndUpdate(pickupid, { status: status }, { new: true });
        const updatedempPickup = await emppickupModel.findOneAndUpdate(
            { "pickupData._id": pickupid }, // Filter criteria to find matching pickupData._id
            { $set: { "status": status } }, // Update operation to set the status
            { new: true }
        );

        if (!updatedempPickup || !updatedPickup ) {
            throw new Error("Failed to update status");
        }

        res.status(200).json({ success: true, message: "Status updated successfully" });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ success: false, message: "Failed to update status", error: error.message });
    }
});


app.get('/emppureq', async(req,res)=>{
    const data = req.query.data;
    console.log(data);

    
    const resdata = await emppickupModel.find({empId:data});
     console.log(resdata);
    
    return res.send(resdata)
})

app.post('/addcoupon', (req,res)=>{
    const coupondata = new couponModel(
        {
            category:req.body.category,
            brandname: req.body.brandname,
            title:req.body.title,
            desc:req.body.desc,
            code:req.body.code,
            doc:req.body.doc,
            doe:req.body.doe,
           
              
            
        })
        coupondata.save().then(result=>{
            return res.status(201).json({
                message:'Data entered',
                status: 201
            })
        })
        .catch(err=>{
            
                return res.status(401).json({
                    message:'Data add failed',
                    status:401
            
        })
        
})

})

app.get('/couponfind', async(req,res)=>{
    const data = req.query.data;
    console.log(data);
    const resdata = await couponModel.find({category:data});
    console.log(resdata);
    
    return res.send(resdata)
})



app.post('/uscudata', (req,res)=>{
    const usercoupondata = new usercouponModel(
        {
            userid:req.body.userid,
            receivedCoupon:req.body.receivedCoupon
           
              
            
        })
        usercoupondata.save().then(result=>{
            return res.status(201).json({
                message:'Data entered',
                status: 201
            })
        })
        .catch(err=>{
            
                return res.status(401).json({
                    message:'Data add failed',
                    status:401
            
        })
        
})

})


// app.get('/findusercun', async(req,res)=>{
//     const data = req.query.data;
//    //  console.log(data);
       
//     const resdata = await usercouponModel.find({userid:data});
//     //console.log(resdata);
    
//     return res.send(resdata)
// })
app.get('/findusercun', async(req,res)=>{
    const data = req.query.data;
    try {
        const latestEntry = await usercouponModel.findOne({ userid: data }).sort({ _id: -1 });
        return res.send(latestEntry);
    } catch (error) {
        console.error("Error finding latest entry:", error);
        return res.status(500).send("Internal Server Error");
    }
});





        module.exports = app;

















































