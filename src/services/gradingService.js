

const SubmissionDao = require('../dao/submissionDao');
const QuizDao = require("../dao/exercise/quizDao");
const ExerciseDao = require('../dao/exercise/exerciseDao');
const moment = require('moment');

class GradingService {
  // Nộp bài (quiz hoặc essay)
  static async submit(exercise_id, student_id, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        
        const exercise = await ExerciseDao.getById(exercise_id);
        const now = moment();

        if (!exercise) return reject(new Error('Bài tập không tồn tại'));
        if (exercise.deadline && moment(exercise.deadline).isBefore(now)) {
          return reject(new Error('Đã quá hạn nộp bài'));
        }

        const submissionData = {
          exercise_id,
          student_id,
          submit_time: now.format('YYYY-MM-DD HH:mm:ss'),
          score: null,
          answers: null,
          file_path: null,
          text_answer: null,
          comment: null,
          graded_by: null,
          grade_time: null
        };
        // auto chấm bài quiz
        if (exercise.type === 'quiz') {
          const quiz = await QuizDao.getByExerciseId(exercise_id);
          const studentAnswer = payload.answer?.trim();
          const correctAnswer = quiz.correct_answer?.trim();

          submissionData.answers = JSON.stringify({ answer: studentAnswer });
          submissionData.score = (studentAnswer && studentAnswer === correctAnswer) ? 10 : 0;
  
        } else if (exercise.type === 'essay') {

          submissionData.text_answer = payload.text_answer || null;
          submissionData.file_path = payload.file_path || null;
        }

        const submissionId = await SubmissionDao.createOrUpdate(submissionData);

        resolve({
          message: 'Nộp bài thành công',
          submission_id: submissionId,
          score: submissionData.score
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  static async getSubmissionDetail(submission_id) {
  const submission = await SubmissionDao.getSubmissionDetailById(submission_id);

  if (submission.type === 'quiz') {
    const quiz = await QuizDao.getByExerciseId(submission.exercise_id);
    const studentAnswer = JSON.parse(submission.answers || '{}').answer;

    return {
      type: 'quiz',
      question_text: submission.question_text,
      question_number: submission.question_number,
      correct_answer: quiz.correct_answer,
      student_answer: studentAnswer,
      options: JSON.parse(quiz.options),
      score: submission.score,
      graded_by: submission.graded_by_name,
      comment: submission.comment,
      submit_time: submission.submit_time
    };
  }

  if (submission.type === 'essay') {
    return {
      type: 'essay',
      question_text: submission.question_text,
      text_answer: submission.text_answer,
      file_path: submission.file_path,
      score: submission.score,
      graded_by: submission.graded_by_name,
      comment: submission.comment,
      submit_time: submission.submit_time
    };
  }

  throw new Error('Loại bài tập không được hỗ trợ');
}



  // Giảng viên chấm bài tự luận
  static async gradeEssay(submission_id, { score, comment, graded_by }) {
    return new Promise(async (resolve, reject) => {
      try {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');

        await SubmissionDao.updateScoreAndComment(submission_id, {
          score,
          comment,
          graded_by,
          grade_time: now
        });

        resolve({
          message: 'Chấm bài thành công',
          submission_id,
          score
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Tính điểm trung bình của mọi sinh viên theo bài giảng (lecture)
  static async getAverageScoresByLesson(lecture_id) {
    return SubmissionDao.getAverageScoresByLesson(lecture_id);
  }
// Lấy điểm trung bình của sinh viên theo bài giảng
  static async getAverageScoreByStudentAndLecture(student_id, lecture_id) {
  return SubmissionDao.getAverageScoreByLectureAndStudent(student_id, lecture_id);
}

// Lấy danh sách bài nộp chưa được chấm điểm của sinh viên theo bài giảng
static async getUnscoredEssaysByLecture(lecture_id) {
  return SubmissionDao.getUnscoredEssaysByLecture(lecture_id);
}

}

module.exports = GradingService;
