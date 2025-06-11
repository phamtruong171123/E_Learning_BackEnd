// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

const router = express.Router();

// Route đăng ký người dùng
router.post('/register', UserController.registerUser);

// Route đăng nhập người dùng
router.post('/login', UserController.loginUser);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.patch('/approve/:userId',auth.adminOnly, UserController.approveTeacher);

module.exports = router;
