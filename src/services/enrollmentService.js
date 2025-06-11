const EnrollmentDao = require('../dao/enrollmentDao');

const EnrollmentService = {
  async enroll(user_id, class_id) {
    const already = await EnrollmentDao.isEnrolled(user_id, class_id);
    if (already) {
      throw new Error('Đã ghi danh rồi');
    }
    return await EnrollmentDao.enroll(user_id, class_id, 'Pending'); 
  },

  async getMyEnrollments(user_id) {
    return await EnrollmentDao.getEnrolledClasses(user_id);
  },

  async cancelEnrollment(user_id, class_id) {
    return await EnrollmentDao.unenroll(user_id, class_id);
  },

  async approve(enrollment_id) {
    return await EnrollmentDao.updateStatus(enrollment_id, 'Approved');
  },

  async reject(enrollment_id) {
    return await EnrollmentDao.updateStatus(enrollment_id, 'Rejected');
  }
};

module.exports = EnrollmentService;
