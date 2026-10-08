const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sua = await prisma.danhMuc.upsert({
    where: { ten: 'Sữa' },
    update: {},
    create: { ten: 'Sữa', moTa: 'Các loại sữa và sản phẩm từ sữa' },
  });

  await prisma.sanPham.upsert({
    where: { maVach: '1000000000001' },
    update: {},
    create: {
      ten: 'Sữa tươi tiệt trùng 1 lít',
      maVach: '1000000000001',
      donViTinh: 'hộp',
      giaBan: 32000,
      giaNhap: 26000,
      soLuongTon: 50,
      danhMucId: sua.id,
    },
  });

  const danhSach = await prisma.sanPham.findMany({
    include: { danhMuc: true },
  });
  console.log(danhSach);
}

main()
  .catch((loi) => console.error('Lỗi:', loi))
  .finally(() => prisma.$disconnect());