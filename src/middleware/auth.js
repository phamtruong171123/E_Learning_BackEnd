const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const db = require('../connection/Connection');

//  Middleware: Bất kỳ user đã đăng nhập
exports.anyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Không có token' });

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = {
      id: decoded.user_id || decoded.id,
      role: decoded.role,
      user_id: decoded.user_id 
    };

    if (!req.user.id) {
      return res.status(400).json({ error: 'Token không chứa user_id' });
    }

    next();
  } catch (err) {
    console.error(' Token verify failed:', err.message);
    res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

//  Chỉ cho giảng viên, và nếu có class_id → kiểm tra quyền
exports.lecturerOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Thiếu token' });

  try {
    const decoded = jwt.verify(token, SECRET);

    if (decoded.role !== 'Teacher') {
      return res.status(403).json({ error: 'Chỉ giảng viên mới được phép' });
    }

    req.user = req.user || {};
    req.user.id = decoded.user_id;
    req.user.role = decoded.role;
    req.user.user_id = decoded.user_id;

    const class_id = req.body.class_id || req.params.class_id;
    if (!class_id) return next(); 

    // Nếu có class_id → kiểm tra quyền sở hữu lớp
    const sql = `SELECT * FROM classes WHERE class_id = ? AND lecturer_id = ? LIMIT 1`;
    db.query(sql, [class_id, decoded.user_id], (err, results) => {
      if (err) {
        console.error(' Lỗi kiểm tra lớp:', err);
        return res.status(500).json({ error: 'Lỗi kiểm tra quyền lớp học' });
      }

      if (results.length === 0) {
        return res.status(403).json({ error: 'Bạn không được phép quản lý lớp này' });
      }

      next();
    });
  } catch (err) {
    console.error(' Token verify failed:', err.message);
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn', detail: err.message });
  }

};
//  Chỉ cho admin
  exports.adminOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Thiếu token' });

  try {
    const decoded = jwt.verify(token, SECRET);

    if (decoded.role !== 'Admin') {
      return res.status(403).json({ error: 'Chỉ Admin mới được phép truy cập' });
    }

    req.user = {
      id: decoded.user_id || decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    console.error(' Token verify failed:', err.message);
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

