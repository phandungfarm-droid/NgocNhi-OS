# CLAUDE_HANDOFF.md

## Mục đích
File này là trạng thái bàn giao cố định cho Claude khi chuyển sang cuộc trò chuyện mới. Claude phải đọc file này trước khi thực hiện thay đổi dự án.

## Quy tắc làm việc
1. Không bắt đầu lại dự án nếu code hiện tại đã có sẵn.
2. Không tự suy đoán hoặc tạo chức năng mới ngoài nhiệm vụ được giao.
3. Trước khi sửa, kiểm tra code thực tế và xác định đúng file liên quan.
4. Chỉ sửa các file thực sự cần thiết.
5. Không làm mất chức năng đang hoạt động.
6. Sau khi sửa phải kiểm tra lỗi và xác nhận kết quả.
7. Không lặp lại việc đã hoàn thành.
8. Khi nhiệm vụ chưa hoàn tất vì giới hạn phiên trò chuyện, ghi rõ điểm dừng vào file này.
9. Không giải thích dài dòng; tập trung thực hiện công việc.
10. Khi hoàn thành, báo ngắn gọn: file đã sửa, việc đã làm, kết quả kiểm tra.

## Hệ thống
Tên: Hệ thống dịch vụ Ngọc Nhi

Module chính:
- TRANG TRẠI DÚI
- QUÁN ĂN NGỌC NHI
- DỊCH VỤ TIỆC CƯỚI
- AI TỔNG QUẢN
- AI TẠO BÀI QUẢNG CÁO

## Kiến trúc hiện tại
- Repository: `phandungfarm-droid/NgocNhi-OS`
- Nhánh chính: `main`
- Firebase Realtime Database dùng cho dữ liệu.
- ImgBB dùng cho ảnh ở các module có chức năng upload ảnh.
- `imgbb-config.js` là cấu hình ImgBB dùng chung trong repository.
- Không tạo hệ thống upload ảnh thứ hai nếu đã có logic ImgBB dùng chung.

## NHIỆM VỤ ĐANG THỰC HIỆN
### Hoàn thiện upload ảnh món ăn trong QUÁN ĂN NGỌC NHI
Mục tiêu bắt buộc:
- Chọn ảnh món ăn từ máy tính/thiết bị.
- Upload ảnh lên ImgBB.
- Nhận URL ảnh từ ImgBB.
- Lưu URL vào đúng dữ liệu món ăn trong Firebase.
- Hiển thị ảnh món ăn trong giao diện quản lý.
- Hiển thị ảnh món ăn ở giao diện khách nếu module đang dùng dữ liệu đó.
- Cho phép đổi ảnh.
- Cho phép xóa URL ảnh.
- Có xử lý lỗi rõ ràng.
- Không làm mất các chức năng Quán Ăn đang hoạt động.

## TRẠNG THÁI
- `quan_an.html` là file chính đang cần hoàn thiện.
- `imgbb-config.js` đã tồn tại trong repository.
- `index.html` đã tồn tại trong repository.
- Phiên Claude trước đã bắt đầu xử lý ImgBB nhưng bị hết hạn mức giữa chừng.
- Một bản `quan_an.html` đã được gửi trong chat dưới dạng ZIP và được xác định có logic upload ImgBB, nhưng chưa được xác nhận là đã triển khai đúng vào repository hiện tại.
- Không được tự bỏ qua chức năng upload ảnh món ăn chỉ vì phiên chat mới không có ngữ cảnh.

## CÁCH TIẾP TỤC
Khi người dùng nói `tiếp tục`:
1. Đọc file này.
2. Kiểm tra code thực tế trên repository.
3. Kiểm tra `quan_an.html`, `index.html`, `imgbb-config.js` và các file Firebase liên quan.
4. Xác định chính xác phần upload ảnh món ăn đang có và phần còn thiếu.
5. Chỉ sửa phần cần thiết.
6. Kiểm tra cú pháp và luồng dữ liệu.
7. Không tự thay đổi giao diện hoặc chức năng khác.
8. Cập nhật lại file này sau khi hoàn thành.

## MẪU CẬP NHẬT
Nhiệm vụ:
...

Đã hoàn thành:
...

Đang dở:
...

File đã sửa:
...

Việc tiếp theo:
...

Kết quả kiểm tra:
...
