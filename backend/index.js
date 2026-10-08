const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Xin chào! Backend siêu thị đang chạy.');
});

// Lấy danh sách sản phẩm đang kinh doanh
app.get('/api/san-pham', async (req, res) => {
  try {
    const danhSach = await prisma.sanPham.findMany({
      where: { dangKinhDoanh: true },
      include: { danhMuc: true },
      orderBy: { id: 'asc' },
    });
    res.json(danhSach);
  } catch (loi) {
    console.error(loi);
    res.status(500).json({ thongBao: 'Lỗi máy chủ, không lấy được danh sách sản phẩm.' });
  }
});

// Lấy chi tiết một sản phẩm theo id
app.get('/api/san-pham/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ thongBao: 'Mã sản phẩm không hợp lệ.' });
  }

  try {
    const sanPham = await prisma.sanPham.findUnique({
      where: { id },
      include: { danhMuc: true },
    });
    if (!sanPham) {
      return res.status(404).json({ thongBao: 'Không tìm thấy sản phẩm.' });
    }
    res.json(sanPham);
  } catch (loi) {
    console.error(loi);
    res.status(500).json({ thongBao: 'Lỗi máy chủ, không lấy được sản phẩm.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});