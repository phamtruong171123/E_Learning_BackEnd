const ExerciseService = require('../services/exerciseService');
const upload = require('../middleware/fileUpload'); // middleware multer
const express = require("express");

class ExerciseController {
    static async create(req, res) {
        try {
            // Xử lý upload file và lưu đường dẫn vào body
            let file_path = null;
            if (req.file) {
                file_path = `/uploads/${req.file.filename}`;
            }
    
            // Lấy thông tin bài tập từ body
            const body = req.body.data;  // Giả sử bài tập được gửi dưới dạng JSON trong `data`
    
            
    
            if (!body) {
                return res.status(400).json({ error: 'Dữ liệu bài tập không hợp lệ' });
            }
    
            if (body.type === 'essay' && file_path) {
                body.essay = { ...body.essay, file_path };
            }
            else if (body.type === 'quiz') {
                // Nếu là bài tập trắc nghiệm, không cần xử lý file
                body.quiz = { ...body.quiz };
            }
            // Tạo bài tập
            const exercise_id = await ExerciseService.create(body);
            res.status(201).json({ message: 'Tạo bài tập thành công' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi tạo bài tập' });
        }
    }
    

    static async getById(req, res) {
        try {
            const data = await ExerciseService.getById(req.params.id);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    static async getByLecture(req, res) {
        try {
            const list = await ExerciseService.getByLecture(req.params.lecture_id);
            res.status(200).json(list);
        } catch (err) {
            res.status(500).json({ error: 'Không thể lấy danh sách bài tập' });
        }
    }

    static async update(req, res) {
        try {
            await ExerciseService.update(req.params.id, req.body);
            res.status(200).json({ message: 'Cập nhật bài tập thành công' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        try {
            await ExerciseService.delete(req.params.id);
            res.status(200).json({ message: 'Đã xoá bài tập' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = ExerciseController;
