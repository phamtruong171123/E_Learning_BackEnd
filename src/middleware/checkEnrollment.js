const enrollmentDao = require('../dao/enrollmentDao');

/**
 * Middleware kiểm tra sinh viên đã ghi danh khóa học hay chưa.
 
 */
async function checkEnrollment(req, res, next) {
    const userId = req.user.id;

    // Ưu tiên lấy course_id từ params hoặc body
    const courseId = req.params.course_id || req.body.course_id;

    if (!courseId) {
        return res.status(400).json({ error: 'Thiếu course_id để kiểm tra ghi danh.' });
    }

    try {
        const enrolled = await enrollmentDao.isEnrolled(userId, courseId);
        if (!enrolled) {
            return res.status(403).json({ error: 'Bạn chưa ghi danh khóa học này.' });
        }
        next(); // Cho phép đi tiếp nếu đã ghi danh
    } catch (err) {
        console.error('Lỗi kiểm tra ghi danh:', err);
        res.status(500).json({ error: 'Lỗi máy chủ khi kiểm tra ghi danh.' });
    }
}

module.exports = checkEnrollment;
