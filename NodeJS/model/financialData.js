const mongoose = require('mongoose');

let FinancialDataSchema = new mongoose.Schema({
    date: {type: Date},
    type: {type: String},
    value: {type: Number},
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }
});

module.exports = mongoose.model('FinancialData', FinancialDataSchema);;