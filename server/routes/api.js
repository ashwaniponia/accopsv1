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
  users.find({}).exec(function(err , viewusers){
    if(err){
      console.log("Error retrieving users");
    }
    else {
      res.json(viewusers);
    }
  });
});
router.get('/' , function(req , res){
  res.send('api works');
});

module.exports = router;
