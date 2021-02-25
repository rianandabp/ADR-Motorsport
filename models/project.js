const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    carModel: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: String
    },
    plateNumber: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    workDetail: [
        {
            description: {
                type: String,
                required: true
            },
            price:{
                type: Number,
                default: 0
            }
        }
    ],
    itemUsed: [
        {
            item:{
                type: Schema.Types.ObjectId
            },
            quantity:{
                type: Number,
                default: 0
            }
        }
    ]
});

module.exports = mongoose.model('project', UserSchema);