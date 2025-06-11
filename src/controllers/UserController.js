const UserService = require('../services/userService');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserDao = require('../dao/userDao');
const db = require('../connection/Connection');

class UserController {
    // Đăng ký người dùng mới
    static async registerUser(req, res) {
        try {
            const userData = req.body;
            const result = await UserService.registerUser(userData);
            res.status(201).json(result); // Created
        } catch (err) {
            // Nếu lỗi do email đã tồn tại
            if (err.message === 'Email already exists.') {
                res.status(409).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'Server error' }); // Internal Error
            }
        }
    }

    // Đăng nhập người dùng
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const result = await UserService.loginUser(email, password);
            res.status(200).json(result); // OK
        } catch (err) {
            if (err.message === 'User not found.') {
                res.status(404).json({ error: err.message }); // Not Found
            } else if (err.message === 'Incorrect password.') {
                res.status(401).json({ error: err.message }); // Unauthorized
            } else if (err.message === 'Account not approved.') {
                res.status(403).json({ error: err.message }); // Forbidden
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    static async approveTeacher(req, res) {
    const userId = req.params.userId;
    const { approved } = req.body; // true hoặc false

    if (typeof approved !== 'boolean') {
      return res.status(400).json({ message: 'Trường approved phải là boolean' });
    }

    const result = await UserService.approveTeacher(userId, approved);
    if (!result.success) {
      return res.status(500).json({ message: result.message, error: result.error });
    }

    res.json({ message: result.message });
  }



// Quên mật khẩu
  static async forgotPassword(req, res) {
    const { email } = req.body;
    
    if (!email) return res.status(400).json({ message: 'Email không được để trống' });

    // Kiểm tra email tồn tại
    const user = await UserDao.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Email không tồn tại' });

    // Tạo mật khẩu tạm thời (8 ký tự)
    const tempPassword = crypto.randomBytes(4).toString('hex');

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Cập nhật mật khẩu mới trong DB
    const updateQuery = 'UPDATE Users SET password = ? WHERE email = ?';
    db.query(updateQuery, [hashedPassword, email], async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
      }

   


      // Cấu hình transporter gửi mail
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Nội dung mail
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Mật khẩu tạm thời của ứng dụng E_learning',
        html: `<p>Mật khẩu tạm thời của bạn là: <b>${tempPassword}</b></p>
               <p>Vui lòng đăng nhập và đổi mật khẩu mới ngay.</p>`
      };

      // Gửi mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Gửi mail thất bại' });
        }
        res.json({ message: 'Mật khẩu tạm thời đã được gửi vào email của bạn' });
      });
    });
  }

  // Đổi mật khẩu
 static async resetPassword(req, res) {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Thiếu email, mật khẩu cũ hoặc mật khẩu mới' });
  }

  try {
    // Lấy user theo email
    const user = await UserDao.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Email không tồn tại' });

    // So sánh mật khẩu cũ (oldPassword) với mật khẩu đã mã hóa trong DB
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
    }

    // Kiểm tra nếu mật khẩu mới trùng với mật khẩu cũ
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({ message: 'Mật khẩu mới không được trùng với mật khẩu cũ' });
    }

    // Hash mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới trong DB
    const updateQuery = 'UPDATE Users SET password = ? WHERE email = ?';
    db.query(updateQuery, [hashedNewPassword, email], (err) => {
      if (err) {
        console.error('Lỗi cập nhật mật khẩu mới:', err);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
      }

      res.json({ message: 'Đổi mật khẩu thành công' });
    });
  } catch (error) {
    console.error('Lỗi resetPassword:', error);
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
}

}







module.exports = UserController;
