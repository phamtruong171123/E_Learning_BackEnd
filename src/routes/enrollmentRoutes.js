const express = require('express');
const router = express.Router();
const EnrollmentController = require('../controllers/EnrollmentController');
const auth = require('../middleware/auth');
const Enrollment = require('../models/enrollment/Enrollment');

// Ghi danh vào khóa học
router.post('/', auth.anyUser, EnrollmentController.enroll);

// Xem các khóa học đã ghi danh
router.get('/mine', auth.anyUser, EnrollmentController.getMyEnrollments);

// Hủy ghi danh
router.delete('/', auth.lecturerOnly, EnrollmentController.cancel);

// Duyệt và từ chối ghi danh (Admin)
router.put('/approve', auth.lecturerOnly, EnrollmentController.approve);
router.put('/reject', auth.lecturerOnly, EnrollmentController.reject);

module.exports = router;
