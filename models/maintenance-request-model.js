const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Client'
    },
    status : {
        type : String,
        default : 'pending'
    },
    type: {
        type : String,
        default : 'Maintenance'
    }
}, {timestamps : true});

maintenanceRequestSchema.methods.toJSON = function () {
    const object = this.toObject();
    object.id = object._id;
    delete object._id;
    delete object.__v;
    return object;
}

const MaintenanceRequest = mongoose.model('MaintenanceRequest' , maintenanceRequestSchema);
module.exports = MaintenanceRequest;
