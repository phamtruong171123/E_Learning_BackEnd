const express = require('express');
const router = express.Router();
const LectureController = require('../controllers/LectureController');
const auth = require('../middleware/auth');
const LectureService = require('../services/lectureService');

// Tạo bài giảng (chỉ giảng viên)
router.post('/createLecture', auth.lecturerOnly, LectureController.createLecture);

// Lấy danh sách bài giảng theo khóa học
router.get('/:course_id',  LectureController.getLecturesByCourse);

module.exports = router;
