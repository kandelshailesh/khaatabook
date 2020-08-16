const express= require('express');
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');
const bcrypt= require('bcrypt');
const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const cors = require('cors');
// const verify_token= require('./verify_token');
const app= express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
     limit: '50mb' ,
    extended:true
}));
app.use(cors());
mongoose.connect("mongodb://localhost:27017/khaata?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",{useNewUrlParser:true,useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("Database connected");
});

app.use('/',require('./src/login'));
app.use('/',require('./src/register'));
app.use('/',require('./src/transaction'));
app.use('/',require('./src/customer'));
app.use('/',require('./src/khaatabook'));







const port = 3010;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})
