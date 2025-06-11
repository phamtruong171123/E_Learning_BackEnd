const CourseService = require('../services/courseService');

class CourseController {
    static async createCourse(req, res) {
        try {
            const lecturer_id = req.user.id;
            const id = await CourseService.create(req.body, req.user.id);
            res.status(201).json({ message: 'Tạo khóa học thành công', course_id: id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async getAll(req, res) {
        try {
            const courses = await CourseService.getAll();
            res.status(200).json(courses);
        } catch (err) {
            res.status(500).json({ error: 'Không thể lấy danh sách khóa học' });
        }
    }

    static async getMyCourses(req, res) {
        try {
            const courses = await CourseService.getByLecturer(req.user.id);
            res.status(200).json(courses);
        } catch (err) {
            res.status(500).json({ error: 'Không thể tải danh sách khóa học' });
        }
    }

    static async getCourseById(req, res) {
        try {
            const course = await CourseService.getById(req.params.id);
            res.status(200).json(course);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    static async updateCourse(req, res) {
        try {
            await CourseService.update(req.params.id, req.body);
            res.status(200).json({ message: 'Cập nhật khóa học thành công' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async deleteCourse(req, res) {
        try {
            await CourseService.delete(req.params.id);
            res.status(200).json({ message: 'Xoá khóa học thành công' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = CourseController;
