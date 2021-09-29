'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({

  subjectCode: {
        type: String,
        required: 'Kindly enter the subject Code'
    },

    level: {
        type: String,
        required: 'Kindly enter the level'
    },

    subjectName: {
        type: String,
        required: 'Kindly enter the subject name'
    },

    created_At: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Subjects', SubjectSchema);