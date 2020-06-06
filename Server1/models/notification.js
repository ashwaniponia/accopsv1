const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  username : String,
  message : String,
  date : Date,
  status : String 
});
module.exports = mongoose.model('notify' ,NotificationSchema , 'notifications');
