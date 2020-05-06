const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DealSchema = new Schema({

    dealprogress : Number,
    Time : [{type : Number}],
    description : String,
    username : String,
    orgname: String,
    amount :Number,
    level : Number,
    Hide : Boolean
});


module.exports = mongoose.model('deal' , DealSchema , 'deals');
