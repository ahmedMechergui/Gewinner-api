const mongoose = require('mongoose');
const validator = require('validator').default;

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    clientNature: {
        type: String,
        default: 'individual'
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is not valid');
            }
        }
    },
    birthday: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    handicap: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    scheduledDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'pending',
        enum: ['pending', 'rejected', 'tested', 'scheduled']
    },
    isValidated: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

testSchema.methods.toJSON = function () {
    const testObject = this.toObject();
    testObject.id = testObject._id;
    delete testObject._id;
    delete testObject.__v;
    return testObject;
}

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
