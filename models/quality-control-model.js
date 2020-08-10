const mongoose = require('mongoose');

const qualityControlSchema = new mongoose.Schema({
    schedules: [{
        schedule: {
            type: Date
        }
    }],
    isValidated : {
        type : Boolean,
        default : false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
}, {timestamps: true});


// const QualityControl = mongoose.model('QualityControl', qualityControlSchema);
const QualityControl = mongoose.model('QualityControl', qualityControlSchema);
module.exports = QualityControl;
