class Submission {
  constructor({
    submission_id,
    exercise_id,
    student_id,
    submit_time,
    answers,
    score,
    file_path,
    text_answer,
    comment,
    graded_by,
    grade_time
  }) {
    this.submission_id = submission_id;
    this.exercise_id = exercise_id;
    this.student_id = student_id;
    this.submit_time = submit_time;
    this.answers = answers;
    this.score = core;
    this.file_path = file_path;
    this.text_answer = text_answer;
   
    this.comment = comment;
    this.graded_by = graded_by;
    this.grade_time = grade_time;
  }
}

module.exports = Submission;