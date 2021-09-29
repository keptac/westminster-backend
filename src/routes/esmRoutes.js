'use strict';


module.exports = function (app) {

    let announcements = require('../controllers/announcementsController');
    var resources = require('../controllers/resourceController');
    var classes = require('../controllers/classesController');
    var teacherClasses = require('../controllers/teacherClassesController');
    var studentMarks = require('../controllers/studentMarksController');

    var students = require('../controllers/studentController');
    var upload = require('../middleware/upload');
    var uploadFiles = require('../middleware/uploadResources');

    //Batches|Bulk uploads
    app.post('/api/esm/batch-student-registation', upload, students.batchStudentsRegister);

    //Announcement Routes
    app.route('/api/westminster/announcements')
        .get(announcements.list_all_announcements)
        .post(announcements.create_an_announcement);

    app.route('/api/westminster/announcements/:announcementId')
        .get(announcements.read_an_announcement)
        .put(announcements.update_an_announcement)
        .delete(announcements.delete_an_announcement);

    //Student Marks Routes
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
    
        // Classes Routes
    app.route('/api/westminster/class')
        .get(classes.listClasses)
        .post(classes.addClass);

    app.route('/api/westminster/students/:classId')
        .get(classes.deleteClass)








    //Assignments
    app.post('/api/esm/teacher/assignments', uploadFiles, assignments.uploadAssignment);

    app.route('/api/esm/teacher/assignments/subject/:subjectCode')
        .get(assignments.listAssignmentsBySubjectCode);

    app.route('/api/esm/teacher/assignments/:assignmentId')
        .get(assignments.readAssignment)
        .put(assignments.updateAssignment)
        .delete(assignments.deleteAssignment);

    //Learning Resources
    app.post('/api/esm/teacher/resources', uploadFiles, resources.uploadResource);

    app.route('/api/esm/teacher/resources/subject/:subjectCode')
        .get(resources.listResourcesBySubjectCode);

    app.route('/api/esm/teacher/resources/:resourceId')
        .get(resources.readResource)
        .put(resources.updateResource)
        .delete(resources.deleteResource);

    // // Students enrolments to classes
    // app.route('/api/esm/student-enrolment')
    //     .post(studentSubjectEnrolments.enrolForSubject);

    // app.route('/api/esm/student-enrolment/subject/:subjectCode')
    //     .get(studentSubjectEnrolments.listStudentEnrolmentsPerSubject);

    // app.route('/api/esm/student-enrolment/student/:studentId')
    //     .get(studentSubjectEnrolments.listEnrolmentsPerStudent);
        
    // app.route('/api/esm/student-enrolment/:studentEnrolmentId')
    //     .delete(studentSubjectEnrolments.deleteStudentEnrolment);


    //Subjects Routes
    app.route('/api/esm/subjects')
        .get(subjects.listSubjects)
        .post(subjects.createSubject);

    app.route('/api/esm/subjects/teacher/:teacherId')
        .get(subjects.listSubjectsPerTeacher);

    app.route('/api/esm/subjects/:subjectId')
        .get(subjects.readSubject)
        .put(subjects.updateSubject)
        .delete(subjects.deleteSubject);
};