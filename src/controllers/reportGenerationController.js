'use strict';

var mongoose = require('mongoose'), StudentMarks = mongoose.model('StudentMarks'), Students = mongoose.model('Students');

var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync(__dirname+"/reportTemplate.html", "utf8");


// const readFIle = path => {
//   fs.readFile(__dirname + path, "utf8", (err, data) => {
//     if (err) {
//       console.log(err.stack);

//       return;
//     }
//     console.log(data.toString());
//   });
//   console.log("Program Ended");
// };


var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'

        }
    }
};

var users = [
    {
        name: "Shyam",
        age: "26",
    },
    {
        name: "Navjot",
        age: "26",
    },
    {
        name: "Vitthal",
        age: "26",
    },
];
var document = {
    html: html,
    data: {
        users: users,
    },
    path: "./output.pdf",
    type: "",
};

exports.generateReports= function(req, res) {
    pdf.create(document, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });

    // var students = [];
    // Students.find({}, function (err, student) {
    //     if (err)
    //         res.send(err);
    //     students = student;
    // });

    // students.forEach(element => {
    //     StudentMarks.find({studentId: element.studentId}, function(err, marks) {
    //         if (err)
    //             res.send(err);
    //         console.log(marks);
    //     });
    // });
};
