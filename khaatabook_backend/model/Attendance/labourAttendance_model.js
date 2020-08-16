
  const mongoose = require('mongoose');
  var uniqueValidator = require('mongoose-unique-validator');


  const attendance= mongoose.Schema({
      status:{type:String,enum:['absent','present']},
      createdAt:{type:Date,default:Date.now,required:true},
  })
  attendance.plugin(uniqueValidator);
 
  module.exports= mongoose.model('attendance',attendance);