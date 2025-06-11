class Lecture {
    constructor(lecture_id, course_id, title,description, source_url, open_date, close_date) {
        this.lecture_id = lecture_id;
        this.course_id = course_id;
        this.title = title;
        this.description = description;
     
        this.source_url = source_url;
        this.open_date = open_date;
        this.close_date = close_date;
        this.created_at = new Date();
    }
}
module.exports = Lecture;
