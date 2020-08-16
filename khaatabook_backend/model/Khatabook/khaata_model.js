
  const mongoose = require('mongoose');
  var uniqueValidator = require('mongoose-unique-validator');

  const khaatabook= mongoose.Schema({
      khaatabookname:{type:String,required:true},
      createdBy:{type:mongoose.Schema.Types.ObjectId,required:true},
      createdAt:{type:Date,default:Date.now},
  })

  khaatabook.plugin(uniqueValidator);

  module.exports= mongoose.model('khaatabook',khaatabook);