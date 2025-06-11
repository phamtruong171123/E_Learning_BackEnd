const ClassService = require("../services/classService");
const ClassDao = require('../dao/classDao');

class ClassController {
    static async create(req,res){
        try{
            
            const class_id=await ClassService.create(req.body);
            res.status(201).json({message: 'Lớp học đã được tạo thành công!', class_id: class_id});

        }
        catch(err){
            console.error(err);
            res.status(400).json({message: 'Lỗi khi tạo lớp học'});
        }
    }

    static async getByCourse(req,res){
        try{
            const course_id = req.params.course_id;
            const classes = await ClassService.getByCourse(course_id);
            res.status(200).json(classes);
        }
        catch(err){
            console.error(err);
            res.status(400).json({message: 'Lỗi khi lấy danh sách lớp học'});
        }
    }

    static async getById(req,res){
        try{
            const class_id = req.params.class_id;
            const classData = await ClassService.getById(class_id);
            res.status(200).json(classData);
        }
        catch(err){
            console.error(err);
            res.status(400).json({message: 'Lỗi khi lấy thông tin lớp học'});
        }
    }

    static async update(req,res){
        try{
            const class_id = req.params.class_id;
            const classData = await ClassService.update(class_id, req.body);
            res.status(200).json({message: 'Lớp học đã được cập nhật thành công'});
        }
        catch(err){
            console.error(err);
            res.status(400).json({message: 'Lỗi khi cập nhật lớp học'});
        }
    }
    static async delete(req,res){
        try{
            const class_id = req.params.class_id;
            await ClassService.delete(class_id);
            res.status(200).json({message: 'Lớp học đã được xóa thành công'});
        }
        catch(err){
            console.error(err);
            res.status(400).json({message: 'Lỗi khi xóa lớp học'});
        }
    }

    static async getByLecturer(req,res){
        try{
            const lecturer_id = req.user.user_id;
           
            const classes = await ClassService.getByLecturer(lecturer_id);
            res.status(200).json(classes);
        }
        catch(err){
            console.error(err);
            res.status(400).json({message: 'Lỗi khi lấy danh sách lớp học'});
        }
    }
    
    static async getStudents(req, res) {
  try {
    const class_id = req.params.class_id;
    const students = await ClassService.getStudentsInClass(class_id);
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Không thể lấy danh sách học sinh lớp này' });
  }
}


}

module.exports = ClassController;