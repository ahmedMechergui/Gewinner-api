const mongoose = require('mongoose');

const clientIDSchema = new mongoose.Schema({
    clientID : {
        type : String,
        required : true,
        trim : true,
        unique : true
    }
} , {timestamps : true});



const ClientIDModel = mongoose.model('ClientID',clientIDSchema);
module.exports = ClientIDModel;
