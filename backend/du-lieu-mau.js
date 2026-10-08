const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const duLieuMau = [
  {
    danhMuc: 'Sữa',
    sanPham: [
      { ten: 'Sữa tươi tiệt trùng 1 lít', maVach: '1000000000001', donViTinh: 'hộp', giaBan: 32000, giaNhap: 26000, soLuongTon: 50 },
      { ten: 'Sữa chua uống men sống (lốc 4 hộp)', maVach: '1000000000002', donViTinh: 'lốc', giaBan: 28000, giaNhap: 22000, soLuongTon: 40 },
    ],
  },
  {
    danhMuc: 'Nước giải khát',
    sanPham: [
      { ten: 'Nước suối 500ml', maVach: '1000000000003', donViTinh: 'chai', giaBan: 6000, giaNhap: 4000, soLuongTon: 200 },
      { ten: 'Nước cam ép 330ml', maVach: '1000000000004', donViTinh: 'chai', giaBan: 12000, giaNhap: 8500, soLuongTon: 80 },
    ],
  },
];

async function main() {
  for (const nhom of duLieuMau) {
    const danhMuc = await prisma.danhMuc.upsert({
      where: { ten: nhom.danhMuc },
      update: {},
      create: { ten: nhom.danhMuc },
    });
    for (const sp of nhom.sanPham) {
      await prisma.sanPham.upsert({
        where: { maVach: sp.maVach },
        update: {},
        create: { ...sp, danhMucId: danhMuc.id },
      });
    }
  }
  console.log('Đã nạp dữ liệu mẫu.');
}

main()
  .catch((loi) => console.error('Lỗi:', loi))
  .finally(() => prisma.$disconnect());