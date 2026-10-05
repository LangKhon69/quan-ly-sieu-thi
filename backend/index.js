const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Xin chào! Backend siêu thị đang chạy.');
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});