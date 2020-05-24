const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    hash: String,
    firstName: String,
    lastName: String,
    username : String,
    imge : String,
    company : String,
    address : String,
    city : String,
    country : String,
    firstname : String,
    lastname : String,
    orgcode : String,
    postalcode : String,
    urights : [{type : String}],
    drights : [{type : String}],
    L1 : [{type : String}],
    L2 : [{type : String}],
    L3 : [{type : String}],
    regioncode : [{type : String}],
    Hide : Boolean,
    Hide1 : Boolean,
    maxval : Number,
    totaldeals :Number,
    acceptedeals: Number,
    rejecteddeals : Number,
    dealspending:Number
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Cruser', schema , 'users');
