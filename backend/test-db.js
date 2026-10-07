const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const danhMuc = await prisma.category.upsert({
    where: { name: 'Sữa' },
    update: {},
    create: { name: 'Sữa', description: 'Các loại sữa và sản phẩm từ sữa' },
  });
  console.log('Đã có danh mục:', danhMuc);

  const tatCa = await prisma.category.findMany();
  console.log('Tất cả danh mục:', tatCa);
}

main()
  .catch((loi) => console.error('Lỗi:', loi))
  .finally(() => prisma.$disconnect());