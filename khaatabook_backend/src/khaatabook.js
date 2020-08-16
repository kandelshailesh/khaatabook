const express= require('express');
const app= express();
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const Khatabook= require('../model/Khatabook/khaata_model');

app.post('/khaatabook',(req,res)=>
{
    const khaatabook_list = Khatabook.find({createdBy:req.body.user_id});

    khaatabook_list.then((result)=>
    {
        console.log(result);
        res.json({'status':true,khaatabookList:result})
    })
})

module.exports=app;