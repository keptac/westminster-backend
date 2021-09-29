const express = require('express');
require('dotenv').config();

var app = express(), port = process.env.PORT, mongoose = require('mongoose');

//Register Models
const assignment = require('./src/models/assignmentModel');
const announcement = require('./src/models/AnnouncementsModel');
const resources = require('./src/models/ResourcesModel'); 
const student = require('./src/models/StudentModel');
const studentEnrolment = require('./src/models/StudentEnrolment');
const subject = require('./src/models/SubjectModel'); 
const submissions = require('./src/models/SubmissionsModel');
const multiplchoice = require('./src/models/MultipleChoiceModel');
const onlineApplicaiton = require('./src/models/OnlineApplicationModel');
const multer = require('multer');
global.__basedir = __dirname;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

//register the route
var routes = require('./src/routes/esmRoutes');
routes(app); 

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('Westminster api server started on: ' + port);