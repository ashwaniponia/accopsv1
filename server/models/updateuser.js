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
    urights : [{type : String}],
    drights : [{type : String}]
});
module.exports = mongoose.model('upuser' , UserSchema , 'users');
