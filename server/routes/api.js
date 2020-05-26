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
const  notification = require('../models/notification');
const moment = require('moment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  destination : function(req , file , cb)
  {
    cb(null, './uploads/');
  },
  filename : function(req , file , cb){

      if(file == null)
      {
        next();
      }
      cb(null , file.originalname);
  }

});
const upload = multer({storage : storage});
var flag = 0;
  mongoose.connect('mongodb+srv://kb99:kb99@cluster0-rphf4.mongodb.net/accopsv?retryWrites=true&w=majority' , function(err){
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
  users.find({}).exec( async function(err , viewusers){
    if(err){
      res.json("Error");
    }
    else {
      console.log(viewusers);
      res.json(viewusers);
    }
  });
});




    router.get('/updateuser/get' ,  function(req , res , next)
    {
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
          drights :1,
          L1 : 1,
          L2 : 1,
          L3 : 1,
          regioncode : 1} , function(err , data){
            if(err)
            console.log("Error");
            else {
              res.json(data);
            }
          });
    });



try
{
    var compute = async function(arr)
    {
        console.log("Look Here");
        console.log(arr._id);
        const session = await mongoose.startSession();
        session.startTransaction();
        try
        {
          var check1 = null;
          if(arr.imge == null)
          {
           check1 = await upusers.findOneAndUpdate({ _id : arr._id} , {
            $set : {
              username : arr.username,
              company :arr.company,
              address :arr.address,
              city : arr.city,
              country : arr.country,
              firstname :arr.firstname,
              lastname :arr.lastname,
              orgcode :arr.orgcode,
              postalcode :arr.postalcode,
              urights :arr.urights,
              drights :arr.drights,
              L1 : arr.L1,
              L2 : arr.L2,
              L3 : arr.L3,
              regioncode : arr.regioncode,

            }
          } , session );
        }
        else {
          check1 = await upusers.findOneAndUpdate({ _id : arr._id} , {
           $set : {
             username : arr.username,
             company :arr.company,
             imge : arr.imge,
             address :arr.address,
             city : arr.city,
             country : arr.country,
             firstname :arr.firstname,
             lastname :arr.lastname,
             orgcode :arr.orgcode,
             postalcode :arr.postalcode,
             urights :arr.urights,
             drights :arr.drights,
             L1 : arr.L1,
             L2 : arr.L2,
             L3 : arr.L3,
             regioncode : arr.regioncode,

           }
         } , session );
        }
          if(check1 == null)
          throw new Error("UpdateError");

          var obj = {
            username : arr.username,
            message : "Some updates have been made ! Please Check !"
          }


          var check2 = await notification.create([obj] , session);
          if(check2 == null)
          throw new Error("UpdateError");
          await session.commitTransaction();
          session.endSession();
          return true;
        }
        catch(e)
        {
            await session.abortTransaction();
            session.endSession();
        }
    }
}
catch(e)
{
  e.message();
}










router.post('/updateuser/post' , upload.single('imge') , async function(req , res){
  session = await mongoose.startSession();
    session.startTransaction();


    console.log(req.body);

    var l1 = JSON.parse(req.body.L1);
    var l2 = JSON.parse(req.body.L2);
    var l3 = JSON.parse(req.body.L3);
    var regioncode = JSON.parse(req.body.regioncode);
    l1.sort();
    l2.sort();
    l3.sort();

    console.log(l1);
    console.log(l2);
    console.log(l3);


    var final_check = 0;
    final_check = duplicatesExist(l1);
    final_check = Math.max(final_check , duplicatesExist(l2));
    final_check = Math.max(final_check , duplicatesExist(l3));
    final_check = Math.max(final_check , duplicatesExist(regioncode));
    for(var x = 0 ; x < l1.length ; x++)
    {
          var l =  0 , r = l2.length-1;
          while(l <= r)
          {
            console.log("hello");
            var mid = Math.floor((l+r)/2);
            console.log(mid);
            if(l2[mid].localeCompare(l1[x]) == -1)
              l = mid+1;
            else
              r = mid-1;
          }
          if(l-1 >= 0)
          {
              final_check = compare(l1[x] , l2[l-1]);
          }
      }


      for(var x = 0 ; x < l1.length ; x++)
      {
          var l =  0 , r = l3.length-1;
          while(l <= r)
          {
              var mid = Math.floor((l+r)/2);
              if(l3[mid].localeCompare(l1[x]) == -1)
                l = mid+1;
              else
                r = mid-1;
          }
          if(l-1 >= 0)
          {
              final_check = compare(l1[x] , l3[l-1]);
          }
      }

      for(var x = 0 ; x < l2.length ; x++)
      {
          var l =  0 , r = l3.length-1;
          while(l <= r)
          {
              var mid = Math.floor((l+r)/2);
              if(l3[mid].localeCompare(l2[x]) == -1)
                l = mid+1;
              else
                r = mid-1;
          }
          if(l-1 >= 0)
          {
              final_check = compare(l2[x] , l3[l-1]);
          }
      }


      var array = req.body.form;



      if(final_check == 0)
      {
        if(req.body.imge == "null" || req.body.imge == "undefined")
        {
          var array = {
          _id : req.body._id,
          username : req.body.username,
          imge : null,
          company :req.body.company,
          country : req.body.country,
          address :req.body.address,
          city :req.body.city,
          firstname : req.body.firstname,
          lastname :req.body.lastname,
          orgcode :req.body.orgcode,
          postalcode :parseInt(req.body.postalcode),
          urights :JSON.parse(req.body.urights),
          drights :JSON.parse(req.body.drights),
          L1 : JSON.parse(req.body.L1),
          L2 : JSON.parse(req.body.L2),
          L3 : JSON.parse(req.body.L3),
          regioncode : JSON.parse(req.body.regioncode),
        }
      }
        else
        {
          var array = {
          _id : req.body._id,
          username : req.body.username,
          imge : req.file.originalname,
          company :req.body.company,
          address :req.body.address,
          city :req.body.city,
          country : req.body.country,
          firstname : req.body.firstname,
          lastname :req.body.lastname,
          orgcode :req.body.orgcode,
          postalcode :parseInt(req.body.postalcode),
          urights :JSON.parse(req.body.urights),
          drights :JSON.parse(req.body.drights),
          L1 : JSON.parse(req.body.L1),
          L2 : JSON.parse(req.body.L2),
          L3 : JSON.parse(req.body.L3),
          regioncode : JSON.parse(req.body.regioncode),
        };
       }

        console.log(array);
        await compute(array);
        /*  upusers.findOneAndUpdate({ _id : arr._id} , {
            $set : {
              username : arr.username,
              imge : arr.imge,
              company :arr.company,
              address :arr.address,
              city : arr.city,
              country : arr.country,
              firstname :arr.firstname,
              lastname :arr.lastname,
              orgcode :arr.orgcode,
              postalcode :arr.postalcode,
              urights :arr.urights,
              drights :arr.drights,
              L1 : arr.L1,
              L2 : arr.L2,
              L3 : arr.L3,
              regioncode : arr.regioncode,

            }
          } , function(err , data){
              if(err)
              {
                console.log(err);
              }
              else {

                console.log("You have finally reached here");
                console.log(data);
                    res.json("User Updated Successfully");
              }


          });*/
            res.json("User Updated Successfully");

      }
      else
      {
          res.json("Same regions inserted ! User Form not Updated");
      }


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

var compare = function(l1 , l2)
{
  var pos = 0;
  console.log(l1);
  console.log(l2);
  while(pos < l2.length && l2[pos] != '0')
  {
    if(l1[pos] != l2[pos])
    {
      return 0;
      break;
    }
    pos++;
  }

  return 1;
}

var duplicatesExist = function(l)
{
  var count = 1;

  for(var x = 1 ; x < l.length ; x++)
  {
    if(l[x].localeCompare(l[x-1]) == 0)
    count++;
    else {
      count = 1;
    }

    if(count > 1)
    return 1;
  }
  return 0;
}



router.post('/adduser' ,  upload.single('imge') , function(req , res){

console.log(req.file);
 //console.log(req.file);
 console.log(req.body);
  var l1 = JSON.parse(req.body.L1);
  var l2 = JSON.parse(req.body.L2);
  var l3 = JSON.parse(req.body.L3);
  var regioncode = JSON.parse(req.body.regioncode);
  l1.sort();
  l2.sort();
  l3.sort();

  console.log(l1);
  console.log(l2);
  console.log(l3);


  var final_check = 0;
  final_check = duplicatesExist(l1);
  final_check = Math.max(final_check , duplicatesExist(l2));
  final_check = Math.max(final_check , duplicatesExist(l3));
  final_check = Math.max(final_check , duplicatesExist(regioncode));
  for(var x = 0 ; x < l1.length ; x++)
  {
      var l =  0 , r = l2.length-1;
      console.log(l);
      console.log(r);
      while(l <= r)
      {
        var mid = Math.floor((l+r)/2);
        console.log(mid);
        if(l2[mid].localeCompare(l1[x]) == -1)
        l = mid+1;
        else
        r = mid-1;
      }
      if(l-1 >= 0)
      {
        final_check = compare(l1[x] , l2[l-1]);
      }
  }


  for(var x = 0 ; x < l1.length ; x++)
  {
      var l =  0 , r = l3.length-1;
      while(l <= r)
      {
        var mid = Math.floor((l+r)/2);
        if(l3[mid].localeCompare(l1[x]) == -1)
        l = mid+1;
        else
        r = mid-1;
      }
      if(l-1 >= 0)
      {
        final_check = compare(l1[x] , l3[l-1]);
      }
  }

  for(var x = 0 ; x < l2.length ; x++)
  {
      var l =  0 , r = l3.length-1;
      while(l <= r)
      {
        var mid = Math.floor((l+r)/2);
        if(l3[mid].localeCompare(l2[x]) == -1)
        l = mid+1;
        else
        r = mid-1;
      }
      if(l-1 >= 0)
      {
        final_check = compare(l2[x] , l3[l-1]);
      }
  }
  flag = 1;
  var hash = bcrypt.hashSync(req.body.password, 10);
  var ans = {
    username : req.body.username,
    imge : req.file.originalname ,
    hash : hash ,
    company : req.body.company,
    address : req.body.address,
    city : req.body.city,
    country : req.body.country ,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    orgcode : req.body.orgcode,
    postalcode : parseInt(req.body.postalcode),
    totaldeals : 0,
    acceptedeals : 0,
    rejecteddeals : 0,

    dealspending : 0,

    maxval :0,
    Hide : true,

    Hide1 : false,
    urights : JSON.parse(req.body.urights),
    drights : JSON.parse(req.body.drights),
    L1 : JSON.parse(req.body.L1),
    L2 :JSON.parse(req.body.L2),
    L3 : JSON.parse(req.body.L3),
    regioncode : JSON.parse(req.body.regioncode)
  };

  console.log(ans);

  if(final_check == 0)
  {
      crusers.create(ans, async function(err,result){
        if(err){
          console.log(err);
          res.json("Error in user creation ");
        }else{

          /*var io = req.app.get('socketio');
          await io.on('connection' , async function(socket){
            if(flag == 1)
               socket.emit('message' , "Users created");

            flag = 0;
          });*/


          res.json("User Created Successfully");
        }
      });
  }
  else {
    res.json("You assigned same region to the user! User not created !");
  }

});

//Notifications code is here

router.get('/Notifications' , function(req , res){


    notification.find({username : req.query.username}).exec(function(err ,data){
        if(err)
        res.json(err);
        else
        {
          console.log(data);
          res.json(data);
        }
    });
});



//      ALL DEALS START FROM HERE


/*router.post('/Dealexist',function(req,res){

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
});*/

try{
    router.post('/addDeal',async function(req,res){
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
                  username : req.body.username,
                  Hide_description : req.body.Hide_description,
                  region_code : req.body.region_code
               };

               console.log(deal);
               const session = await mongoose.startSession();
               session.startTransaction();
               try{
                 const user = await users.updateOne({username : deal.username} , {
                   $inc :{totaldeals : 1 , dealspending : 1},
                   $max : { maxval :  deal.amount}
                 } , session);

                 //console.log(user);
                 if(user == null)
                  throw new Error("Error in Finding and Updating");

                 console.log("hello");
                 const check = await adddeal.create([deal] , session);
                 console.log(check);
                 if(check == null)
                 throw new Error("Error in deal Creation");

                 res.json("Deal Registered Successfully");




                 session.commitTransaction();
                 session.endSession();
               }
               catch(e)
               {
                 res.json("Error in registering Deal")
                 await session.abortTransaction();
                 session.endSession();
                 throw e;
               }
    });
}
catch(e)
{
  e.message();
}


router.get('/viewdeals', function(req , res){
  console.log("Hello");
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
            Time : [Math.round(days_remaining) , Math.round(sub)],
            Hide_description: dealdata[i].Hide_description,
            region_code : dealdata[i].region_code
          };
          array.push(x);
        }
        console.log(array);
        res.json(array);
      }
  });
});



try
{
  var Find1 = async  function(search)
  {
    console.log("You are in Find1");
    console.log(search);
    session = await mongoose.startSession();
    session.startTransaction();
    var ans = [];
      try
      {
          ans = await adddeal.find({level : 1 , status : "Pending" , region_code : {$regex : search}} , null , session);
          await session.commitTransaction();
          session.endSession();
      }
      catch(e)
      {
          await session.abortTransaction();
          session.endSession();
          throw e;
      }
      return ans;
  }
}
catch(e)
{
  e.message();
}

    router.get('/getdeal/L1' , async function(req , res){
      console.log("You are here");

      var arr = req.query.l1;
      console.log(arr);
      var code = "";
      var codes = [];
      for(var x = 0 ; x < arr.length ; x++)
      {
        if(arr[x] != ',')
        code = code + arr[x];
        else {
          codes.push(code);
          code = "";
        }
      }

      codes.push(code);
      console.log(codes);
      var temp1 = [];

          for(var x = 0 ; x < codes.length ; x++)
          {
              var search = "^" + codes[x];
            var doc = await Find1(search);
            console.log(doc);
            if(doc == null)
            throw new Error("Error in Finding");

            for(var y = 0 ; y < doc.length ; y++)
            temp1.push(doc[y]);
          }
          console.log(temp1);

          var array = [];

              var current_date = new Date();
              var end = moment(current_date , "DD.MM.YYYY");
              for(var i =0 ; i < temp1.length ; i++)
              {
                var start = moment(temp1[i].issued_date , "DD.MM.YYYY");


                var rem = moment.duration(end.diff(start));
                var days_completed = rem.asDays();
                var sub = 0;
                var cmp = temp1[i].completion_time;
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
                var days_remaining = temp1[i].completion_time-sub;
                console.log(days_remaining);
                var x;
                x = {
                  _id : temp1[i]._id,
                  dealprogress :temp1[i].dealprogress,
                  description : temp1[i].description,
                  orgname : temp1[i].orgname,
                  username : temp1[i].username,
                  amount : temp1[i].amount,
                  level : temp1[i].level ,
                  Hide : temp1[i].Hide ,
                  Time : [Math.round(days_remaining) , Math.round(sub)],
                  Hide_description : temp1[i].Hide_description,
                  region_code : temp1[i].region_code
                };
                array.push(x);
              }

          res.json(array);


    });




    try
    {
      var Find2 = async  function(search)
      {
        console.log("I am in Find2");
        console.log(search);
        session = await mongoose.startSession();
        session.startTransaction();
        var ans = [];
          try
          {
              ans = await adddeal.find({level : 2 , status : "Pending" ,  region_code : {$regex : search}} , null , session);
              await session.commitTransaction();
              session.endSession();
          }
          catch(e)
          {
              await session.abortTransaction();
              session.endSession();
              throw e;
          }
          return ans;
      }
    }
    catch(e)
    {
      e.message();
    }

        router.get('/getdeal/L2' , async function(req , res){
          console.log("You are here");

          var arr = req.query.l2;
          console.log(arr);
          var code = "";
          var codes = [];
          for(var x = 0 ; x < arr.length ; x++)
          {
            if(arr[x] != ',' && arr[x] != '0')
            code = code + arr[x];
            else {
              if(code.length > 0)
              codes.push(code);
              code = "";
            }
          }
          if(code.length > 0)
          codes.push(code);
          console.log(codes);
          var temp1 = [];

              for(var x = 0 ; x < codes.length ; x++)
              {
                  var search = "^" + codes[x];
                  console.log(search);
                /*var pref = "^";
                var temp = arr[x];
                console.log(temp);*/
                var doc = await Find2(search);
                console.log(doc);

                for(var y = 0 ; y < doc.length ; y++)
                temp1.push(doc[y]);
              }
              console.log(temp1);

              var array = [];

                  var current_date = new Date();
                  var end = moment(current_date , "DD.MM.YYYY");
                  for(var i =0 ; i < temp1.length ; i++)
                  {
                    var start = moment(temp1[i].issued_date , "DD.MM.YYYY");


                    var rem = moment.duration(end.diff(start));
                    var days_completed = rem.asDays();
                    var sub = 0;
                    var cmp = temp1[i].completion_time;
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
                    var days_remaining = temp1[i].completion_time-sub;
                    console.log(days_remaining);
                    var x;
                    x = {
                      _id : temp1[i]._id,
                      dealprogress :temp1[i].dealprogress,
                      description : temp1[i].description,
                      orgname : temp1[i].orgname,
                      username : temp1[i].username,
                      amount : temp1[i].amount,
                      level : temp1[i].level ,
                      Hide : temp1[i].Hide ,
                      Time : [Math.round(days_remaining) , Math.round(sub)],
                      Hide_description : temp1[i].Hide_description,
                      region_code : temp1[i].region_code
                    };
                    array.push(x);
                  }

              res.json(array);
        });


        try
        {
          var Find3 = async  function(search)
          {
            session = await mongoose.startSession();
            session.startTransaction();
            var ans = [];
              try
              {
                  ans = await adddeal.find({level : 3 , status : "Pending" , region_code : {$regex : search}} , null , session);
                  await session.commitTransaction();
                  session.endSession();
              }
              catch(e)
              {
                  await session.abortTransaction();
                  session.endSession();
                  throw e;
              }
              return ans;
          }
        }
        catch(e)
        {
          e.message();
        }

            router.get('/getdeal/L3' , async function(req , res){
              console.log("You are here");

              var arr = req.query.l3;
              console.log(arr);
              var code = "";
              var codes = [];
              for(var x = 0 ; x < arr.length ; x++)
              {
                if(arr[x] != ',' && arr[x] != '0')
                code = code + arr[x];
                else {
                  if(code.length > 0)
                  codes.push(code);
                  code = "";
                }
              }
              if(code.length > 0)
              codes.push(code);
              console.log(codes);
              var temp1 = [];

                  for(var x = 0 ; x < codes.length ; x++)
                  {
                      var search = "^" + codes[x];
                      console.log(search);
                    /*var pref = "^";
                    var temp = arr[x];
                    console.log(temp);*/
                    var doc = await Find3(search);
                    console.log(doc);
                    if(doc == null)
                    throw new Error("Error in Finding");

                    for(var y = 0 ; y < doc.length ; y++)
                    temp1.push(doc[y]);
                  }
                  console.log(temp1);

                  var array = [];

                      var current_date = new Date();
                      var end = moment(current_date , "DD.MM.YYYY");
                      for(var i =0 ; i < temp1.length ; i++)
                      {
                        var start = moment(temp1[i].issued_date , "DD.MM.YYYY");


                        var rem = moment.duration(end.diff(start));
                        var days_completed = rem.asDays();
                        var sub = 0;
                        var cmp = temp1[i].completion_time;
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
                        var days_remaining = temp1[i].completion_time-sub;
                        console.log(days_remaining);
                        var x;
                        x = {
                          _id : temp1[i]._id,
                          dealprogress :temp1[i].dealprogress,
                          description : temp1[i].description,
                          orgname : temp1[i].orgname,
                          username : temp1[i].username,
                          amount : temp1[i].amount,
                          level : temp1[i].level ,
                          Hide : temp1[i].Hide ,
                          Time : [Math.round(days_remaining) , Math.round(sub)],
                          Hide_description : temp1[i].Hide_description,
                          region_code : temp1[i].region_code
                        };
                        array.push(x);
                      }

                  res.json(array);


            });



try
{
     router.post('/updatedeal/addL2' , async function(req , res){
       session = await mongoose.startSession();
       session.startTransaction();
       try
       {
           var check1 = await adddeal.updateOne({_id : req.body.item._id} , {$inc : {level : 1}} ,session);
           if(check1 == null)
           throw new Error("UpdateError");
           var mssg = "Your L1 Authorisation for Region code : " + req.body.item.region_code + " and organisation : " + req.body.item.orgname + " is approved";
           var obj = {
             username : req.body.item.username,
             message : mssg
           }


           var check2 = await notification.create([obj] , session);
           if(check2 == null)
           throw new Error("CreateError");
           await session.commitTransaction();
           session.endSession();
       }
       catch(e)
       {
          await session.abortTransaction();
          session.endSession();
          throw e;
       }

    });
}
catch(e)
{
  e.message();
}


try
{
    router.post('/updatedeal/addL3' , async function(req , res)
    {
        session = await mongoose.startSession();
        session.startTransaction();
          try
          {
            var check1 = await adddeal.updateOne({_id : req.body.item._id} , {$inc : {level : 1}} , session);
            if(check1 == null)
            throw new Error("UpdateError");


            var mssg = "Your deal having Region code : " + req.body.item.region_code + " and organisation : " + req.body.item.orgname + " is shifted to L3 approval";
            var obj = {
              username : req.body.item.username,
              message : mssg
            }


            var check2 = await notification.create([obj] , session);
            if(check2 == null)
            throw new Error("CreateError");
            await session.commitTransaction();
            session.endSession();

          }
          catch(e)
          {
            await session.abortTransaction();
            session.endSession();
            throw e;
          }
    });
}
catch(e)
{
    e.message();
}


try
{
  router.post('/updatedeal/auth' , async function(req , res){
    session = await mongoose.startSession();
    session.startTransaction();
    try
    {
        console.log("helloauth");
        const check1 = await adddeal.updateOne({_id : req.body.item._id} , {$set : {status : "Authorised"}} , session);
        if(check1 == null)
        throw new Error("Error in Update function 1");

        const check2 = await users.updateOne({username : req.body.item.username} , {
          $inc : {dealspending : -1 , acceptedeals : 1 },
        } , session);


        if(check2 == null)
          throw new Error("Error in Update function 2");
        const check3 = await adddeal.find({region_code : req.body.item.region_code , orgname : req.body.item.orgname , username : {$ne : req.body.item.username}} , null , session);
        if(check3 == null)
          throw new Error("Error in Find function");

        console.log(check3);
        for(var i = 0 ; i < check3.length ; i++)
        {
          console.log("Hello");
          const check4 = await users.updateOne({username : check3[i].username} , {
            $inc : {dealspending : -1 , rejecteddeals : 1},
          } , session);


          console.log(check4);
          if(check4 == null)
            throw new Error("Error in Update function");

          //  console.log(check3[i].username);
          console.log(check3[i].username);
          const check5 = await adddeal.updateOne({username : check3[i].username , orgname : req.body.item.orgname} , {$set : {status : "Rejected"}} , session);
          if(check5 == null)
            throw new Error("Error in Update function");


            var mssg = "Your deal for Region code : " + check3[i].region_code + " and organisation : " + check3[i].orgname + " is rejected";
            var obj = {
              username : check3[i].username,
              message : mssg
            }


            var check6 = await notification.create([obj] , session);
            if(check6 == null)
            throw new Error("CreateError");
        }


        var mssg = "Your deal for Region code : " + req.body.item.region_code + " and organisation : " + req.body.item.orgname + " is authorised";
        var obj = {
          username : req.body.item.username,
          message : mssg
        }


        var check7 = await notification.create([obj] , session);
        if(check7  == null)
        throw new Error("CreateError");

        await session.commitTransaction();
        session.endSession();
    }
    catch(e)
    {
      await session.abortTransaction();
      session.endSession();
      throw e;
    }
  });
}
catch(e)
{
  e.message();
}
module.exports = router;
