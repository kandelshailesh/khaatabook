const express= require('express');
const app= express();
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const User= require('../model/User/user_model');
app.post('/login',(req,res)=>
{
    console.log(req.body);
var check_username=User.find({username:req.body.username});
check_username.then((result)=>
{
    if(result.length===1)
    {
    bcrypt.compare(req.body.password,result[0].password,(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        if(results)
        {
            console.log(result);
            jwt.sign(req.body, 'shailesh', { expiresIn: '1000h' },(err,token)=>{
                res.status(200).json({"success":true,token,result});
            });

        }
        else
        {
            console.log("rrrr");

            res.status(500).json({"success":false,"message":"Username or Password didnot match"});          
        }
    })
}
else
{
    res.status(500).json({"success":false,"message":"Username doesnot exist"});          

}
})
})


module.exports= app;