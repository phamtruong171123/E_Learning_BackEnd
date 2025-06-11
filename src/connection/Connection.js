// connection/Connection.js
const mysql = require('mysql2');
require('dotenv').config();  // Đọc các biến môi trường từ .env

// Cấu hình kết nối cơ sở dữ liệu
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Kết nối đến MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
