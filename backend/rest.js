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
const pickupModel = require('./pickup-model');
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
                password: hash
            })
  
    
    signup.save().then(result=>{
        res.status(201).json({
            message:'User Created',
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


// 

app.post('/login',(req,res)=>{
    let userFound;

    signupModel.findOne({name:req.body.name})
    .then(user=>{
        if(!user)
            {
                return res.status(401).json({
                    'message':'User not found',
                    status:402
                })
                
              
            }
            userFound = user;
            return bcrypt.compare(req.body.password, user.password)
    }).then(result=>{
        if(!result)
        {
            return res.status(401).json({
                message:'Password is incorrect',
                status:401
            })
            
        }
       

        const token = jwt.sign({name:userFound.name, userId:userFound._id},"secret_string",{expiresIn:"1h"})
        return res.status(200).json({
            token:token,
            expiresIn: 3600,
            status:200,
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
            expiresIn: 3600
        })
        
    })
    .catch(err=>{
        return res.status(401).json({
            message:'Error with authentification'
        })
        
    })
})


//Data section

app.post('/addpickup',(req,res)=>{
    const pickup = new pickupModel(
        {
            userid:req.body.userid,
            name: req.body.name,
            address:req.body.address,
            phno:req.body.phno,
            pincode:req.body.pincode,
            email:req.body.email,
            date:req.body.date,
            time:req.body.time,
            rwcat:req.body.rwcat
        })
        pickup.save().then(result=>{
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
app.get('/allpickupreq',async(req,res)=>{
    const allpickupreq = await pickupModel.find();
    res.send(allpickupreq)
})
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

app.get('/emppureq', async(req,res)=>{
    const data = req.query.data;
    // console.log(data);

    
    const resdata = await emppickupModel.find({empId:data});
    // console.log(resdata);
    
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


app.get('/findusercun', async(req,res)=>{
    const data = req.query.data;
   //  console.log(data);
       
    const resdata = await usercouponModel.find({userid:data});
    //console.log(resdata);
    
    return res.send(resdata)
})





        module.exports = app;

















































