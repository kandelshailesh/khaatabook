
  const mongoose = require('mongoose');
  var uniqueValidator = require('mongoose-unique-validator');
 
  const transaction= mongoose.Schema({
      customer_id:{type:mongoose.Schema.Types.ObjectId,required:true},
    //   customer_name:{type:String,required:true},
      user_id:{type:mongoose.Schema.Types.ObjectId,required:true},
      credit:{type:Boolean,default:false},
      debit:{type:Boolean,default:false},
      creditamount:{type:Number,default:0},
      debitamount:{type:Number,default:0},
      khaatabookid:{type:mongoose.Schema.Types.ObjectId,required:true},
      description:{type:String,default:''},
      createdAt:{type:Date,default:Date.now},
  })
  transaction.plugin(uniqueValidator);

  module.exports= mongoose.model('transaction',transaction);