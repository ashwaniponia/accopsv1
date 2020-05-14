const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

const api = require('./server/routes/api');
const port = 4200;

const app = express();

app.use(express.static(path.join(__dirname , 'dist/accops-v1')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//use JWT auth to secure the api
app.use(jwt());

app.use(errorHandler);


app.use('/api' , api);
app.get('*' , function(req , res){
  res.sendFile(path.join(__dirname , 'dist/accops-v1/index.html'));
});

app.listen(port , function(){
    console.log("Server running on localhost:" + port);
});
