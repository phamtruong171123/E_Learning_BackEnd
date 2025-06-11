const LectureService = require('../services/lectureService');

class LectureController {
    // Tạo bài giảng
    static async createLecture(req, res) {
        try {
            const id = await LectureService.create(req.body);  // Gọi service
            res.status(201).json({ message: 'Tạo bài giảng thành công', lecture_id: id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Lấy danh sách bài giảng theo khóa học
    static async getLecturesByCourse(req, res) {
        try {
            const lectures = await LectureService.getByCourse(req.params.course_id);
            res.status(200).json(lectures);
        } catch (err) {
            res.status(500).json({ error: 'Không thể lấy danh sách bài giảng' });
        }
    }
}

module.exports = LectureController;
