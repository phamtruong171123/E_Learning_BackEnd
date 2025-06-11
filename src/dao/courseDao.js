const db = require('../connection/Connection');

class CourseDao {
    static async create(course) {
        const sql = `
            INSERT INTO courses (title, description, category, thumbnail, created_at)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            course.title,
            course.description,
            course.category,
            course.thumbnail,
            course.created_at
        ];
        return new Promise((resolve, reject) =>
            db.query(sql, values, (err, result) =>
                err ? reject(err) : resolve(result.insertId)
            )
        );
    }
    static async getAll() {
        return new Promise((resolve, reject) =>
            db.query(`SELECT * FROM courses ORDER BY created_at DESC`, (err, results) =>
                err ? reject(err) : resolve(results)
            )
        );
    }


    static getByLecturer(lecturer_id) {
        return new Promise((resolve, reject) =>
            db.query(`SELECT * FROM Courses WHERE lecturer_id = ? ORDER BY created_at DESC`, [lecturer_id], (err, res) => err ? reject(err) : resolve(res))
        );
    }

    static getById(course_id) {
        return new Promise((resolve, reject) =>
            db.query(`SELECT * FROM Courses WHERE course_id = ?`, [course_id], (err, res) => err ? reject(err) : resolve(res[0]))
        );
    }

    static async update(course_id, course) {
        const sql = `
            UPDATE courses SET title = ?, description = ?, category = ?, thumbnail = ?
            WHERE course_id = ?
        `;
        const values = [
            course.title,
            course.description,
            course.category,
            course.thumbnail,
            course_id
        ];
        return new Promise((resolve, reject) =>
            db.query(sql, values, (err, result) =>
                err ? reject(err) : resolve(result.affectedRows)
            )
        );
    }

    static delete(course_id) {
        return new Promise((resolve, reject) =>
            db.query(`DELETE FROM Courses WHERE course_id = ?`, [course_id], (err, result) => err ? reject(err) : resolve(result))
        );
    }
}

module.exports = CourseDao;
