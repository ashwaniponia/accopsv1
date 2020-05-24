const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username : String,
    imge : String ,
    company : String,
    address : String,
    city : String,
    country : String,
    firstname : String,
    lastname : String,
    orgcode : String,
    postalcode : Number,

    totaldeals : Number,
    acceptedeals : Number,
    rejecteddeals : Number,

    dealspending : Number,

    maxval : Number,
    Hide : Boolean,

    Hide1 : Boolean
});


module.exports = mongoose.model('user' , UserSchema , 'users');
