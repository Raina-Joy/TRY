const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const signupempModel = require('./empmodel')
const signupModel = require('./model');
const route = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const adminmodel = require('./adminmodel');
const pickupTable = require("./pickup-model")
//const assignedpickupTable = require('./assigned-pickup-model')
const emprouteModel = require('./route-model');
const emppickupModel = require("./epickupmodel");
const couponModel = require('./coupon-model');
const usercouponModel = require('./usercouponmodel ');
//const pincodeModel = require('./pinmodel');
const pinmodel = require('./pinmodel');
const empmodel = require('./empmodel');
const { ObjectId } = require('mongodb');
const routeModel = require('./route-model');
const stripe = require('stripe')('sk_test_51OF91dSJWknz1DNyHibISQFY1WP4yZPUCZxc5fhFrAboOHXWGJXEwLEOy8aDMpBTcJsgDfzoUuX5AH2ICc3C2L2L0047lIgmXB');
mongoose.connect('mongodb://localhost:27017/gedb').then(()=>{console.log('Connected to DB')}).catch(()=>{console.log('Error connecting to DB')})
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.use(cors());
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
  
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: 'rainajoy2016',
            pass: 'zoyd sgob sxms bgrl',
        },
        secure: true,
    });
    let info = await transporter.sendMail({
        from: 'rainajoy2016@gmail.com',
        to: to,
        subject: subject,
        text: text
      });
    
      console.log('Message sent: %s', info.messageId);
      res.json({ success: true, message: 'Email sent successfully' });
    });
    
    

app.post('/charge', async (req, res) => {
    try {
     
      const { amount, stripeToken } = req.body;
      console.log('Amt and token.....',amount,stripeToken);

  
      // Create a charge using the token
      const charge = await stripe.charges.create({
        amount: amount, // amount in cents
        currency: 'inr',
        description: 'Salary',
        source: stripeToken,
      });
  
      // Send a response indicating that the charge was successful
      res.json({ success: true });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
app.get('/allu',async(req,res)=>{
    const alluser = await signupModel.find();
    console.log(alluser);
    res.send(alluser);
})
app.get('/allpost',async(req,res)=>{
    const allpost = await pinmodel.find();
    res.send(allpost);
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
                return res.status(401).json({
                    'message': 'Password is incorrect',
                    status: 402
                });
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
            let userNotFound = false;
            let incorrectPassword = false;
        
            signupempModel.findOne({ name: req.body.name })
                .then(user => {
                    if (!user) {
                        userNotFound = true;
                        return;
                    }
                    userFound = user;
                    
                    return bcrypt.compare(req.body.password, user.password);
                })
                .then(result => {
                    if (userNotFound)
                        {
                            return res.status(401).json({
                                'message': 'User not found', 
                                 status:402
                            });
                        }
                    if (!result) {
                        return res.status(401).json({
                            message: 'Password is incorrect', status:402
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
            status:req.body.status,
            notifdate:req.body.notifdate
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

app.get('/allemproute',async(req,res)=>{
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



app.get('/sendstatus', async(req, res) => {
    const status = req.query.status;
    const pickupid = req.query.pickupid;
    console.log("received data", status, pickupid);
    try {
        const updatedPickup = await pickupTable.findByIdAndUpdate(pickupid, { status: status }, { new: true });

        let updateOperations = { "status": status };
        if (status === 'Finished') {
            updateOperations["pickupData.status"] = status;
            updateOperations["finisheddate"] = new Date();
        } else {
            updateOperations["pickupData.status"] = status;
            updateOperations["confirmdate"] = new Date();
        }

        const updatedempPickup = await emppickupModel.findOneAndUpdate(
            { "pickupData._id": pickupid }, // Filter criteria to find matching pickupData._id
            { $set: updateOperations }, // Update operation to set the status and dates
            { new: true }
        );

        if (!updatedPickup || !updatedempPickup) {
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

});

app.get('/allcoupon', async(req,res)=>{
    
    const resdata = await couponModel.find();
    console.log(resdata);
    
    return res.send(resdata)
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
            receivedCoupon:req.body.receivedCoupon,
            state:req.body.state
           
              
            
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
app.get('/sendcouponstatus', async(req,res)=>{
    const state = req.query.state;
    const userid = req.query.userid;
    console.log("received data", state, userid);
    try {
        const updatedusercoupon = await usercouponModel.findOneAndUpdate({userid:userid}, { state: state }, { new: true }).sort({ _id: -1 });
       
        if (!updatedusercoupon) {
            throw new Error("Failed to update state");
        }

        res.status(200).json({ success: true, message: "State updated successfully" });
    } catch (error) {
        console.error('Error updating state:', error);
        res.status(500).json({ success: false, message: "Failed to update state", error: error.message });
    }
});
// change section
// app.get()
app.get('/findempbyid', async(req,res)=>{
    const data = req.query.data;
    
    try
    {
        const findresult = await emppickupModel.find({ empId: data });
        
        const count = await emppickupModel.countDocuments({ $and: [{ empId: data }, { status: 'Finished' }] });
        //return res.send(findresult);
       // res.status(200).json({ success: true, message: "State updated successfully", Result: findresult });
       return res.json({ count:count, results: findresult });
    }
    catch(error)
    {
        console.error('Error finding emp result', error);
        res.status(500).json({ success: false, message: "Failed to find emp", error: error.message });

    }
})
app.get('/findsal', async (req, res) => {
    const empid = req.query.data;
    const from = new Date(req.query.from);
    const to = new Date(req.query.to);
  
    // Set the time component to the end of the day for both from and to dates
    from.setHours(23, 59, 59, 999); // Set time to 23:59:59:999
    to.setHours(23, 59, 59, 999);   // Set time to 23:59:59:999
  
    console.log('empid', empid, 'from and to', from, to);
  
    try {
      const findresult = await emppickupModel.find({
        empId: empid,
        finisheddate: { $gte: from, $lte: to }
      });
  
      const count = await emppickupModel.countDocuments({
        empId: empid,
        status: 'Finished',
        finisheddate: { $gte: from, $lte: to }
      });
  
      return res.json({ count: count, results: findresult });
    } catch (error) {
      console.error('Error finding emp result', error);
      return res.status(500).json({ success: false, message: "Failed to find emp", error: error.message });
    }
  });
  

app.delete('/removeemp', async (req, res) => {
    const data = req.query.data;
  
    try {
      // Check if the provided ID is valid
      if (!ObjectId.isValid(data)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      // Find the document by ID and delete it
      const deletedDocument = await empmodel.findByIdAndDelete(data);
  
      // Check if the document was found and deleted
      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      // Send a success response
      res.status(200).json({ message: 'Document deleted successfully', status:true});
    } catch (error) {
      // Handle any errors
      console.error('Error deleting document:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.delete('/removeroute', async (req, res) => {
    const data = req.query.data;
  
    try {
      // Check if the provided ID is valid
      if (!ObjectId.isValid(data)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      // Find the document by ID and delete it
      const deletedDocument = await routeModel.findByIdAndDelete(data);
  
      // Check if the document was found and deleted
      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      // Send a success response
      res.status(200).json({ message: 'Document deleted successfully', status:true});
    } catch (error) {
      // Handle any errors
      console.error('Error deleting document:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/updateroute', async (req, res) => {
    try {
        const  empid  = req.query.empid; // Extract empid from query parameters
        const { pin1, pin2, pin3 } = req.body.collectionpins;
        console.log(empid,pin1,pin2,pin3);
        const findresult = await routeModel.findOneAndUpdate(  { empid: empid }, // Filter condition
        { $set: { 'collectionpins.pin1': pin1, 'collectionpins.pin2': pin2, 'collectionpins.pin3': pin3 } }, // Update fields
        { new: true});
        console.log("updatedresult",findresult);
        

        res.status(200).json({ message: 'Collection updated successfully', data: updatedCollection });
    } catch (error) {
        console.error('Error updating collection:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.delete('/removecoupon', async (req, res) => {
    const data = req.query.data;
  
    try {
      // Check if the provided ID is valid
      if (!ObjectId.isValid(data)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      // Find the document by ID and delete it
      const deletedDocument = await couponModel.findByIdAndDelete(data);
  
      // Check if the document was found and deleted
      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      // Send a success response
      res.status(200).json({ message: 'Document deleted successfully', status:true});
    } catch (error) {
      // Handle any errors
      console.error('Error deleting document:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.put('/updatecoupon', async (req, res) => {
    const couponid = req.query.couponid;
    const coupondata = {
        category: req.body.category,
        brandname: req.body.brandname,
        title: req.body.title,
        desc: req.body.desc,
        code: req.body.code,
        doc: req.body.doc,
        doe: req.body.doe,
    };
console.log('id', couponid, 'data', coupondata);
    try {
        const findresult = await couponModel.findByIdAndUpdate({_id:couponid}, coupondata, { new: true });

        if (!findresult) {
            return res.status(404).send('Coupon not found');
        }

        console.log('Updated coupon:', findresult);
        res.status(200).json(findresult); // Optionally, you can send back the updated document
    } catch (error) {
        console.error('Error updating coupon:', error);
        res.status(500).send('Internal server error');
    }
});
app.get('/findpwd', async (req, res) => {
    const phno = req.query.data;
    console.log(phno);
    const findresult = await signupModel.findOne({phno:phno});
    res.status(200).json({findresult:findresult._id});
    
    

    });
    app.post('/update-password', (req, res) => {
        const userId = req.body.userId; // Get the user ID
        const newPassword = req.body.newPassword; // Get the new password
    
        // Hash the new password
        bcrypt.hash(newPassword, 10).then(hash => {
            // Update the hashed password in the database
            signupModel.findOneAndUpdate(
                { _id: userId }, // Find the user by ID
                { $set: { password: hash } }, // Update the password field
                { new: true } // Return the updated user object
            ).then(updatedUser => {
                res.status(200).json({
                    message: 'Password updated successfully',
                    status: true,
                    user: updatedUser
                });
            }).catch(err => {
                res.status(500).json({
                    message: 'Error updating password',
                    status: false,
                    error: err
                });
            });
        });
    });
    app.get('/findemppwd', async (req, res) => {
        const name = req.query.data;
        console.log(name);
        const findresult = await signupempModel.findOne({name:name});
        res.status(200).json({findresult:findresult._id});
        
        
    
        });
        app.post('/update-emppassword', (req, res) => {
            const userId = req.body.userId; // Get the user ID
            const newPassword = req.body.newPassword; // Get the new password
        
            // Hash the new password
            bcrypt.hash(newPassword, 10).then(hash => {
                // Update the hashed password in the database
                signupempModel.findOneAndUpdate(
                    { _id: userId }, // Find the user by ID
                    { $set: { password: hash } }, // Update the password field
                    { new: true } // Return the updated user object
                ).then(updatedUser => {
                    res.status(200).json({
                        message: 'Password updated successfully',
                        status: true,
                        user: updatedUser
                    });
                }).catch(err => {
                    res.status(500).json({
                        message: 'Error updating password',
                        status: false,
                        error: err
                    });
                });
            });
        });
    









        module.exports = app;

















































