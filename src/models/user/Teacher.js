// Teacher.js
const User = require('./User');

class Teacher extends User {
    constructor(user_id, first_name, last_name, email, password) {
        super(user_id, first_name, last_name, email, password);
    }

    createCourse(course) {
        // Tạo khóa học mới
        console.log(`${this.full_name} đã tạo khóa học: ${course.title}`);
    }

    createLecture(lecture) {
        // Tạo bài giảng mới
        console.log(`${this.full_name} đã tạo bài giảng: ${lecture.title}`);
    }

    gradeAssignments(submission) {
        // Chấm điểm bài tập
        console.log(`${this.full_name} đang chấm điểm bài nộp: ${submission.submission_id}`);
    }
}

module.exports = Teacher;
