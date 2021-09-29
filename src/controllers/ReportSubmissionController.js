'use strict';
let mongoose = require('mongoose'), ReportSubmission = mongoose.model('ReportSubmissions');

//ReportSubmissions
exports.listAllReportSubmissions = function (req, res) {
    ReportSubmission.find({ }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.addReportSubmission = function (req, res) {
    let newReportSubmission = new ReportSubmission(req.body);
    newReportSubmission.save(function (err, reportSubmissions) {
        if (err)
            res.send(err);
        res.json(reportSubmissions);
    });
};

exports.deleteReportSubmission = function (req, res) {
    ReportSubmission.remove({
        _id: req.params.subjectCode
    }, function (err, subject) {
        if (err)
            res.send(err);
        res.json({ message: 'ReportSubmission successfully deleted' });
    });
};