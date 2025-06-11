const UserDao = require('../dao/userDao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

class UserService {
    // Đăng ký người dùng
    static async registerUser(userData) {
        const { first_name, last_name, email, password, role } = userData;

        // 
        const existingUser = await UserDao.getUserByEmail(email);
        if (existingUser !== null) {
            throw new Error('Email already exists.');
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Xử lý quyền & duyệt
        let is_approved = true;
       
        if (role === 'Admin' || role === 'Teacher') {
            is_approved = false;
        }

        const newUser = {
            first_name,
            last_name,
            full_name: `${first_name} ${last_name}`,
            email,
            password: hashedPassword,
            role: role || 'Student',
            is_approved,
            created_at: new Date()
        };

        await UserDao.addUser(newUser);
        return { message: `${role || 'Student'} created successfully` };
    }

    // Đăng nhập
    static async loginUser(email, password) {
        const user = await UserDao.getUserByEmail(email);
        

        if (!user) {
            throw new Error('User not found.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect password.');
        }

        if (!user.is_approved) {
            throw new Error('Account not approved.');
        }

        
        if (!process.env.JWT_SECRET) {
            throw new Error('Missing JWT_SECRET in .env');
        }

        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { message: 'Login successful', token };
    }


    // Phê duyệt hoặc từ chối user làm teacher
  static async approveTeacher(userId, approved) {
    try {
      // Kiểm tra user có tồn tại
      const user = await UserDao.getUserById(userId);
      if (!user) {
        return { success: false, message: 'User không tồn tại' };
      }

      // Cập nhật trạng thái phê duyệt
      await UserDao.updateApprovalStatus(userId, approved);

      return {
        success: true,
        message: approved ? 'Đã phê duyệt làm giảng viên' : 'Đã từ chối làm giảng viên'
      };
    } catch (error) {
        console.error('Lỗi approveTeacher:', error);
      return { success: false, message: 'Lỗi hệ thống', error };
    }
  }
}


module.exports = UserService;
