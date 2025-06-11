const Course = require('../models/course/Course');
const CourseDao = require('../dao/courseDao');

class CourseService {
    async create(data) {
        if (!data.title || !data.category) {
            throw new Error('Thiếu tiêu đề hoặc danh mục khóa học');
        }

        const course = new Course(
            data.title,
            data.description,
            data.category,
            data.thumbnail
        );

        return await CourseDao.create(course);
    }

    async getAll() {
        return await CourseDao.getAll();
    }

    static async getByLecturer(lecturer_id) {
        return await CourseDao.getByLecturer(lecturer_id);
    }

    static async getById(course_id) {
        const course = await CourseDao.getById(course_id);
        if (!course) throw new Error('Khóa học không tồn tại');
        return course;
    }

    static async update(course_id, data) {
        return await CourseDao.update(course_id, data);
    }

    static async delete(course_id) {
        return await CourseDao.delete(course_id);
    }

    async getStudentsInClass(class_id) {
  return await ClassDao.getStudentsInClass(class_id);
}
}

module.exports = CourseService;
