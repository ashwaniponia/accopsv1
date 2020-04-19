const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../models/viewusers');

mongoose.connect('mongodb://localhost:27017/accops' , function(err){
  if(err)
  {
    console.log("Error!"  + err);
  }
  else {
    console.log("MongoClient Connected!!");
  }
});


router.get('/viewusers' , function(req , res){
  console.log('Get request of all users');
  users.find({},{}).exec(function(err , viewusers){
    if(err){
      console.log("Error retrieving users");
    }
    else {
      res.json(viewusers);
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

module.exports = router;
