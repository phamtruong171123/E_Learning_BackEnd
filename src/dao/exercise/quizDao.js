const db = require('../../connection/Connection');
const { getByExerciseId } = require('./essayDao');

const QuizDAO = {
    create: (data, callback) => {
        const { exercise_id, options, correct_answer } = data;
        const sql = `
            INSERT INTO Quiz (exercise_id, options, correct_answer)
            VALUES (?, ?, ?)
        `;

    
        // Kiểm tra nếu exercise_id đã tồn tại trong bảng Essay

        // Chuyển options sang JSON string trước khi lưu vào cơ sở dữ liệu
        db.query(sql, [exercise_id, JSON.stringify(options), correct_answer], callback);
    },

    getByExerciseId: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Quiz WHERE exercise_id = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error fetching quiz by exercise_id:', err);
                    reject(err);  // Reject Promise với lỗi
                }

                if (results.length === 0) {
                    reject(new Error('No quiz found for exercise_id'));
                } else {
                  
                    resolve(results[0]);  // Resolve Promise với kết quả
                }
            });
        });
    },
    update: (id, data, callback) => {
        const { options, correct_answer } = data;
        const sql = `
            UPDATE Quiz
            SET options = ?, correct_answer = ?
            WHERE quiz_id = ?
        `;
        db.query(sql, [JSON.stringify(options), correct_answer, id], callback);
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM Quiz WHERE quiz_id = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error deleting quiz by id:', err);
                    reject(err);  // Reject Promise với lỗi
                } else {
                    resolve(results);  // Resolve Promise với kết quả
                }
            });
        });
    },

    getCorrectAnswer: (exercise_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT correct_answer FROM Quiz WHERE exercise_id = ?', [exercise_id], (err, results) => {
                if (err) {
                    console.error('Error fetching correct answer:', err);
                    reject(err);  // Reject Promise với lỗi
                } else if (results.length === 0) {
                    reject(new Error('No quiz found for exercise_id'));
                } else {
                    resolve(results[0].correct_answer);  // Resolve Promise với kết quả
                }
            });
        });
    }
};

module.exports = QuizDAO;
