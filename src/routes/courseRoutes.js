const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const auth = require('../middleware/auth');

router.post('/', auth.lecturerOnly, CourseController.createCourse);
router.get('/my', auth.anyUser, CourseController.getMyCourses);
router.get('/:id', auth.anyUser, CourseController.getCourseById);
router.patch('/:id', auth.lecturerOnly, CourseController.updateCourse);
router.delete('/:id', auth.lecturerOnly, CourseController.deleteCourse);

module.exports = router;
