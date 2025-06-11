const UserDAO = require('../dao/userDao');

const GradingService = require('../services/gradingService');

class GradingController {
  static async submit(req, res) {
    try {
      const { exercise_id, student_id, ...payload } = req.body;
     
      const result = await GradingService.submit(exercise_id, student_id, payload);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async gradeEssay(req, res) {
  try {
    const { submission_id, score, comment } = req.body;

    const graded_by = req.user.user_id;

    if (!graded_by) {
      return res.status(401).json({ message: 'Không xác định người chấm bài' });
    }

    const result = await GradingService.gradeEssay(submission_id, {
      score,
      comment,
      graded_by
    });

   
    const userInfo = await UserDAO.getUserById(graded_by); 
    const graded_by_name = userInfo?.full_name || 'Unknown';

    
    res.status(200).json({
      ...result,
      graded_by_teacher: graded_by_name
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

  static async getAverageScoresByLesson(req, res) {
    try {
      const { lecture_id } = req.params;
      const result = await GradingService.getAverageScoresByLesson(lecture_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMyAverageScoreByLecture(req, res) {
  try {
    const { lecture_id } = req.params;
    const student_id = req.user.id; // Lấy từ token

    const avgScore = await GradingService.getAverageScoreByStudentAndLecture(student_id, lecture_id);

    res.status(200).json({
      lecture_id,
      student_id,
      average_score: avgScore
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


  static async getSubmissionDetail(req, res) {
  try {
    const { submission_id } = req.params;
    const result = await GradingService.getSubmissionDetail(submission_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

  static async getUnscoredEssaysByLecture(req, res) {
  try {
    const { lecture_id } = req.params;
    const result = await GradingService.getUnscoredEssaysByLecture(lecture_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


}

module.exports = GradingController;
