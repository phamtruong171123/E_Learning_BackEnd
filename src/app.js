const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');  // Import route người dùng
const courseRoutes = require('./routes/courseRoutes');  // Import route khóa học
const lectureRoutes = require('./routes/lectureRoutes');  // Import route bài giảng
const exerciseRoutes = require('./routes/exerciseRoutes');  // Import route bài tập
const enrollmentRoutes = require('./routes/enrollmentRoutes');  // Import route ghi danh khóa học
const classRoutes = require('./routes/classRoutes');  // Import route lớp học
//const submissionRoutes = require('./routes/submissionRoutes');  // Import route nộp bài tập 

const gradingRoutes = require('./routes/gradingRoutes');  // Import route chấm điểm bài tập


const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Cho phép truy cập từ frontend
app.use(express.json()); // Parse JSON trong body request


app.use("/enrollments", enrollmentRoutes);  // Route ghi danh khóa học
app.use("/users", userRoutes);  // Route đăng ký & đăng nhập
app.use("/courses", courseRoutes);  // Route quản lý khóa học
app.use("/lectures", lectureRoutes);  // Route quản lý bài giảng
app.use("/exercises", exerciseRoutes);  // Route quản lý bài tập
app.use("/classes", classRoutes);  // Route quản lý lớp học
app.use("/grading", gradingRoutes);  // Route chấm điểm bài tập

// Test endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  //console.log("JWT_SECRET:", process.env.JWT_SECRET);


});
