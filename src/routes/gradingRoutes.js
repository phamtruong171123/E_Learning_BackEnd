const express = require('express');
const router = express.Router();
const GradingController = require('../controllers/GradingController');
const auth = require("../middleware/auth");

// Nộp bài (quiz hoặc essay)
router.post('/submit', GradingController.submit);

// Giảng viên chấm điểm bài essay
router.post('/grade-essay',auth.lecturerOnly, GradingController.gradeEssay);

// Xem điểm trung bình theo bài giảng
router.get('/lesson/:lecture_id/average', GradingController.getAverageScoresByLesson);

// Xem điểm trung bình của tôi theo bài giảng
router.get('/average/my/:lecture_id', auth.anyUser, GradingController.getMyAverageScoreByLecture);

// Xem chi tiết bài nộp
router.get('/submission/:submission_id', auth.anyUser, GradingController.getSubmissionDetail);

// Lấy danh sách bài chưa chấm theo bài giảng
router.get('/unscored-essays/:lecture_id',auth.lecturerOnly, GradingController.getUnscoredEssaysByLecture);


module.exports = router;
