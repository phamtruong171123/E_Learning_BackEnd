class Course {
    constructor(title, description, category, thumbnail, created_at = new Date()) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.thumbnail = thumbnail;
        this.created_at = created_at;
    }
}
module.exports = Course;
