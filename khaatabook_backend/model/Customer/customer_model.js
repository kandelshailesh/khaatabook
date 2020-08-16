
  const mongoose = require('mongoose');
  var uniqueValidator = require('mongoose-unique-validator');
  const bcrypt= require('bcrypt');

  const customer= mongoose.Schema({
      customername:{type:String,required:true},
      khaataid:{type:mongoose.Schema.Types.ObjectId,required:true},
      mobileno:{type:Number,default:''},
      createdAt:{type:Date,default:Date.now,required:true},
  })
  customer.plugin(uniqueValidator);

  module.exports= mongoose.model('customer',customer);