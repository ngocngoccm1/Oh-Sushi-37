# Cập nhật khách hàng — 05/10/2026

Nguồn: ảnh viết tay khách gửi trong chat (`codex-clipboard-3034d4dd-7e8f-4d03-a69c-818543e887ec.png`) và yêu cầu trực tiếp chỉ cập nhật giờ/QR. Nội dung giờ mới thay thế giờ trong Word; bản trích Word ở `client-notes.txt` được giữ như tài liệu gốc.

| Ngày | Giờ hiện tại |
|---|---|
| Montag | Ruhetag |
| Dienstag | 11:30–22:00 |
| Mittwoch | 11:30–22:00 |
| Donnerstag | 11:30–22:00 |
| Freitag | 11:30–22:30 |
| Samstag | 11:30–22:30 |
| Sonntag | 11:30–22:00 |

Địa chỉ `Hellweg Straße 30, 59597 Erwitte`, tên website và menu giữ nguyên theo yêu cầu. Meta description, thông tin giờ ở hero/reservation và Restaurant JSON-LD đồng bộ với lịch mới; thứ Hai đóng cả ngày.

QR cuối trang mở liên kết Google Maps đang có của quán, dùng đúng địa chỉ hiện tại. Chưa có URL website chính thức nên không mã hóa localhost, URL triển khai phỏng đoán hay domain tự đặt. QR là SVG đen/trắng có vùng trống bốn module, phục vụ local, có link mở Maps trực tiếp cho người đang dùng điện thoại.

Khi cần đổi đích QR: sửa link `footer-qr-code`, link/text đi kèm trong `index.html`, sau đó chạy `scripts/generate_qr.py` trong môi trường Python có package `qrcode`. Không cần thư viện QR hoặc dịch vụ bên ngoài lúc người dùng tải website.
