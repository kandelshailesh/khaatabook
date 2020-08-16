const express= require('express');
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');
const jwt= require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');
// const verify_token= require('./verify_token');
const app= express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
     limit: '50mb' ,
    extended:true
}));
app.use(cors());

const con = mysql.createConnection({
    host:'restrodb-do-user-7065062-0.a.db.ondigitalocean.com',
    user:'restroadmin',
    password:'ptkjibezrkirn2qo',
    database:'kot_login',
    port:25060,
    ssl : {
        rejectUnauthorized: false
     }
})
con.connect((err)=>
{
    if(err) 
    {
        console.log(err);
    }
    else
    {
        var sql = "CREATE TABLE custo (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
        console.log('Connected')
    }
})

const port = 3010;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})
