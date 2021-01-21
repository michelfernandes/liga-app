const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Patient = require('../model/patient');

// => localhost:3000/patient/
router.get('/', (req, res) => {
    Patient.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error Retriving Patients :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    Patient.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Retriving Patient :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var patient = new Patient({
        name: req.body.name,
        cpf: req.body.cpf,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        entryDate: req.body.entryDate,
        disease: req.body.disease
    });
    patient.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Patient Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var patient = {
        name: req.body.name,
        cpf: req.body.cpf,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        entryDate: req.body.entryDate,
        disease: req.body.disease
    };
    Patient.findByIdAndUpdate(req.params.id, { $set: patient }, { new: true, useFindAndModify: false }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Patient Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Patient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Patient Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;