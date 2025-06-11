const ExerciseDAO = require('../dao/exercise/exerciseDao');
const QuizDAO = require('../dao/exercise/quizDao');
const EssayDAO = require('../dao/exercise/essayDao');

const Exercise = require('../models/exercise/Exercise');
const Quiz = require('../models/exercise/Quiz');
const Essay = require('../models/exercise/Essay');
const { options } = require('../routes/courseRoutes');

class ExerciseService {
    // Tạo bài tập mới (bao gồm quiz và essay)
    static async create(data) {
        try {
            // Tạo bài tập vào bảng `Exercises` và lấy `exercise_id`
           const exercise_id = await ExerciseDAO.create(data);


            if (!exercise_id) {
                throw new Error('Không thể lấy exercise_id');
            }

            // Kiểm tra nếu bài tập là `quiz`, insert vào bảng Quiz
            if (data.type === 'quiz') {
                const quizData = {
                    exercise_id,
                    options: data.quiz.options,
                    correct_answer: data.quiz.correct_answer
                };
                await QuizDAO.create(quizData);
            }

            // Kiểm tra nếu bài tập là `essay`, insert vào bảng Essay
            if (data.type === 'essay') {
                const essayData = {
                    exercise_id,
                    max_word_count: data.essay.max_word_count,
                    file_path: data.essay.file_path || null
                };

                await EssayDAO.create(essayData);
            }

            return exercise_id;  // Trả về exercise_id sau khi tạo
        } catch (err) {
            console.error('Error creating exercise:', err);
            throw new Error('Lỗi khi tạo bài tập');
        }
    }

    // Lấy thông tin bài tập theo ID
    static async getById(id) {
        try {
            const results = await new Promise((resolve, reject) => {
                ExerciseDAO.getById(id, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
    
            // Kiểm tra nếu không có bài tập nào được tìm thấy
            if (!results || results.length === 0) {
                throw new Error('Không tìm thấy bài tập');
            }
    
            // Lấy bài tập đầu tiên từ mảng kết quả
            const exercise = await ExerciseDAO.getById(id);
    
            console.log('Fetched exercise:', exercise);  // Debug xem bài tập đã được lấy
    
            // Nếu bài tập là quiz, lấy chi tiết quiz
            if (exercise.type === 'quiz') {
                const quizDetails = await QuizDAO.getByExerciseId(id); // Đợi kết quả quiz
                exercise.quiz = quizDetails[0];  // Gán thông tin quiz vào bài tập
            }
    
            // Nếu bài tập là essay, lấy chi tiết essay
            if (exercise.type === 'essay') {
                const essayDetails = await EssayDAO.getByExerciseId(id);
                exercise.essay = essayDetails[0];  // Gán thông tin essay vào bài tập
            }
    
            return exercise;  // Trả về bài tập thông thường nếu không phải quiz hay essay
        } catch (err) {
            console.error('Error fetching exercise by ID:', err);
            throw new Error('Không tìm thấy bài tập');
        }
    }
    
    

    // Lấy tất cả bài tập theo lecture_id
    static async getByLecture(lecture_id) {
        try {
            // Lấy danh sách bài tập theo lecture_id
            const exercises = await ExerciseDAO.getByLecture(lecture_id);
            console.log(exercises);  // Debug xem danh sách bài tập đã được lấy
    
            // Sử dụng for...of để xử lý bất đồng bộ trong vòng lặp
            for (let exercise of exercises) {
                // Nếu bài tập là quiz, lấy chi tiết quiz
                if (exercise.type === "quiz") {
                    const quizDetails = await QuizDAO.getByExerciseId(exercise.exercise_id); // Đợi kết quả quiz
                    exercise.quiz = quizDetails[0]; // Gán thông tin quiz vào bài tập
                }
    
                // Nếu bài tập là essay, lấy chi tiết essay
                if (exercise.type === "essay") {
                    const essayDetails = await EssayDAO.getByExerciseId(exercise.exercise_id);
                    exercise.essay = essayDetails[0]; // Gán thông tin essay vào bài tập
                }
            }
    
            return exercises; // Trả về danh sách bài tập đã được cập nhật
        } catch (error) {
            console.error("Error fetching exercises:", error);
            throw new Error("Không thể lấy danh sách bài tập");
        }
    }
    

    // Cập nhật thông tin bài tập
    static async update(id, data) {
        try {
            await ExerciseDAO.update(id, data);

            // Nếu bài tập là quiz, cập nhật thông tin quiz
           if (data.type === 'quiz' && data.quiz) {
  await QuizDAO.update(id, data.quiz);
}


            // Nếu bài tập là essay, cập nhật thông tin essay
            if (data.type === 'essay') {
                await EssayDAO.update(id, data.essay);
            }
        } catch (err) {
            console.error('Error updating exercise:', err);
            throw new Error('Không thể cập nhật bài tập');
        }
    }

    // Xóa bài tập (cùng với quiz và essay nếu có)
    static async delete(id) {
        try {
            // Xóa bài tập chính
            await ExerciseDAO.delete(id);
        } catch (err) {
            console.error('Error deleting exercise:', err);
            throw new Error('Không thể xoá bài tập');
        }
    }
}

module.exports = ExerciseService;
