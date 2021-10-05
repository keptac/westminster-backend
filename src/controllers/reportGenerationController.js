'use strict';

var mongoose = require('mongoose'), StudentMarks = mongoose.model('StudentMarks'), Students = mongoose.model('Students');

var fs = require("fs");
var html_to_pdf = require('html-pdf-node');
const downloadsFolder = require('downloads-folder');
const html = fs.readFileSync(__dirname+"/reportTemplate.html", "utf8");
// const path = downloadsFolder();

var reportCount = 0;

exports.generateReports= function(req, res) {
    const folderName = req.param.path+'/Westminster Weekly Reports'
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
       res.send(err);
    }

    Students.find({}, function (err, students) {
        if (err)
            res.send(err);
        students.forEach(element => {
            StudentMarks.find({studentId: element.studentId}, function(err, marks) {
                if (err)
                    res.send(err);
            });
            let options = { format: 'A4', path:folderName+'/'+element.name+element.surname+'.pdf', landscape:true};
            let file = { content: html };
            html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            });
            reportCount = reportCount + 1;
        });
        res.send(
            {
                'reportsGenerated':reportCount,
                'message':'Reports generated successfully. You can find them at '+folderName,
                'success':true
            }
        );
    });


};
