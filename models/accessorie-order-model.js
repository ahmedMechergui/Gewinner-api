const mongoose = require('mongoose');
const validator = require('validator').default;

const accessorieOrderSchema = new mongoose.Schema({
    accessorieName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unitPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    //  Client Nature , individual or organisation
    clientNature: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['individual', 'organisation']
    },
//  Individuals form
    iName: {
        type: String,
        trim: true
    },
    iEmail: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value) && value !== '') {
                throw new Error('Email is not valid!')
            }
        }
    },
    iBirthday: {
        type: Date
    },
    iAddress: {
        type: String,
        trim: true
    },
    iZipCode: {
        type: Number
    },
    iPhone: {
        type: Number
    },
    iHandicap: {
        type: String,
        trim: true
    },
    iState: {
        type: String,
        trim: true
    },
//  Organisation form
    oName: {
        type: String,
        trim: true
    },
    oType: {
        type: String,
        trim: true
    },
    oSector: {
        type: String,
        trim: true
    },
    oRegistrationNumber: {
        type: String,
        trim: true
    },
    oResponsibleName: {
        type: String,
        trim: true
    },
    oHandicap: {
        type: String,
        trim: true
    },
    oAddress: {
        type: String,
        trim: true
    },
    oZipCode: {
        type: Number
    },
    oPhone: {
        type: Number
    },
    oEmail: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value) && value !== '') {
                throw new Error('Email is not valid!')
            }
        }
    },
    oState: {
        type: String
    }
}, {timestamps: true});

accessorieOrderSchema.methods.toJSON = function () {
    const accessorieOrderObject = this.toObject();
    accessorieOrderObject.id = accessorieOrderObject._id;
    delete accessorieOrderObject._id;
    delete accessorieOrderObject.__v;
    return accessorieOrderObject;
}

const AccessorieOrder = mongoose.model('AccessorieOrder', accessorieOrderSchema);

module.exports = AccessorieOrder;
