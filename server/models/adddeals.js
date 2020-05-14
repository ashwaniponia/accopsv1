const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DealSchema = new Schema({

    dealprogress : Number,
    completion_time : Number,
    issued_date : Date,
    description : String,
    username : String,
    orgname: String,
    amount :Number,
    level : Number,
    Hide : Boolean
});


module.exports = mongoose.model('addeal' , DealSchema , 'deals');
