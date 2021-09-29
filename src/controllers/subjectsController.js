'use strict';
let mongoose = require('mongoose'), Subject = mongoose.model('Subjects');

//Subjects
exports.listAllSubjects = function (req, res) {
    Subject.find({ }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.addSubject = function (req, res) {
    let newSubject = new Subject(req.body);
    newSubject.save(function (err, subjects) {
        if (err)
            res.send(err);
        res.json(subjects);
    });
};


exports.listAllSubjectsByLevel = function (req, res) {
    Subject.find({ level: req.params.level }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.deleteSubject = function (req, res) {
    Subject.remove({
        _id: req.params.subjectCode
    }, function (err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'Subject successfully deleted' });
    });
};