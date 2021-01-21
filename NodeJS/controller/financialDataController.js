const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var FinancialData = require('../model/financialData');

// => localhost:3000/financialData/
router.get('/', (req, res) => {
    FinancialData.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error Retriving FinancialData :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:patientId', (req, res) => {
    if (!ObjectId.isValid(req.params.patientId))
        return res.status(400).send(`No record with given id : ${req.params.patientId}`);

    FinancialData.find({patient: req.params.patientId}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Retriving FinancialData :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:patientId/:year', (req, res) => {
    if (!ObjectId.isValid(req.params.patientId))
        return res.status(400).send(`No record with given id : ${req.params.patientId}`);

    FinancialData.find({
        patient: req.params.patientId,
        date: {
            $gte: new Date(req.params.year, 1, 1), 
            $lt: new Date(req.params.year, 12, 31)
        }
    }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error Retriving FinancialData :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id : ${req.params.id}`);

    var financialData = new FinancialData({
        date: req.body.date,
        type: req.body.type,
        value: req.body.value,
        patient: req.params.id
    });
    financialData.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error FinancialData Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var financialData = {
        date: req.body.date,
        type: req.body.type,
        value: req.body.value,
        patient: req.params.id
    };
    FinancialData.findByIdAndUpdate(req.params.id, { $set: financialData }, { new: true, useFindAndModify: false }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error FinancialData Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    FinancialData.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error FinancialData Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;