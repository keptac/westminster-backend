'use strict';
let mongoose = require('mongoose'), Classes = mongoose.model('Classes');

//Classes
exports.listClasses = function (req, res) {
    console.log("Returning classes");
    Classes.find({ }, function (err, assignment) {
        if (err)
            res.send(err);
        res.json(assignment);
    });
};

exports.addClass = function (req, res) {
    let newClass = new Classes(req.body);
    newClass.save(function (err, classes) {
        if (err)
            res.send(err);
        res.json(classes);
    });
};

exports.deleteClass = function (req, res) {
    Classes.remove({
        classId: req.params.classId
    }, function (err, classes) {
        if (err)
            res.send(err);
        res.json({ message: 'Classes successfully deleted' });
    });
};