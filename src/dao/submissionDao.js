

const db = require('../connection/Connection');

class SubmissionDao {
  // Tạo mới 1 bài nộp (submission) hoặc cập nhật nếu đã tồn tại
  static async createOrUpdate(submission) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO submissions 
      (exercise_id, student_id, submit_time, answers, score, file_path, text_answer, comment, graded_by, grade_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        submit_time = VALUES(submit_time),
        answers = VALUES(answers),
        score = VALUES(score),
        file_path = VALUES(file_path),
        text_answer = VALUES(text_answer),
        comment = VALUES(comment),
        graded_by = VALUES(graded_by),
        grade_time = VALUES(grade_time)
    `;

    const values = [
      submission.exercise_id,
      submission.student_id,
      submission.submit_time,
      submission.answers,
      submission.score,
      submission.file_path,
      submission.text_answer,
      submission.comment,
      submission.graded_by,
      submission.grade_time
    ];

    db.query(query, values, (err, results) => {
      if (err) reject(err);
      else resolve(results.insertId || results.insertId === 0 ? results.insertId : true); // true nếu update
    });
  });
}



 static async getSubmissionDetailById(submission_id) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT s.*, e.type, e.title, e.question_text, u.full_name AS graded_by_teacher
      FROM submissions s
      JOIN exercises e ON s.exercise_id = e.exercise_id
      LEFT JOIN users u ON s.graded_by = u.user_id
      WHERE s.submission_id = ?
    `;
    db.query(query, [submission_id], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return reject(new Error('Không tìm thấy bài nộp'));
      resolve(results[0]);
    });
  });
}

  // Cập nhật điểm và nhận xét cho bài essay
  static async updateScoreAndComment(submission_id, { score, comment, graded_by, grade_time }) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE submissions
        SET score = ?, comment = ?, graded_by = ?, grade_time = ?
        WHERE submission_id = ?`;

      const values = [score, comment, graded_by, grade_time, submission_id];
      
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  }

  // Lấy điểm trung bình của tất cả sinh viên trong 1 bài giảng
  static async getAverageScoresByLesson(lecture_id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT s.student_id, ROUND(AVG(s.score), 2) AS average_score
        FROM submissions s
        JOIN exercises e ON s.exercise_id = e.exercise_id
        WHERE e.lecture_id = ?
        GROUP BY s.student_id`;

      db.query(query, [lecture_id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

// Lấy điểm trung bình của 1 sinh viên trong 1 bài giảng
  static async getAverageScoreByLectureAndStudent(student_id, lecture_id) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT AVG(s.score) AS average_score
      FROM submissions s
      JOIN exercises e ON s.exercise_id = e.exercise_id
      WHERE s.student_id = ? AND e.lecture_id = ?
    `;

    db.query(query, [student_id, lecture_id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0].average_score || 0);
    });
  });
}


// Lấy bài chưa chấm theo bài giảng
static async getUnscoredEssaysByLecture(lecture_id) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.submission_id,
        s.student_id,
        u.full_name,
        s.exercise_id,
        e.title AS exercise_title,
        s.text_answer,
        s.file_path,
        s.submit_time
      FROM submissions s
      JOIN exercises e ON s.exercise_id = e.exercise_id
      JOIN users u ON s.student_id = u.user_id
      WHERE e.lecture_id = ?
        AND e.type = 'essay'
        AND s.score IS NULL
      ORDER BY s.submit_time DESC
    `;
    db.query(query, [lecture_id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}



}

module.exports = SubmissionDao;
