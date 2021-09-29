'use strict';

let mongoose = require('mongoose'), Staff = mongoose.model('Staff');

exports.listStaffs = function (req, res) {
    Staff.find({}, function (err, staff) {
        if (err)
            res.send(err);
        res.json(staff);
    });
};

exports.registerStaff = function (req, res) {
    let new_staff = new Staff(req.body);
    new_staff.save(function (err, staff) {
        if (err)
            res.send(err);
        res.json(staff);
    });
};

exports.readStaff = function (req, res) {
    Staff.find({staffId:req.params.staffId}, function (err, staff) {
        if (err)
            res.send(err);
        res.json(staff);
    });
};


exports.staffAuthentication = function (req, res) {
    Staff.find({email:req.body.email, password:req.body.password}, function (err, staff) {
        if (err)
            res.send(err);
        res.json(staff);
    });
};



