const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../models/viewusers');
const deals = require('../models/viewdeals');


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
 
  users.create(req.body,function(err,result){
    if(err){
      console.log("Error in Adding record");
      res.status(400).send("unable to add to database")
    }else{
      console.log("Successful Addition Process");
      res.status(200).json({'User':'User added Successful'})
    }
  });

});

//      ALL DEALS START FROM HERE


router.post('/Dealexist',function(req,res){
      
     deals.count({"orgname":req.body.orgname,"description":req.body.description,"amount":req.body.amount},function(err,count){
      console.log(count)
      if(err){
         res.status(400).status("unable to process");
      }else if(count > 0 ){
          res.status(200).json({'exist' : 'true'});
      }else{
          res.status(200).json({'exist' : 'false'});
      }
     })
});


router.post('/addDeal',function(req,res){
 console.log(req.body);
      
           deals.create(req.body,function(err,result){
              if(err){
              console.log("Error in Adding record");
              res.status(400).send("unable to add to database")
           }else{
              console.log("Successful Addition Process");
              res.status(200).json({'Deal':'Deal added Successful'})
            }      
           });
});


module.exports = router;
