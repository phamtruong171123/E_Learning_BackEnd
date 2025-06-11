const Class= require('../models/class/Class');
const ClassDao = require('../dao/classDao');

class ClassService {
   static async  create(data){
        if (  !data.course_id || !data.start_date || !data.end_date) {
            throw new Error('Thiếu tên lớp, khóa học, ngày bắt đầu hoặc ngày kết thúc');
        }

        const classData = new Class(
           
            data.course_id,
            data.lecturer_id,
            data.start_date,
            data.end_date
        );

        return await ClassDao.create(classData);

                  
    }

   static async getByCourse(course_id) {
            return await ClassDao.getByCourse(course_id);
        } 

   static async getById(class_id) {
        const classData = await ClassDao.getById(class_id);
        if (!classData) throw new Error('Lớp học không tồn tại');
        return classData;
    }

   static async update(class_id, data) {
        return await ClassDao.update(class_id, data);
    }

   static async delete(class_id) {
        return await ClassDao.delete(class_id);
    }
   static async getByLecturer(lecturer_id) {
        return await ClassDao.getByLecturer(lecturer_id);
    }
    static async getStudentsInClass(class_id) {
        return await ClassDao.getStudentsInClass(class_id);
    }
}

module.exports = ClassService;