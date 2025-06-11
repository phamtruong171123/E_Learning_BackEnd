const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/ClassController');
const auth = require('../middleware/auth');
const ClassService = require('../services/classService');
const ClassDao = require('../dao/classDao');
const classService = new ClassService();

router.post('/', auth.lecturerOnly, ClassController.create);
router.get('/course/:course_id', auth.anyUser, ClassController.getByCourse);
router.put('/:class_id', auth.lecturerOnly, ClassController.update);
router.get('/:class_id', auth.anyUser, ClassController.getById);
router.delete('/:class_id', auth.lecturerOnly, ClassController.delete);
router.get('/lecturer/my', auth.anyUser, ClassController.getByLecturer);
router.get('/:class_id/students', auth.anyUser, ClassController.getStudents);



module.exports = router;

