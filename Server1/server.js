require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const api = require('./routes/api');
var http = require('http');
//const uploads = require('uploads/Screenshot (1)');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(require('path').join(__dirname , './uploads')));
global.map = new Map();

// use JWT auth to secure the api
app.use(jwt());
// api routes
app.use('/users', require('./users/users.controller'));
// global error handler
app.use(errorHandler);
app.use('/api' , api);
//app.use('/uploads' , uploads);
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
  //  console.log(require('path').join(__dirname , '/uploads'));
  //  console.log(__dirname);
  //  console.log(uploads);
    //console.log(express.static(require('path').join(__dirname,'/uploads')));
});

global.io  = require('socket.io').listen(server);
/*global.io.use((socket , next)=>{
  console.log("hello");
    var cmp = socket.handshake.query.token;
    if(cmp == "mytoken123")
    {
      console.log("ho gya");
      return next();
    }x
    return next(new Error('authentication error'));
});*/

global.io.on('connection', (socket) => {

  socket.on('username' , (data)=>{
    global.map.set(data , socket);
    console.log(data);
  });

  /*console.log(socket.handshake.query);
  global.map.set(socket.handshake.query , socket);*/
  socket.on('disconnect' , ()=>{
    console.log("disconnected");
    //global.map.clear();
    global.map.delete(socket.handshake.query.username);
  });
});
