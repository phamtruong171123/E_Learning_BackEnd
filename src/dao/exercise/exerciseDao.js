const db = require('../../connection/Connection');

const ExerciseDAO = {
  // Tạo bài tập mới
  create: (data) => {
    const { lecture_id, title, description, type, deadline, question_number, question_text } = data;
    const sql = `
      INSERT INTO Exercises (lecture_id, title, description, type, deadline, question_number, question_text)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [lecture_id, title, description, type, deadline, question_number, question_text], (err, result) => {
        if (err) {
          console.error('Error during INSERT into Exercises:', err);
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },

  // Lấy bài tập theo ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Exercises WHERE exercise_id = ?', [id], (err, results) => {
       
        if (err) {
          console.error('Error fetching exercise by ID:', err);
          return reject(err);
        }
        if (results.length === 0) {
          return reject(new Error('No exercise found with the given ID'));
        }
        resolve(results[0]);
      });
    });
  },

  // Lấy danh sách bài tập theo bài giảng
  getByLecture: (lecture_id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Exercises WHERE lecture_id = ? ORDER BY created_at DESC', [lecture_id], (err, results) => {
        if (err) {
          console.error('Error fetching exercises by lecture_id:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  // Cập nhật bài tập
  update: (id, data) => {
    const { title, description, type, deadline, question_number, question_text } = data;

    const sql = `
      UPDATE Exercises
      SET title = ?, description = ?, type = ?, deadline = ?, question_number = ?, question_text = ?
      WHERE exercise_id = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [title, description, type, deadline, question_number, question_text, id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Xóa bài tập
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Exercises WHERE exercise_id = ?', [id], (err, results) => {
        if (err) {
          console.error('Error deleting exercise by ID:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
};

module.exports = ExerciseDAO;