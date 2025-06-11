
// User.js
class User {
    constructor(user_id, first_name, last_name, email, password, is_approved = false) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.full_name = `${first_name} ${last_name}`;
        this.email = email;
        this.password = password;
        this.is_approved = is_approved;
        this.created_at = new Date();
    }

    login() {
        // Kiểm tra thông tin đăng nhập
        console.log(`${this.email} đang đăng nhập...`);
    }

    register() {
        // Đăng ký tài khoản
        console.log(`Tạo tài khoản cho ${this.full_name}`);
    }

    updateProfile() {
        // Cập nhật thông tin cá nhân
        console.log(`Cập nhật thông tin cho ${this.full_name}`);
    }
}

module.exports = User;
