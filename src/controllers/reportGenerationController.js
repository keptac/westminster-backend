'use strict';

var mongoose = require('mongoose'), StudentMarks = mongoose.model('StudentMarks'), Students = mongoose.model('Students');

var fs = require("fs");
var html_to_pdf = require('html-pdf-node');
const downloadsFolder = require('downloads-folder');
const html = fs.readFileSync(__dirname+"/reportTemplate.html", "utf8");

exports.generateReports= function(_req, res) {
    const folderName = 'public/Westminster Weekly Reports'
    var reportCount = 0;
    var studentReports = [];

    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
    } catch (err) {
        res.send(err);
    }

    Students.find({}, function (err, students) {
        try {
            if (err)
            res.send(err);
        students.forEach(element => {
            StudentMarks.find({studentId: element.studentId}, function(err, _marks) {
                if (err)
                    res.send(err);
            });

            let options = { format: 'A4', path:folderName+'/'+element.name+element.surname+'.pdf', landscape:true};
            let file = { content: html };
            html_to_pdf.generatePdf(file, options).then(_pdfBuffer => {
            });

            studentReports.push({
                studentName: element.name+element.surname,
                reportPath: folderName+'/'+element.name+element.surname+'.pdf'
            })

            reportCount = reportCount + 1;
        });
        res.send(
            {
                'reportsGenerated':reportCount,
                'files': studentReports,
                'success':true
            }
        );
        } catch (error) {
            console.log(error);
            res.send({success:false, message:'Oops, an internal error occured. We are fixing it'});
        }
        
    });
};

// exports.generateReportsToFolder= function(req, res) {
    // const path = downloadsFolder();
    // const folderName = path+'/Westminster Weekly Reports'
    // var reportCount = 0;
    // var studentReports = [];
    
//     try {
//         if (!fs.existsSync(folderName)) {
//             fs.mkdirSync(folderName)
//         }
//     } catch (err) {
//         res.send(err);
//     }

//     Students.find({}, function (err, students) {
//         if (err)
//             res.send(err);
//         students.forEach(element => {
//             StudentMarks.find({studentId: element.studentId}, function(err, marks) {
//                 if (err)
//                     res.send(err);
//             });
//             let options = { format: 'A4', path:folderName+'/'+element.name+element.surname+'.pdf', landscape:true};
//             let file = { content: html };
//             html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//             });

//             studentReports.push({
//                 studentName: element.name+element.surname,
//                 reportPath: folderName+'/'+element.name+element.surname+'.pdf'
//             })
//             reportCount = reportCount + 1;
//         });
//         res.send(
//             {
//                 'reportsGenerated':reportCount,
//                 'files': studentReports,
//                 'success':true
//             }
//         );
//     });
// };
