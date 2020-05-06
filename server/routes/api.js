const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../models/viewusers');
const crusers = require('../models/createuser');
const bcrypt = require('bcryptjs');
const deals = require('../models/viewdeals');
const adddeal = require('../models/adddeals');
var bodyParser = require('body-parser');
const upusers = require('../models/updateuser');
const moment = require('moment');

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

  crusers.create(req.body,function(err,result){
    if(err){
      console.log(err);
      res.json("Error");
    }else{
      res.json("User Created successfully");
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
           var current_date = new Date();
           var deal = {
              dealprogress : req.body.dealprogress,
              description : req.body.description,
              orgname : req.body.orgname,
              amount : req.body.amount,
              level : req.body.level ,
              Hide : req.body.Hide ,
              issued_date :  current_date,
              completion_time : req.body.Time,
              username : req.body.username
           };

           console.log(deal);

           adddeal.create(deal,function(err,result){
              if(err){
              console.log("Error in Adding record");
              res.status(400).send("unable to add to database")
           }else{
              console.log("Successful Addition Process");
              res.status(200).json({'Deal':'Deal added Successful'})
            }
           });
});


router.get('/viewdeals', function(req , res){
  adddeal.find({}).exec(function(err , dealdata){
      if(err)
      console.log("Error");
      else {
        var current_date = new Date();
        var end = moment(current_date , "DD.MM.YYYY");
        var array = [];
        for(var i =0 ; i < dealdata.length ; i++)
        {
          var start = moment(dealdata[i].issued_date , "DD.MM.YYYY");


          var rem = moment.duration(end.diff(start));
          var days_completed = rem.asDays();
          var sub = 0;
          var cmp = dealdata[i].completion_time;
          var completed = 0;
          if(days_completed < cmp)
          {
            completed = cmp;
          }
          else {
            completed = days_completed;
          }
          if(cmp < days_completed)
          {
            sub = cmp;
          }
          else
          {
            sub = days_completed;
          }
          console.log(completed);
          //console.log(days_remaining);
          var days_remaining = dealdata[i].completion_time-sub;
          console.log(days_remaining);
          var x;
          x = {
            _id : dealdata[i]._id,
            dealprogress : dealdata[i].dealprogress,
            description : dealdata[i].description,
            orgname : dealdata[i].orgname,
            username : dealdata[i].username,
            amount : dealdata[i].amount,
            level : dealdata[i].level ,
            Hide : dealdata[i].Hide ,
            Time : [Math.round(days_remaining) , Math.round(sub)]
          };
          array.push(x);
        }
        console.log(array);
        res.json(array);
      }
  });
});


module.exports = router;
