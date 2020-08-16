
  const mongoose = require('mongoose');
  var uniqueValidator = require('mongoose-unique-validator');
  const bcrypt= require('bcrypt');

  const user= mongoose.Schema({
      fullname:{type:String,required:true},
      username:{type:String,required:true},
      password:{type:String,required:true},
      company:{type:String,required:true},
      createdAt:{type:Date,required:true},
  })
  user.plugin(uniqueValidator);

  
  // user.statics.findByUserName = function(name){
  //   return this.find({username:name}).count();
  // }
  
  // user.statics.validate_password = function(username,password)
  // {
  //   const data = this.find({username:name});
  //   bcrypt.compare(password,data[0].password,(err,result)=>
  //   {

  //   })
  // }

  module.exports= mongoose.model('user',user);