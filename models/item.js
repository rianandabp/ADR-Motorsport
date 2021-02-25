const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('item', UserSchema);