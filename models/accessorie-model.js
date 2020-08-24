const mongoose = require('mongoose');
const Order = require('./accessorie-order-model');

const accessorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    imageURL: [{
        type: String,
        required: true
    }],
    isAvailable: {
        type: Boolean,
        default: true
    },
    availableQuantity: {
        type: Number,
        default: Infinity
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    ordersThisMonth: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

accessorieSchema.methods.toJSON = function () {
    const accessorieObject = this.toObject();
    accessorieObject.id = accessorieObject._id;
    delete accessorieObject._id;
    delete accessorieObject.__v;
    return accessorieObject;
}

const Accessorie = mongoose.model('Accessorie', accessorieSchema);


module.exports = Accessorie;
