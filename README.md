# Oh! Sushi 37

Landing page tiếng Đức, HTML/CSS/JS thuần. Giao diện đen–trắng theo yêu cầu ngày 24/10/2026, lấy cảm hứng từ cách CODA dùng nền tối, ảnh lớn, bố cục thoáng và navigation tiết chế. Typography Bodoni Moda + Manrope, các sắc xám trung tính và đường kẻ mảnh; màu tự nhiên chỉ ở ảnh món ăn/đồ uống của khách. Menu HTML có 107 món ăn và 89 đồ uống, cùng đặt bàn/giỏ hàng. Palette khai báo trong `:root` của `styles.css`.

## GitHub Pages

`index.html` nằm trực tiếp ở root project/repository. Asset và PDF dùng URL tương đối, hỗ trợ GitHub Pages dưới đường dẫn project. Có `.nojekyll` để phục vụ file tĩnh trực tiếp; không cần build bằng Node hoặc dịch vụ hosting khác. Trong GitHub Pages chọn branch đang triển khai và thư mục `/ (root)`. Đã kiểm tra trang dưới prefix `/Oh-Sushi-37/`.

## Chạy local

Từ thư mục project:

```sh
python3 -m http.server 4173
```

Mở http://localhost:4173/. Không cần npm hoặc framework. Website cũng có thể mở trực tiếp bằng `index.html`.

## Chỉnh nội dung

- `index.html`: nội dung giới thiệu, thông tin quán, metadata, Restaurant schema.
- `data/menu.json`: 107 món / 21 nhóm, giá, 39 lựa chọn, allergen và phụ gia.
- `data/menu-groups.json`: 7 nhóm điều hướng theo yêu cầu khách, liên kết tới 31 category gốc; không đổi tên category/món trong PDF.
- `data/drinks.json`: 89 đồ uống / 10 nhóm, dung tích, 48 lựa chọn dung tích/giá và ký hiệu đúng PDF mới.
- Hai PDF hiện hành có link tải riêng trên website; nguồn đồ uống mới là `NEW-2026-Oh-Sushi-37-A4-Vordruck.pdf`. Bản cũ được giữ làm lịch sử.
- `styles.css`: typography, palette, bố cục và responsive.
- `app.js`: navigation mobile, lọc menu, tìm kiếm và liên kết đến nhóm món.
- `orders.js`: chọn biến thể, giỏ hàng, lưu lựa chọn local, tổng tiền và soạn email đặt món.
- `reservations.js`: form đặt bàn, kiểm tra ngày/giờ theo lịch quán tại Europe/Berlin và soạn email yêu cầu.
- `dialogs.js` / `contact.js`: quản lý dialog, focus bàn phím và email/copy dùng chung cho hai luồng.
- `assets/`: logo, ảnh WebP và font local có giấy phép OFL.

Sau khi chỉnh menu, chạy:

```sh
python3 scripts/build.py
```

Script cập nhật các vùng HTML menu/preview/legend và catalog đặt món trong `index.html`. Không cần tải JSON trong trình duyệt. Khi tắt JavaScript, toàn bộ menu vẫn hiện và navigation dùng anchor; đặt món tương tác cần JavaScript.

Đặt bàn: nút Reservieren/Tisch anfragen mở form ngày, giờ, số khách, tên và điện thoại. Form dùng lịch trong Restaurant JSON-LD; chặn thứ Ba nghỉ, ngày/giờ đã qua và giờ ngoài lịch mở cửa. Nút E-Mail-Anfrage öffnen tạo email nháp đến địa chỉ thật của quán; khách gửi và chờ phản hồi xác nhận. Có sao chép yêu cầu và gọi điện dự phòng. Thông tin cá nhân không được lưu. Map mở Google Maps sau khi người dùng bấm; không dùng iframe, analytics hay third-party tracking trên trang.

Đặt món: thêm món từ menu, chọn biến thể/beilage hoặc dung tích nếu có lựa chọn trong PDF, kiểm tra giỏ hàng rồi điền tên/số điện thoại. Nút gửi mở email nháp đến `ohsushirestaurent@gmail.com`; khách cần gửi trong ứng dụng email và chờ quán xác nhận. Có nút sao chép đơn và gọi quán. Chưa có backend nhận đơn, thanh toán hay dịch vụ giao hàng được cung cấp. Xem `docs/ordering.md`.

## Giờ mở cửa và QR

Giờ hiện hành theo yêu cầu trực tiếp 24/10/2026: thứ Hai 08:00–22:00; thứ Ba nghỉ; thứ Tư–Sáu 11:30–22:00; thứ Bảy–Chủ nhật 11:30–22:30. Lịch trong bảng giờ, meta description, Restaurant JSON-LD và form đặt bàn được đồng bộ. QR SVG ở footer mở Google Maps theo địa chỉ đang có, kèm link mở trực tiếp. Xem `docs/client-updates.md`.

Muốn đổi đích QR, cập nhật link/text ở footer trong `index.html`, rồi chạy `python3 scripts/generate_qr.py` với package build-only `qrcode` đã cài. Website không tải dịch vụ QR bên ngoài.

## Tài liệu bàn giao

- `docs/design-research.md`: nguồn yêu cầu, research các website chính thức, quyết định thiết kế và các điểm dữ liệu nguồn.
- `docs/menu-transcription.md`: bản chép menu món ăn có số trang nguồn.
- `docs/drinks-transcription.md`: bản chép đồ uống, giá từng dung tích và các điểm cần giữ nguyên theo nguồn.
- `docs/image-assets.md`: ảnh minh họa, prompt và hướng dẫn thay ảnh thật.
- `docs/quality-check.md`: kiểm tra responsive, nội dung, interaction và accessibility.
- `docs/ordering.md`: hành vi đặt món, lưu trữ và hướng dẫn tích hợp kênh nhận đơn khác.

Tài liệu chưa cung cấp domain, booking URL hoặc nội dung pháp lý đầy đủ. Website dùng ảnh từ các PDF bản chuẩn khách gửi, có ghi nguồn trên giao diện. Không bịa các dữ liệu còn thiếu.
