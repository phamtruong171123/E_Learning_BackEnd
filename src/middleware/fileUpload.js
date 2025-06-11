const multer = require('multer');
const path = require('path');

// Thiết lập lưu file vào thư mục uploads
const storage = multer.diskStorage({
    destination: '../uploads',  
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));  // Tạo tên file duy nhất
    }
});

const upload = multer({ storage });

module.exports = upload;
