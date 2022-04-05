const mongoose = require('mongoose')
const Transaction = require('./Transaction')


const userSchema = new mongoose.Schema(
    {name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    balance: 
    {
        type: Number,
        required: true
    },
    firebaseID: {
        type: String,
        required: true
    },
}
);

module.exports = mongoose.model('User', userSchema);