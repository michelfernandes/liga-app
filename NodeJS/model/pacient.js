const mongoose = require('mongoose');

var Pacient = mongoose.model('Pacient',{
    name: {type: String},
    cpf: {type: String},
    dateOfBirth: {type: Date},
    phoneNumber: {type: String},
    address: {type: String},
    entryDate: {type: Date},
    disease: {type: String}
});

module.exports = { Pacient };