# Quản lý siêu thị

Ứng dụng web quản lý siêu thị: sản phẩm, kho, bán hàng, khách hàng thành viên và tích điểm.
Đây là dự án học tập, xây dựng theo mô hình API.

## Công nghệ
- Backend: Node.js, Express
- Cơ sở dữ liệu: PostgreSQL, Prisma 6
- Frontend: React + Vite (dự kiến)

## Cài đặt và chạy
1. Cài Node.js và PostgreSQL, tạo database tên `supermarket_db`.
2. Vào thư mục backend: `cd backend`
3. Sao chép `.env.example` thành `.env` và điền mật khẩu PostgreSQL của bạn.
4. Cài thư viện: `npm install`
5. Sinh Prisma Client và tạo bảng: `npx prisma generate` rồi `npx prisma migrate dev`
6. (Tùy chọn) Nạp dữ liệu mẫu: `node du-lieu-mau.js`
7. Chạy server: `node index.js`, rồi mở http://localhost:3000

## API hiện có
| Phương thức | Địa chỉ | Mô tả |
|---|---|---|
| GET | /api/san-pham | Danh sách sản phẩm đang kinh doanh |
| GET | /api/san-pham/:id | Chi tiết một sản phẩm |
| GET | /api/danh-muc | Danh sách danh mục |

## Tiến độ
- [x] Thiết lập môi trường, Git, cơ sở dữ liệu
- [x] Bảng danh mục và sản phẩm
- [x] API xem sản phẩm và danh mục
- [ ] API thêm, sửa, xóa
- [ ] Đăng nhập và phân quyền
- [ ] Bán hàng, khách hàng và tích điểm
- [ ] Giao diện React

## Ghi chú
Dự án có dùng trợ lý AI (GitHub Copilot), hướng dẫn cho trợ lý nằm trong file `AGENTS.md`.