# Oh! Sushi 37

Landing page tiếng Đức, HTML/CSS/JS thuần. Thiết kế lấy đen–vàng–đỏ và graphic tre từ PDF, xen nền giấy sáng. Masthead chữ đậm, ảnh chữ nhật, các bố cục editorial khác nhau và menu HTML từ PDF món ăn 14 trang và PDF đồ uống 10 trang. Có giỏ hàng để soạn yêu cầu đặt món. Bảng màu dùng chung được khai báo trong `:root` của `styles.css`.

## Chạy local

Từ thư mục project:

```sh
python3 -m http.server 4173
```

Mở http://localhost:4173/. Không cần npm hoặc framework. Website cũng có thể mở trực tiếp bằng `index.html`.

## Chỉnh nội dung

- `index.html`: nội dung giới thiệu, thông tin quán, metadata, Restaurant schema.
- `data/menu.json`: 105 món / 21 nhóm, giá, 39 lựa chọn, allergen và phụ gia.
- `data/drinks.json`: 85 đồ uống / 10 nhóm, dung tích, 48 lựa chọn dung tích/giá và ký hiệu đúng PDF mới.
- Hai PDF gốc được giữ trong project và có link tải riêng trên website.
- `styles.css`: typography, palette, bố cục và responsive.
- `app.js`: navigation mobile, lọc menu, tìm kiếm và liên kết đến nhóm món.
- `orders.js`: chọn biến thể, giỏ hàng, lưu lựa chọn local, tổng tiền và soạn email đặt món.
- `assets/`: logo, ảnh WebP và font local có giấy phép OFL.

Sau khi chỉnh menu, chạy:

```sh
python3 scripts/build.py
```

Script cập nhật các vùng HTML menu/preview/legend và catalog đặt món trong `index.html`. Không cần tải JSON trong trình duyệt. Khi tắt JavaScript, toàn bộ menu vẫn hiện và navigation dùng anchor; đặt món tương tác cần JavaScript.

Đặt bàn qua số điện thoại có thật. Map mở Google Maps sau khi người dùng bấm; không dùng iframe, analytics hay third-party tracking trên trang.

Đặt món: thêm món từ menu, chọn biến thể/beilage hoặc dung tích nếu có lựa chọn trong PDF, kiểm tra giỏ hàng rồi điền tên/số điện thoại. Nút gửi mở email nháp đến `ohsushirestaurent@gmail.com`; khách cần gửi trong ứng dụng email và chờ quán xác nhận. Có nút sao chép đơn và gọi quán. Chưa có backend nhận đơn, thanh toán hay dịch vụ giao hàng được cung cấp. Xem `docs/ordering.md`.

## Giờ mở cửa và QR

Giờ mới theo ảnh khách gửi 05/10/2026: thứ Hai nghỉ; thứ Ba–Năm và Chủ nhật 11:30–22:00; thứ Sáu–Bảy 11:30–22:30. QR SVG ở footer mở Google Maps theo địa chỉ đang có, kèm link mở trực tiếp. Xem `docs/client-updates.md`.

Muốn đổi đích QR, cập nhật link/text ở footer trong `index.html`, rồi chạy `python3 scripts/generate_qr.py` với package build-only `qrcode` đã cài. Website không tải dịch vụ QR bên ngoài.

## Tài liệu bàn giao

- `docs/design-research.md`: nguồn yêu cầu, research các website chính thức, quyết định thiết kế và các điểm dữ liệu nguồn.
- `docs/menu-transcription.md`: bản chép menu món ăn có số trang nguồn.
- `docs/drinks-transcription.md`: bản chép đồ uống, giá từng dung tích và các điểm cần giữ nguyên theo nguồn.
- `docs/image-assets.md`: ảnh minh họa, prompt và hướng dẫn thay ảnh thật.
- `docs/quality-check.md`: kiểm tra responsive, nội dung, interaction và accessibility.
- `docs/ordering.md`: hành vi đặt món, lưu trữ và hướng dẫn tích hợp kênh nhận đơn khác.

Tài liệu chưa cung cấp domain, booking URL hoặc nội dung pháp lý đầy đủ. Website hiện dùng ảnh minh họa có ghi rõ; cần thay bằng ảnh thật khi có. Không bịa các dữ liệu còn thiếu.
