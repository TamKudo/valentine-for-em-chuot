const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// 1. Cấu hình View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Cấu hình thư mục tĩnh (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// 3. Route trang chủ (/)
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'index.ejs');

    if (fs.existsSync(filePath)) {
        res.render('index');
    } else {
        res.status(500).send(`[LỖI] Không tìm thấy file tại: ${filePath}. Vui lòng kiểm tra lại tên file trong thư mục views!`);
    }
});

// 4. Route trang bức thư (/letter)
app.get('/letter', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'letter.ejs');

    if (fs.existsSync(filePath)) {
        res.render('letter');
    } else {
        res.status(500).send(`[LỖI] Không tìm thấy file letter.ejs tại: ${filePath}`);
    }
});

// 5. Khởi động Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(`: http://localhost:${PORT}`);

});