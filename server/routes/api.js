const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../models/viewusers');
var bodyParser = require('body-parser');
const upusers = require('../models/updateuser');


  mongoose.connect('mongodb+srv://kb99:kb99@cluster0-rphf4.mongodb.net/accops?retryWrites=true&w=majority' , function(err){
    if(err)
    {
      console.log(err);
    }
    else {
      console.log("MongoClient Connected!!");
    }
  });




router.get('/viewusers' , function(req , res){
  console.log('Get request of all users');
  users.find({}).exec(function(err , viewusers){
    if(err){
      res.json("Error");
    }
    else {
      res.json(viewusers);
    }
  });
});


router.get('/updateuser/get' , function(req , res , next){
  console.log("Get request of the specified user");
  upusers.find({username : req.query.username} , {username : 1,
  imge :1 ,
  company :1,
  address :1,
  city :1,
  country :1,
  firstname :1,
  lastname :1,
  orgcode :1,
  postalcode :1,
  urights :1,
  drights :1}).exec(function(err , data){
    if(err)
    console.log("Error");
    else {
      console.log(data);
      res.send(data);
    }
  });
});

router.post('/updateuser/post' , function(req , res){
  console.log(req.body.form);
  upusers.updateOne({ _id : req.body.form._id} , {
    $set : {
      username : req.body.form.username,
      imge : req.body.form.imge,
      company :req.body.form.company,
      address :req.body.form.address,
      city : req.body.form.city,
      country : req.body.form.country,
      firstname :req.body.form.firstname,
      lastname :req.body.form.lastname,
      orgcode :req.body.form.orgcode,
      postalcode :req.body.form.postalcode,
      urights :req.body.form.urights,
      drights :req.body.form.drights
    }
  } , function(err , data){
    if(err)
    console.log(err);
    else {
      res.json("Updated successfully");
    }
  });
});


router.get('/removeuser/delete/:id' , function(req , res){
  console.log('Delete request for the given user');
  users.deleteOne({"_id":req.params.id}).exec(function(err,viewusers){
  	if(err){
  		console.log("Error in deleting record");
  	}else{
  		console.log("Successful Deletion Process");
  	}
  });
});


router.post('/adduser' , function(req , res){

 console.log(req.body);

  users.create(req.body,function(err,result){
    if(err){
      console.log("Error in deleting record");
    }else{
      console.log("Successful Addition Process");
    }
  });

});


module.exports = router;
