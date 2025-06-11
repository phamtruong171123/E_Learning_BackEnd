const EnrollmentService = require('../services/enrollmentService');

class EnrollmentController {
  static async enroll(req, res) {
    try {
      const user_id = req.user.id;
      const { class_id } = req.body;
      const id = await EnrollmentService.enroll(user_id, class_id);
      res.status(201).json({ message: 'Ghi danh thành công', enrollment_id: id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getMyEnrollments(req, res) {
    try {
      const user_id = req.user.id;
      const list = await EnrollmentService.getMyEnrollments(user_id);
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json({ error: 'Lỗi khi lấy danh sách ghi danh' });
    }
  }

  static async cancel(req, res) {
    try {
      const user_id = req.user.id;
      const { class_id } = req.body;
      await EnrollmentService.cancelEnrollment(user_id, class_id);
      res.status(200).json({ message: 'Đã hủy ghi danh' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async approve(req, res) {
    try {
      const { enrollment_id } = req.body;
      await EnrollmentService.approve(enrollment_id);
      res.status(200).json({ message: 'Đã duyệt ghi danh' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async reject(req, res) {
    try {
      const { enrollment_id } = req.body;
      await EnrollmentService.reject(enrollment_id);
      res.status(200).json({ message: 'Đã từ chối ghi danh' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = EnrollmentController;
