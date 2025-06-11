const Lecture = require('../models/lecture/Lecture');
const LectureDao = require('../dao/lectureDao');

class LectureService {
    // Tạo bài giảng
    static async create(data) {
        if (!data.course_id || !data.title) throw new Error('Thiếu course_id hoặc tiêu đề bài giảng');

        const lecture = new Lecture(
            null, // lecture_id auto-increment
            data.course_id,
            data.title,
            data.description,
            data.source_url,
            data.open_date,
            data.close_date
        );

        const result = await LectureDao.create(lecture);  // Lưu vào DB
        return result.insertId;  // Trả về lecture_id vừa tạo
    }

    // Lấy tất cả bài giảng theo course_id
    static async getByCourse(course_id) {
        return await LectureDao.getByCourse(course_id);
    }
}

module.exports = LectureService;
