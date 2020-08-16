const express= require('express');
const app= express();
const bcrypt = require('bcrypt');
const mongoose =require('mongoose');
// const {
//     Int32,ObjectID
//   } = require('mongodb');
  
  
const Transaction = require('../model/Transaction/transaction_model');
const Customer= require('../model/Customer/customer_model');
// {'creditamount':req.body.creditamount,'createdAt':req.body.createdAt,'description':req.body.description}
app.post('/update_transaction',(req,res)=>
{
    console.log(req.body);
Transaction.updateOne({_id:new mongoose.mongo.ObjectID(req.body.transaction_id)},{$set:req.body}).then((err,response)=>
{
   if(err) console.log(err);
   console.log(response);
    res.json({success:true,message:'Edited Successfully'});
})
})
app.post('/transaction',(req,res)=>
{
console.log(req.body);
const create_transaction= new Transaction(req.body);
create_transaction.save(function (err, result) {
    if (err)
    { console.log(err);
      res.status(500).json({"success":false,"message":"Error Occured"});
    }
  else
  {
  res.status(200).json({"success":true,"message":"Transaction created successfully"});
  }
})
})


app.post('/transaction_by_user',(req,res)=>
{
 
    console.log(req.body);
    //     var pipeline = [
            
    //             {
    //               $project: {
    //                 _id: 0, 
    //                 customers: '$$ROOT'
    //               }
    //             }, {
    //               $lookup: {
    //                 localField: 'customers._id', 
    //                 from: 'transactions', 
    //                 foreignField: 'customer_id', 
    //                 as: 'transactions'
    //               }
    //             }, {
    //             $unwind: {
    //                 path: '$transactions', 
    //                 preserveNullAndEmptyArrays: false
    //               }
    //             },
    //             {
    //             "$match" : { 
    //                 "transactions.user_id" : new mongoose.mongo.ObjectID(req.body.user_id)
    //             }
    //         },{
    //                 $group: {
    //                   _id: {
    //                     'customers᎐_id': '$customers._id', 
    //                     'customers᎐customername': '$customers.customername'
    //                   }, 
    //                   debitamount: {
    //                     $sum: '$transactions.debitamount'
    //                   }, 
    //                   creditamount: {
    //                     $sum: '$transactions.creditamount'
    //                   }
    //                 }
    //               }, {
    //                 $project: {
    //                   'customers.customername': '$_id.customers᎐customername', 
    //                   'customers._id': '$_id.customers᎐_id', 
    //                   'debitamount': '$debitamount', 
    //                   'creditamount': '$creditamount', 
    //                   _id:new mongoose.mongo.Int32(0)
    //                 }
    //               }
    // ];
    var pipeline = [
        {
            "$project": {
                "_id": 0,
                "customers": "$$ROOT"
            }
        }, 
        {
            "$lookup": {
                "localField": "customers._id",
                "from": "transactions",
                "foreignField": "customer_id",
                "as": "transactions"
            }
        }, 
        {
            "$unwind": {
                "path": "$transactions",
                "preserveNullAndEmptyArrays": true
            }
        }, 
        {
            "$match": {
                "customers.khaataid": new mongoose.mongo.ObjectID(req.body.khaata_id)
            }
        }, 
        {
            "$group": {
                "_id": {
                    "customers\u1390_id": "$customers._id",
                    "customers\u1390customername": "$customers.customername"
                },
                "debitamount": {
                    "$sum": "$transactions.debitamount"
                },
                "creditamount": {
                    "$sum": "$transactions.creditamount"
                }
            }
        }, 
        {
            "$project": {
                "debitamount": "$debitamount",
                "creditamount": "$creditamount",
                "customers.customername": "$_id.customers\u1390customername",
                "customers._id": "$_id.customers\u1390_id",
                "_id": 0
            }
        }
    ];

    var pipeline2 = [
        {
            "$project": {
                "_id": 0,
                "customers": "$$ROOT"
            }
        }, 
        {
            "$lookup": {
                "localField": "customers._id",
                "from": "transactions",
                "foreignField": "customer_id",
                "as": "transactions"
            }
        }, 
        {
            "$unwind": {
                "path": "$transactions",
                "preserveNullAndEmptyArrays": true
            }
        }, 
        {
            "$match": {
                "customers.khaataid": new mongoose.mongo.ObjectID(req.body.khaata_id)
            }
        }, 
        {
            "$group": {
                "_id": {
                },
                "debitamount": {
                    "$sum": "$transactions.debitamount"
                },
                "creditamount": {
                    "$sum": "$transactions.creditamount"
                }
            }
        }, 
        {
            "$project": {
                "debitamount": "$debitamount",
                "creditamount": "$creditamount",
                "_id": 0
            }
        }
    ];
    Customer.aggregate(pipeline,(err,result)=>
    {
        Customer.aggregate(pipeline2,(err1,result1)=>
        {            
            console.log(result1);
            res.status(200).json({"success":true,transaction_summary:result,khaatabook_summary:result1});
        })
       

    });
   
})

app.post('/transaction_of_customer',(req,res)=>
{

    console.log(req.body);
    var pipeline = [
        {
            $match: {
                "customer_id": new mongoose.mongo.ObjectID(req.body.customer_id)
            }
        }, 
        {
            $group: {
                "_id": {},
                "creditamount": {
                    "$sum": "$creditamount"
                },
                "debitamount": {
                    "$sum": "$debitamount"
                }
            }
        }, 
        {
            $project: {
                "creditamount": "$creditamount",
                "debitamount": "$debitamount",
                "_id": 0
            }
        }
];
    Transaction.aggregate(pipeline,(err,result)=>
    {
        console.log(result);
        const customer_transaction = Transaction.find({customer_id:req.body.customer_id});
        customer_transaction.then((results)=>
        {
            res.status(200).json({"success":true,transaction_summary:result,transaction_list:results});

        })

    })
    
})

app.post('/transaction_by_date_range',(req,res)=>
{
    var pipeline = [
        {
            $match: {
                "user_id": new mongoose.mongo.ObjectID(req.body.user_id),
                "createdAt":{
                    $gte:new Date(req.body.startdate),
                    $lte:new Date(req.body.enddate)
                }
            }
            }
        , 
        {
            $group: {
                "_id": {},
                "creditamount": {
                    $sum: "$creditamount"
                },
                "debitamount": {
                    $sum: "$debitamount"
                }
            }
        }, 
        {
            $project: {
                "creditamount": "$creditamount",
                "debitamount": "$debitamount",
                "_id": 0
            }
        }
];

Transaction.aggregate(pipeline,(err,result)=>
{
    console.log(err);
    const get_transaction = Transaction.find({user_id:req.body.user_id,createdAt:{
        $gte:new Date(req.body.startdate).toISOString(),
        $lte:new Date(req.body.enddate).toISOString()
    }})
    get_transaction.then((results)=>
        {
        res.status(200).json({"success":true,transaction_summary:result,transaction_list:results});
        }
    )
})
 
})

app.post('/transaction_of_customer_by_date_range',(req,res)=>
{
    const get_transaction = Transaction.find({user_id:req.body.user_id,customer_id:req.body.customer_id,createdAt:req.body.createdAt})
    get_transaction.then((results)=>
        {
        res.status(200).json({"success":true,transaction_list:results});
        }
    )
})

module.exports=app;