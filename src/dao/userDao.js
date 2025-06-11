const db = require('../connection/Connection');

class UserDao {
    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users WHERE email = ? LIMIT 1';
           
            db.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {if (results.length === 0) {
                    return resolve(null);
                }else
                    resolve(results[0]);
                }
            });
        });
    }

    static addUser(user) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Users (first_name, last_name, full_name, email, password, role, is_approved, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [
                user.first_name,
                user.last_name,
                user.full_name,
                user.email,
                user.password,
                user.role,
                user.is_approved,
                user.created_at
            ];
            db.query(query, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }


    // Cập nhật trạng thái phê duyệt user
// approved = true → duyệt → role = 'Teacher', is_approved = 1
// approved = false → từ chối → role = 'Student', is_approved = 0
static updateApprovalStatus(userId, approved) {
  return new Promise((resolve, reject) => {
    let role = approved ? 'Teacher' : 'Student';
    let isApproved = approved ? 1 : 0;

    const query = `UPDATE users SET role = ?, is_approved = ? WHERE user_id = ?`;
    db.query(query, [role, isApproved, userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

static getUserById(userId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE user_id = ? LIMIT 1';
        db.query(query, [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
    
}
}
module.exports = UserDao;
