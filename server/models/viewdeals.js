const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DealSchema = new Schema({  
 
    dealprogress : Number,
    TimeRemaining : Number,
    description : String,
    orgname: String,
    orgcode : String,
    amount :Number,
    level : Number,
    hide1 : Boolean,
    hide2 : Boolean

});


module.exports = mongoose.model('deal' , DealSchema , 'deals');
