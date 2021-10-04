'use strict';


module.exports = function (app) {
    var announcements = require('../controllers/announcementsController');
    var classes = require('../controllers/classesController');
    var subjects = require('../controllers/subjectsController');
    var submissions = require('../controllers/ReportSubmissionController');
    var teacherClasses = require('../controllers/teacherClassesController');
    var studentMarks = require('../controllers/studentMarksController');
    var reportGeneration = require('../controllers/reportGenerationController');
    var students = require('../controllers/studentController');
    var staff = require('../controllers/staffContoller');
    var upload = require('../middleware/upload');

    //Batches|Bulk uploads
    // app.route('/',).get('Welcome to westmunster')
    app.post('/api/esm/batch-student-registation', upload, students.batchStudentsRegister);

    app.route('/api/westminster/studentMarks/reportgeneration')
        .get(reportGeneration.generateReports);

    //Announcement Routes
    app.route('/api/westminster/announcements')
        .get(announcements.list_all_announcements)
        .post(announcements.create_an_announcement);

    app.route('/api/westminster/announcements/:announcementId')
        .get(announcements.read_an_announcement)
        .put(announcements.update_an_announcement)
        .delete(announcements.delete_an_announcement);

    //Student Marks Routes
    app.route('/api/westminster/studentMarks')
        .post(studentMarks.submitMarks);

    app.route('/api/westminster/studentMarks/class/:classId')
        .get(studentMarks.listStudentMarksByClassId);

    app.route('/api/westminster/studentMarks/student/:studentId')
        .get(studentMarks.studentMarksForStudent);

    app.route('/api/westminster/studentMarks/:submissionId')
        .delete(studentMarks.deleteStudentMarks);

    //Subjects Routes
    app.route('/api/westminster/teacherClasses')
        .get(teacherClasses.listTeacherClasses)
        .post(teacherClasses.createTeacherClass);

    app.route('/api/westminster/teacherClasses/teacher/:teacherId')
        .get(teacherClasses.listTeacherClassPerTeacher);

    app.route('/api/westminster/teacherClasses/:classId')
        .get(teacherClasses.readTeacherClass)
        .delete(teacherClasses.deleteTeacherClass);

    // Student Routes
    app.route('/api/westminster/students')
        .get(students.listStudents)
        .post(students.registerStudent);

    app.route('/api/westminster/students/:studentId')
        .get(students.readStudent)
    
    app.route('/api/westminster/students/class/:classId')
        .get(students.listStudentsPerClass)
    
    // Classes Routes
    app.route('/api/westminster/class')
        .get(classes.listClasses)
        .post(classes.addClass);

    app.route('/api/westminster/class/:classId')
        .delete(classes.deleteClass)

    // Subjects Routes
    app.route('/api/westminster/subjects')
        .get(subjects.listAllSubjects)
        .post(subjects.addSubject);

    app.route('/api/westminster/students/:subjectCode')
        .get(subjects.deleteSubject)

    // Report Submission Routes
    app.route('/api/westminster/reportsubmissions')
        .get(submissions.listAllReportSubmissions)
        .post(submissions.addReportSubmission);
    
    app.route('/api/westminster/reportsubmissions/teacherSubmissionStatus/:teacherId/:subjectCode')
        .get(submissions.checkSubmissionStatus)

    app.route('/api/westminster/students/:classId')
        .get(submissions.deleteReportSubmission)

    // Staff Routes
    app.route('/api/westminster/staff')
        .get(staff.listStaffs)
        .post(staff.registerStaff);
    
    app.route('/api/westminster/staff/:staffId')
        .get(staff.readStaff)

    app.route('/api/westminster/staff/authenticate')
        .post(staff.staffAuthentication);

};
