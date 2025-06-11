// Admin.js
const User = require('./User');

class Admin extends User {
    constructor(user_id, first_name, last_name, email, password) {
        super(user_id, first_name, last_name, email, password);
    }

    approveUser(user) {
        // Phê duyệt người dùng
        console.log(`${this.full_name} đã phê duyệt tài khoản cho ${user.full_name}`);
    }

    manageUsers() {
        // Quản lý người dùng
        console.log(`${this.full_name} đang quản lý người dùng...`);
    }

    manageCourses(course) {
        // Quản lý khóa học
        console.log(`${this.full_name} đang quản lý khóa học: ${course.title}`);
    }
}

module.exports = Admin;
