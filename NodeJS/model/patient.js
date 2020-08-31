const mongoose = require('mongoose');

var Patient = mongoose.model('Patient',{
    name: {type: String},
    cpf: {type: String},
    dateOfBirth: {type: Date},
    phoneNumber: {type: String},
    address: {type: String},
    entryDate: {type: Date},
    disease: {type: String}
});

module.exports = { Patient };