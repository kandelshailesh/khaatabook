
  const mongoose = require('mongoose');
  var uniqueValidator = require('mongoose-unique-validator');


  const labour= mongoose.Schema({
      labourname:{type:String,required:true},
      companyname:{type:String,required:true},
      phoneno:{type:Number},
      createdAt:{type:Date,default:Date.now,required:true},
  })
  labour.plugin(uniqueValidator);
 
  module.exports= mongoose.model('labour',labour);