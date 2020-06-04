const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  username : String,
  message : String
});
module.exports = mongoose.model('notify' ,NotificationSchema , 'notifications');
