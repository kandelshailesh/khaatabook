const express= require('express');
const app= express();
const bcrypt = require('bcrypt');
const User= require('../model/User/user_model');
const Customer= require('../model/Customer/customer_model');
const Labour= require('../model/Labour/labour_model');
const Khaata= require('../model/Khatabook/khaata_model');


// const moment = require('moment');

// moment().isLocal('np');
app.post('/register_user',(req,res)=>
{
const t = new Date();
const z= t.getTimezoneOffset()*60000;
var tlocal = t-z;
tlocal= new Date(tlocal);
const iso=tlocal.toISOString();
console.log(iso);

req.body.createdAt= iso;

var check_user=User.find({username:req.body.username});

console.log('Req',req.body.createdAt);

check_user.then((result)=>
{
    console.log(result);
    if(result.length===0)
    {
        var hash_password= new Promise((resolve,reject)=>
        {
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err) reject(err);
                req.body.password=hash;
                resolve("Okay");
            })
        })
        hash_password.then((result)=>
        {
            var create_user = new User(req.body);
            create_user.save(function (err, result2) {
                  if (err)
                  { 
                    res.status(500).json({"success":false,"message":"Error Occured"});
                  }
                else
                {
                res.status(200).json({"success":true,"message":"User created successfully"});
                }
                  });  
        })
        
    }
    else
    {
        res.status(500).json({"success":false,"message":"User already exist"})
    }
})


})

app.post('/register_customer',(req,res)=>
{
  console.log(req.body);
var check_customer=Customer.find({customername:req.body.customername,khaataid:req.body.khaataid});
check_customer.then((result)=>
{
    console.log(result);
    if(result.length===0)
    {
       
            var create_customer = new Customer(req.body);
            create_customer.save(function (err, result2) {
                  if (err)
                  { 
                    console.log(err);
                    res.status(500).json({"success":false,"message":"Error Occured"});
                  }
                else
                {
                res.status(200).json({"success":true,"message":"Customer created successfully"});
                }
                  });   
    }
    else
    {
        res.status(500).json({"success":false,"message":"Customer already exist"})
    }
})


})


app.post('/register_labour',(req,res)=>
{
var check_labour=Labour.find({labourname:req.body.labourname,companyname:req.body.companyname});
check_labour.then((result)=>
{
    console.log(result);
    if(result.length===0)
    {
       
            var create_labour = new Labour(req.body);
            create_labour.save(function (err, result2) {
                  if (err)
                  { 
                      
                    res.status(500).json({"success":false,"message":"Error Occured"});
                  }
                else
                {
                res.status(200).json({"success":true,"message":"Labour created successfully"});
                }
                  });   
    }
    else
    {
        res.status(500).json({"success":false,"message":"Labour already exist"})
    }
})


})

app.post('/register_khaata',(req,res)=>
{
  console.log(req.body);
var check_khaata=Khaata.find({khaatabookname:req.body.khaataname,createdBy:req.body.user_id});
check_khaata.then((result)=>
{
    console.log(result);
    if(result.length===0)
    {
       
            var create_khaata = new Khaata({khaatabookname:req.body.khaataname,createdBy:req.body.user_id});
            create_khaata.save(function (err, result2) {
                  if (err)
                  { 
                   console.log(err);   
                    res.status(500).json({"success":false,"message":"Error Occured"});
                  }
                else
                {
                  check_khaata.then((result3)=>
                  {
                    console.log(result3);
                    res.status(200).json({"success":true,result3,"message":"Khaata created successfully"});
                  })
     
                }
                  });   
    }
    else
    {
        res.status(500).json({"success":false,"message":"Khaataname already exist"})
    }
})


})

module.exports = app;