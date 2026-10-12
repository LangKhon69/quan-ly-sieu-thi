# Dự án: Web Quản lý siêu thị

## Mục tiêu
Xây dựng website quản lý siêu thị: sản phẩm, kho, bán hàng, báo cáo.

## Về người dùng
Tôi là sinh viên năm 4, kiến thức web còn đang học.
- Trả lời bằng tiếng Việt, giải thích đơn giản.
- Khi dùng thuật ngữ kỹ thuật, hãy giải thích ngắn gọn.
- Giải thích code bạn viết, từng phần một.

## Công nghệ
- Ngôn ngữ chính: JavaScript
- Backend: Node.js + Express (thư mục backend/)
- Frontend: React + Vite (thư mục frontend/, chưa tạo)
- Database: PostgreSQL, làm việc qua Prisma

## Cách chạy
- Vào thư mục backend, chạy: node index.js
- Server chạy ở http://localhost:3000

## Quy tắc làm việc
- Luôn đề xuất kế hoạch ngắn trước, chờ tôi đồng ý rồi mới viết code.
- Mỗi lần chỉ làm một việc nhỏ.
- Không tự cài thêm thư viện mà chưa hỏi tôi.
- Không xóa hoặc sửa file ngoài phạm vi công việc được giao.
- Không bao giờ ghi mật khẩu hoặc khóa bí mật vào code; dùng file .env.
- Luôn nhắc nhở tôi về sự xung đột khi thêm mới tính năng mà ảnh hưởng đến các tính năng sẵn có.
- Sau khi viết code xong, phải tự chạy thử (test API/logic) và kiểm duyệt kỹ trước khi báo cáo kết quả cho tôi.

## Quy ước Git
Tin nhắn commit dạng: feat: (tính năng mới), fix: (sửa lỗi), docs: (tài liệu), chore: (việc vặt).


## Luật nghiệp vụ (tích điểm)
- Cứ 10.000đ chi tiêu được 1 điểm (làm tròn xuống).
- 1 điểm khi dùng sẽ giảm 100đ trên hóa đơn.
- Khách vãng lai (không có số điện thoại) vẫn mua được nhưng không tích điểm.
- Chưa có hạng thành viên (để dành cho sau).
- Điểm dùng không được vượt số điểm khách đang có, và không được làm tổng tiền âm.
- Điểm được tính trên số tiền khách thực trả (sau khi đã trừ giảm giá bằng điểm).


## Lưu ý về Prisma
- Dự án dùng Prisma phiên bản 6 và kiểu require (CommonJS). Không dùng cú pháp của các phiên bản khác.


## Quy ước đặt tên cơ sở dữ liệu
- Tên bảng và cột trong database: tiếng Việt không dấu, chữ thường, nối bằng gạch dưới, bảng đặt tên số ít (danh_muc, san_pham, ngay_tao).
- Model và trường trong Prisma: tiếng Việt không dấu, kiểu viết hoa chữ đầu mỗi từ (DanhMuc, moTa), dùng @@map và @map để ánh xạ sang tên trong database.
- Cột ID giữ tên "id"; khóa ngoại đặt theo dạng tên bảng + _id (danh_muc_id).
- Tiền tệ (VND) lưu bằng số nguyên (Int), không dùng số thập phân.
- Sản phẩm ngừng bán thì đặt dangKinhDoanh = false, không xóa.
- Bảng đối chiếu: nguoi_dung, danh_muc, san_pham, nha_cung_cap, phieu_nhap, chi_tiet_phieu_nhap, hoa_don, chi_tiet_hoa_don, khach_hang, lich_su_diem.


## Quy ước API
- Địa chỉ API viết tiếng Việt không dấu, chữ thường, nối bằng gạch ngang, bắt đầu bằng /api (ví dụ /api/san-pham).
- Dữ liệu trả về dạng JSON; thông báo lỗi dùng trường "thongBao" bằng tiếng Việt.
- Dùng mã trạng thái đúng: 200 thành công, 400 yêu cầu sai, 404 không tìm thấy, 500 lỗi máy chủ.
- Bọc phần truy cập database trong try/catch.
- Thêm mới thành công trả mã 201 : dữ liệu bị trùng (ví dụ mã vạch) trả mã 409.
- Luôn kiểm tra dữ liệu đầu vào (kiểu, giá trị rỗng, số âm) trước khi ghi database.
- Mỗi tính năng mới làm trên một nhánh riêng (feature/...), gộp vào main qua Pull Request.