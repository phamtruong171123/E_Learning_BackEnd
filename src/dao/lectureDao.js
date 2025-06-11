const db = require('../connection/Connection');

class LectureDao {
    static create(lecture) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Lectures (course_id, title,description, source_url, open_date,close_date, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                lecture.course_id,
                lecture.title,
                lecture.description,
                lecture.source_url,
                lecture.open_date,
                lecture.close_date,
                lecture.created_at
            ];
            db.query(query, values, (err, results) => {
                if (err) reject(err); // nếu có lỗi thì trả về lỗi
                else resolve(results); // nếu không có lỗi thì trả về kết quả
            });
        });
    }

    static getByCourse(course_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Lectures WHERE course_id = ? ORDER BY created_at DESC`;
            db.query(query, [course_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
}

module.exports = LectureDao;
