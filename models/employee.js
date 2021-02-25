const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
    },
    salary: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('employee', UserSchema);