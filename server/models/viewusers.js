const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId :String,
    name : String,
    imge : String ,
    company : String,
    totaldeals : Number,
    acceptedeals : Number,
    rejecteddeals : Number,
    dealspending : Number,
    maxval : String,
    Hide : Boolean,
    Hide1 : Boolean
});


module.exports = mongoose.model('user' , UserSchema , 'users');
