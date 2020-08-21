const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Pacient } = require('../model/pacient');

// => localhost:3000/pacient/
router.get('/', (req, res) => {
    Pacient.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error Retriving Pacients :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Pacient.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Retriving Pacient :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var pacient = new Pacient({
        name: req.body.name,
        cpf: req.body.cpf,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        entryDate: req.body.entryDate,
        disease: req.body.disease
    });
    pacient.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Pacient Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var pacient = new Pacient({
        name: req.body.name,
        cpf: req.body.cpf,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        entryDate: req.body.entryDate,
        disease: req.body.disease
    });
    Pacient.findByIdAndUpdate(req.params.id, { $set: pacient }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Pacient Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Pacient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Pacient Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;