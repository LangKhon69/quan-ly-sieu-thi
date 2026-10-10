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

// Lấy danh sách danh mục
app.get('/api/danh-muc', async (req, res) => {
  try {
    const danhSach = await prisma.danhMuc.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(danhSach);
  } catch (loi) {
    console.error(loi);
    res.status(500).json({ thongBao: 'Lỗi máy chủ, không lấy được danh sách danh mục.' });
  }
});

// Lấy danh sách sản phẩm đang kinh doanh
app.get('/api/san-pham', async (req, res) => {
  console.log('Có khách vừa gọi danh sách sản phẩm!');
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
const laSoNguyenKhongAm = (x) => Number.isInteger(x) && x >= 0;

// Thêm sản phẩm mới
app.post('/api/san-pham', async (req, res) => {
  const { ten, maVach, donViTinh, giaBan, giaNhap, soLuongTon, danhMucId } = req.body ?? {};

  // 1. Đọc và kiểm tra phiếu order
  if (typeof ten !== 'string' || ten.trim() === '') {
    return res.status(400).json({ thongBao: 'Tên sản phẩm không được để trống.' });
  }
  if (typeof donViTinh !== 'string' || donViTinh.trim() === '') {
    return res.status(400).json({ thongBao: 'Đơn vị tính không được để trống.' });
  }
  if (!laSoNguyenKhongAm(giaBan)) {
    return res.status(400).json({ thongBao: 'Giá bán phải là số nguyên không âm.' });
  }
  if (giaNhap !== undefined && !laSoNguyenKhongAm(giaNhap)) {
    return res.status(400).json({ thongBao: 'Giá nhập phải là số nguyên không âm.' });
  }
  if (soLuongTon !== undefined && !laSoNguyenKhongAm(soLuongTon)) {
    return res.status(400).json({ thongBao: 'Số lượng tồn phải là số nguyên không âm.' });
  }
  if (maVach !== undefined && maVach !== null && typeof maVach !== 'string') {
    return res.status(400).json({ thongBao: 'Mã vạch phải là chuỗi ký tự.' });
  }
  if (!Number.isInteger(danhMucId)) {
    return res.status(400).json({ thongBao: 'Mã danh mục không hợp lệ.' });
  }

  try {
    // 2. Hỏi kho: danh mục có tồn tại không?
    const danhMuc = await prisma.danhMuc.findUnique({ where: { id: danhMucId } });
    if (!danhMuc) {
      return res.status(400).json({ thongBao: 'Danh mục không tồn tại.' });
    }

    // 3. Ghi vào kho
    const sanPham = await prisma.sanPham.create({
      data: {
        ten: ten.trim(),
        maVach: maVach || null,
        donViTinh: donViTinh.trim(),
        giaBan,
        giaNhap: giaNhap ?? 0,
        soLuongTon: soLuongTon ?? 0,
        danhMucId,
      },
      include: { danhMuc: true },
    });

    // 4. Báo lại cho khách
    res.status(201).json(sanPham);
  } catch (loi) {
    if (loi.code === 'P2002') {
      return res.status(409).json({ thongBao: 'Mã vạch này đã tồn tại.' });
    }
    console.error(loi);
    res.status(500).json({ thongBao: 'Lỗi máy chủ, không thêm được sản phẩm.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});