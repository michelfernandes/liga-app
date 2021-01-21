const { Schema } = require('mongoose');
const mongoose = require('mongoose');

let PatientSchema = new mongoose.Schema({
    name: {type: String},
    cpf: {type: String},
    dateOfBirth: {type: Date},
    phoneNumber: {type: String},
    address: {type: String},
    entryDate: {type: Date},
    disease: {type: String}
});

module.exports = mongoose.model('Patient',PatientSchema);