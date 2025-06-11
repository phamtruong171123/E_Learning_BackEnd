const db= require('../connection/Connection')

class ClassDao {
    static async create(classData) {
        const sql='INSERT INTO classes ( course_id ,lecturer_id, start_date, end_date) VALUES (?, ?, ?, ?)';
        const params = [classData.course_id, classData.lecturer_id, classData.start_date, classData.end_date];
        return new Promise((resolve, reject) => {
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.error('Error creating class:', err);
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static async getByCourse(course_id){
        const sql='SELECT * FROM classes WHERE course_id = ? ORDER BY start_date DESC';
        return new Promise((resolve, reject) => {
            db.query(sql, [course_id], (err, result) => {
                if (err) {
                    console.error('Error getting classes by course:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getById(class_id){
        const sql='SELECT * FROM classes WHERE class_id = ?';
        return new Promise((resolve, reject) => {
            db.query(sql, [class_id], (err, result) => {
                if (err) {
                    console.error('Error getting class by ID:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async update(class_id, classData) {
        const sql =
          "UPDATE classes SET  course_id = ?,lecturer_id = ?,  start_date = ?, end_date = ? WHERE class_id = ?";
        const params = [classData.course_id,classData.lecturer_id ,classData.start_date, classData.end_date];
        return new Promise((resolve, reject) => {
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.error('Error updating class:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });}


        static async delete(class_id) {
            const sql='DELETE FROM classes WHERE class_id = ?';
            return new Promise((resolve, reject) => {
                db.query(sql, [class_id], (err, result) => {
                    if (err) {
                        console.error('Error deleting class:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }  
        
        static async getByLecturer(lecturer_id) {
            const sql='SELECT * FROM classes WHERE lecturer_id = ?';
            return new Promise((resolve, reject) => {
                db.query(sql, [lecturer_id], (err, result) => {

                   
                    if (err) {
                        console.error('Error getting classes by lecturer:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
        static async getStudentsInClass(class_id) {
  const sql = `SELECT * FROM v_students_in_class WHERE class_id = ?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [class_id], (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
}

}

module.exports = ClassDao;