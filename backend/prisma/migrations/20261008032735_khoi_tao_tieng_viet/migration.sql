-- CreateTable
CREATE TABLE "danh_muc" (
    "id" SERIAL NOT NULL,
    "ten" TEXT NOT NULL,
    "mo_ta" TEXT,
    "ngay_tao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "danh_muc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "san_pham" (
    "id" SERIAL NOT NULL,
    "ten" TEXT NOT NULL,
    "ma_vach" TEXT,
    "don_vi_tinh" TEXT NOT NULL,
    "gia_ban" INTEGER NOT NULL,
    "gia_nhap" INTEGER NOT NULL DEFAULT 0,
    "so_luong_ton" INTEGER NOT NULL DEFAULT 0,
    "dang_kinh_doanh" BOOLEAN NOT NULL DEFAULT true,
    "ngay_tao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ngay_cap_nhat" TIMESTAMP(3) NOT NULL,
    "danh_muc_id" INTEGER NOT NULL,

    CONSTRAINT "san_pham_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "danh_muc_ten_key" ON "danh_muc"("ten");

-- CreateIndex
CREATE UNIQUE INDEX "san_pham_ma_vach_key" ON "san_pham"("ma_vach");

-- AddForeignKey
ALTER TABLE "san_pham" ADD CONSTRAINT "san_pham_danh_muc_id_fkey" FOREIGN KEY ("danh_muc_id") REFERENCES "danh_muc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
