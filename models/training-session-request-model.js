const mongoose = require('mongoose');
const trainingSessionRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    clientID: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'pending'
    },
    type: {
        type: String,
        default: 'Training session'
    },
    isOnHold: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

trainingSessionRequestSchema.methods.toJSON = function () {
    const object = this.toObject();
    object.id = object._id;
    delete object._id;
    delete object.__v;
    return object;
}

const TrainingSessionRequest = mongoose.model('TrainingSessionRequest', trainingSessionRequestSchema);
module.exports = TrainingSessionRequest;
