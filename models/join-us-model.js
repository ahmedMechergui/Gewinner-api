const mongoose = require('mongoose');
const validator = require('validator').default;

const joinerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is not valid!')
            }
        }
    },
    cvURL : {
        type : String,
        required : true
    },
    applyType : {
        type : String,
        required : true,
        lowercase : true,
        trim: true,
        enum : ['job' , 'internship']
    },
    motivation : {
        type : String,
        default : 'No motivation provided'
    },
    status : {
        type : String,
        default : 'pending'
    },
    interviewDate : {
        type : Date,
        default : null
    }
},{timestamps:true});

joinerSchema.methods.toJSON = function () {
    const joinerObject = this.toObject();
    joinerObject.id = joinerObject._id;
    delete joinerObject._id;
    delete joinerObject.__v;
    return joinerObject;
}

const Joiner = mongoose.model('Joiner',joinerSchema);

module.exports = Joiner;
