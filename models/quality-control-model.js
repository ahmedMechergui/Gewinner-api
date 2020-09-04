const mongoose = require('mongoose');

const qualityControlSchema = new mongoose.Schema({
    schedules: [{
        schedule: {
            type: Date
        }
    }],
    isValidated: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'pending'
    },
    type: {
        type : String,
        default : 'Quality control'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
}, {timestamps: true});

qualityControlSchema.methods.toJSON = function () {
    const object = this.toObject();
    object.id = object._id;
    delete object._id;
    delete object.__v;
    return object;
}

const QualityControl = mongoose.model('QualityControl', qualityControlSchema);
module.exports = QualityControl;
