// Student.js
const User = require('./User');

class Student extends User {
    constructor(user_id, first_name, last_name, email, password) {
        super(user_id, first_name, last_name, email, password);
        this.is_approved = true;
        
    }

    viewGrades() {
        // Hiển thị điểm số của sinh viên
        console.log(`${this.full_name} đang xem điểm số...`);
    }

    enrollInCourse(course) {
        // Đăng ký khóa học
        console.log(`${this.full_name} đã đăng ký khóa học: ${course.title}`);
    }

    submitAssignment(assignment) {
        // Nộp bài tập
        console.log(`${this.full_name} đã nộp bài tập: ${assignment.assignment_id}`);
    }


    viewCourse(course) {
        // Xem thông tin khóa học
        console.log(`${this.full_name} đang xem khóa học: ${course.title}`);
    }           
}
module.exports = Student;
