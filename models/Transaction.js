const mongoose = require('mongoose')
const mongooseDateFormat = require('./mongoose-date-format');

const transactionSchema = new mongoose.Schema(
    {
        date: Date,
        amount: Number,
        type: String,
        balance: Number,
        firebaseID: String
    }
);

transactionSchema.plugin(mongooseDateFormat);

module.exports = mongoose.model('Transaction', transactionSchema);