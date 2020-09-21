const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    start : {
        type: Date,
        required : true
    },
    end : {
        type: Date,
        required: true,
        index : {expires : '18h'}
    },
    description : {
        type : String,
        default : ''
    },
    color : {
        type : String,
    },
    dataEventColor : {
        type : String
    },
    allDay : { type : Boolean}
} , {timestamps : true});

eventSchema.methods.toJSON = function () {
const object = this.toObject();
object.id = object._id;
delete object._id;
delete object.createdAt;
delete object.updatedAt;
delete object.__v;

return object;
}

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;
