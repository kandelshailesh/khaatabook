const express= require('express');
const app= express();
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const Customer= require('../model/Customer/customer_model');

app.get('/customer',(req,res)=>
{
    const customer_list = Customer.find({});

    customer_list.then((result)=>
    {
        console.log(result);
        res.json({'status':true,customerList:result})
    })
})

module.exports=app;