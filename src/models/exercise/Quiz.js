const Exercise = require('./Exercise');

class Quiz extends Exercise {
    constructor(data) {
        super(data); // Kế thừa các thuộc tính chung từ Exercise

        // Các thuộc tính riêng của Quiz
        this.options = Array.isArray(data.options)
            ? data.options
            : JSON.parse(data.options || '[]');
        this.correct_answer = data.correct_answer;
    }
}

module.exports = Quiz;
