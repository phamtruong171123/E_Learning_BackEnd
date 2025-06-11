const Exercise = require('./Exercise');

class Essay extends Exercise {
    constructor(data) {
        super(data); 

        // Các thuộc tính riêng của Essay
        this.max_word_count = data.max_word_count;
        this.file_upload_id = data.file_upload_id;
    }
}

module.exports = Essay;
