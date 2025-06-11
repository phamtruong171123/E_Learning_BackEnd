class Exercise {
    constructor({ exercise_id, lecture_id, title, description, type, deadline, question_number, question_text, created_at }) {
        this.exercise_id = exercise_id;
        this.lecture_id = lecture_id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.deadline = deadline;
        this.question_number = question_number;
        this.question_text = question_text;
        this.created_at = created_at;
    }
}

module.exports = Exercise;
