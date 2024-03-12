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
            status:200
            
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
    console.log(allemp);
    res.send(allemp);
})

app.post('/signupemp', (req,res)=>{
    bcrypt.hash(req.body.password, 10).then(hash=>
    {
        const signupemp = new signupempModel(
            {
                name: req.body.name,
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



app.post('/loginemp',(req,res)=>{
    let userFound;

    signupempModel.findOne({name:req.body.name})
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


        module.exports = app;

















































