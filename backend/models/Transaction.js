const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        date: Date,
        amount: Number,
        type: String,
        balance: Number,
        firebaseID: String
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);