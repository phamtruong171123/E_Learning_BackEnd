class Enrollment {
    constructor({ enrollment_id, user_id, class_id, status, enrolled_at }) {
      this.enrollment_id = enrollment_id;
      this.user_id = user_id;
      this.class_id = class_id;
      this.status = status;
      this.enrolled_at = enrolled_at;
    }
  }
  
  module.exports = Enrollment;
  