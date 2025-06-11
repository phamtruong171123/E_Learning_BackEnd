const db = require('../../connection/Connection');

const EssayDAO = {
  create: (data, callback) => {
    const { exercise_id, max_word_count, file_path } = data; // Các trường cần thiết
   
    const sql = `INSERT INTO Essay (exercise_id, max_word_count, file_path) VALUES (?, ?, ?)`;

    db.query(sql, [exercise_id, max_word_count, file_path], callback);
  },
  getByExerciseId: (exercise_id) => {
    
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Essay WHERE exercise_id = ?",
        [exercise_id],
        (err, results) => {
          if (err) {
            console.error("Error fetching essay by exercise_id:", err);
            reject(err); // Reject Promise với lỗi
          }

          if (results.length === 0) {
            reject(new Error("No essay found for exercise_id"));
          } else {
           
            resolve(results); // Resolve Promise với kết quả
          }
        }
      );
    });
  },
  deleteByExerciseId: (exercise_id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM Essay WHERE exercise_id = ?", [exercise_id], (err, results) => {
        if (err) {
          console.error("Error deleting essay by exercise_id:", err);
          reject(err); // Reject Promise với lỗi
        } else {
          resolve(results); // Resolve Promise với kết quả
        }
      });
    });
  },
  update:(id,data) => {
    const { max_word_count, file_path } = data; // Các trường cần thiết
    const sql = `
        UPDATE Essay
        SET max_word_count = ?, file_path = ?
        WHERE essay_id = ?
    `;
    db.query(sql, [max_word_count, file_path, id], (err, result) => {
        if (err) {
            console.error('Error during UPDATE Essay:', err);
            return callback(err);
        }
        callback(null, result);  // Trả về kết quả
    });
    }
};
module.exports = EssayDAO;
