'use strict';

var mongoose = require('mongoose'), StudentMarks = mongoose.model('StudentMarks');

exports.listStudentMarksByClassId= function(req, res) {
    StudentMarks.find({classId: req.params.classId}, function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

exports.studentMarksForStudent = function(req, res) {
    StudentMarks.find({studentId: req.params.studentId}, function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

//Students submits the Assignment - student function
exports.submitMarks = function(req, res) {
    var new_submission = new StudentMarks(req.body);
    new_submission.save(function(err, submission) {
        if (err)
            res.send(err);
        res.json(submission);
    });
};

exports.deleteStudentMarks = function(req, res) {
    StudentMarks.remove({
        _id: req.params.submissionId
    }, function(err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'StudentMarks successfully deleted' });
    });
};





