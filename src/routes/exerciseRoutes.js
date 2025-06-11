const express = require('express');
const router = express.Router();
const ExerciseController = require('../controllers/ExerciseController');
const auth = require('../middleware/auth'); // middleware auth
const upload = require('../middleware/fileUpload'); // middleware multer

// Tạo bài tập với file upload (essay)
router.post('/', auth.lecturerOnly, upload.single('file'), ExerciseController.create);



// Lấy thông tin bài tập theo ID
router.get('/:id', ExerciseController.getById);

// Lấy tất cả bài tập theo lecture_id
router.get('/lecture/:lecture_id', ExerciseController.getByLecture);

// Cập nhật bài tập
router.put('/:id', auth.lecturerOnly, ExerciseController.update);

// Xoá bài tập
router.delete('/:id', auth.lecturerOnly, ExerciseController.delete);

module.exports = router;
