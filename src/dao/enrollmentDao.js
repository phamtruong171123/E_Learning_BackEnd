const db = require('../connection/Connection');
const EnrollmentModel = require('../models/enrollment/Enrollment');

class EnrollmentDao {
  static async isEnrolled(user_id, class_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM enrollment WHERE user_id = ? AND class_id = ? LIMIT 1`;
      db.query(sql, [user_id, class_id], (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });
  }

  static async enroll(user_id, class_id, status = 'Pending') {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO enrollment (user_id, class_id, status) VALUES (?, ?, ?)`;
      db.query(sql, [user_id, class_id, status], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  }

  static async unenroll(user_id, class_id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM enrollment WHERE user_id = ? AND class_id = ?`;
      db.query(sql, [user_id, class_id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static async updateStatus(enrollment_id, status) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE enrollment SET status = ? WHERE enrollment_id = ?`;
      db.query(sql, [status, enrollment_id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      });
    });
  }


  static async getEnrolledClasses(user_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT c.*, e.status FROM classes c
         JOIN enrollment e ON c.class_id = e.class_id
         WHERE e.user_id = ? AND e.status = 'Approved'`,
        [user_id],
        (err, results) => err ? reject(err) : resolve(results)
      );
    });
  }
  static async getEnrollmentById(enrollment_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM enrollment WHERE enrollment_id = ?`,
        [enrollment_id],
        (err, results) => err ? reject(err) : resolve(results[0])
      );
    });
  }
}

module.exports = EnrollmentDao;
