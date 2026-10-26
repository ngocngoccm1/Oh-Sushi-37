# Đặt món — Oh! Sushi 37

**Hiện tại: đã bật lại theo yêu cầu trực tiếp 26/10/2026.** Có thêm món, giỏ hàng, số lượng/tổng tiền và email nháp đến `ohsushirestaurent@gmail.com`. Khách cần tự gửi email và chờ quán xác nhận. Việc tắt ngày 25/10 đã được thay thế bằng yêu cầu bật lại này. Chưa tích hợp email tự động hoặc PDF hóa đơn.

Yêu cầu trong chat bổ sung khả năng đặt món. Word chỉ cung cấp email và số điện thoại; chưa có hệ thống tiếp nhận đơn, booking URL, WhatsApp hoặc thông tin giao hàng/thanh toán.

## Luồng hiện tại

1. Chọn nhóm menu, tìm món và bấm Hinzufügen/Auswählen.
2. Với món có biến thể giá, chọn đúng biến thể trong PDF. TATARE/CARPACCIO có Lachs hoặc Thunfisch; Signature chọn Süßkartoffeln, Pommes hoặc Reis theo mô tả nhóm trong PDF.
3. Giỏ hàng hiển thị món, biến thể/beilage, allergen được in trong nguồn, số lượng và tổng tiền. Có tăng/giảm/xóa; số lượng mỗi lựa chọn từ 1 đến 99.
4. Điền tên, số điện thoại và ghi chú tùy chọn.
5. E-Mail-Entwurf öffnen tạo email nháp đến `ohsushirestaurent@gmail.com`, với mã món/biến thể chính xác, số lượng, giá và thông tin liên hệ. Khách cần gửi trong ứng dụng email. Quán cần phản hồi xác nhận khả năng phục vụ, cách nhận món và tổng tiền.

Nút Bestellung kopieren sao chép nội dung; nếu clipboard bị chặn, hiển thị textarea để copy thủ công. Restaurant anrufen dùng số `02943 9800335`. Giỏ không tự xóa khi mở email vì trình duyệt không xác minh được khách đã gửi.

## Dữ liệu và bảo trì

- `data/menu.json` và `data/drinks.json` là nguồn món/đồ uống/giá. Sau khi cập nhật, chạy `python3 scripts/build.py` để dựng lại HTML và JSON catalog nhúng cùng trang.
- Khóa món gồm category, số nguồn và tên, tránh ghi đè các mã 33/42 trùng trong PDF.
- Giá tính bằng integer cents; không lấy giá từ localStorage. Dữ liệu giỏ đã lưu được kiểm tra lại với catalog khi tải trang.
- `localStorage` chỉ chứa mã lựa chọn/biến thể/beilage/số lượng. Tên, điện thoại và ghi chú không được lưu. Nếu storage bị chặn, giỏ vẫn hoạt động trong lượt truy cập đó.
- `orders.js` chứa logic giỏ hàng; `contact.js` đọc email nhận từ Restaurant JSON-LD và xử lý email/copy; `dialogs.js` quản lý dialog/focus dùng chung với đặt bàn. `styles.css` chứa dialog/cart responsive.
- Không có payment gateway, backend xác nhận hoặc phí giao hàng tự tạo. Khi được cung cấp hệ thống nhận đơn thực tế, thay bước mailto bằng tích hợp endpoint/link đó và bổ sung trạng thái nhận đơn theo phản hồi thật.

## Kiểm tra

Đã kiểm tra chọn món cố định, nhiều biến thể của cùng món, lựa chọn beilage, giới hạn số lượng, giá/tổng tiền, tăng giảm/xóa, tải lại, giỏ rỗng, dữ liệu lưu hỏng/không hợp lệ, sao chép và fallback. Email được chặn trong script kiểm thử để kiểm tra nội dung; không gửi đơn thử đến nhà hàng.

Dialog đã kiểm tra tại 320/375/390/430/768/1024/1440/1920px; keyboard Tab/Shift+Tab, Escape và trả focus. Axe kiểm tra giỏ mobile/desktop, hộp biến thể và giỏ rỗng: 0 violations.

## Đồ uống — 05/10/2026

85 đồ uống từ PDF mới được thêm vào catalog, giữ 105 món cũ. Whiskey/wodka có 2 cl và 4 cl; rượu vang có 0,2 l và 0,7 l đúng nguồn. Khách phải chọn dung tích trước khi thêm; hai dung tích tạo hai dòng giỏ riêng. Dung tích cố định cũng xuất hiện trong giỏ và email nháp. Giá vẫn tính bằng cents từ catalog, không tin giá trong localStorage.

Các ký hiệu đồ uống được ghi là “Kennzeichnungen (Getränkekarte)”. PDF đồ uống không kèm legend, vì vậy không áp cách diễn giải mã của PDF món ăn cho đồ uống.

## Bản chuẩn và nhóm menu — 12/10/2026

Catalog hiện có 107 món ăn và 85 đồ uống từ hai PDF Vordruck. Nhóm lớn trong `data/menu-groups.json` chỉ phục vụ điều hướng, không đổi giá hoặc category gốc. Maki 6 STK., Inside Out 8 STK., IKIGAI DELUXE riêng 12 STK.; lượng phần ăn được giữ trong giỏ/email cùng dung tích đồ uống. Các khóa cũ không còn khớp mã+tên mới bị loại khỏi giỏ đã lưu, tránh đổi nhầm một món sang món khác khi mã Maki/Inside Out thay đổi.

## CTA và đặt bàn — 14/10/2026

Hero có Gerichte bestellen dẫn thẳng tới phần chọn món. Bestellen trong header và thanh điện thoại mở giỏ; giỏ rỗng có nút chọn món. Reservieren mở form đặt bàn riêng, xem `docs/reservations.md`. Hai luồng dùng chung dialog/contact helper, giữ thông tin email và số điện thoại từ nguồn thật.

## Menu đồ uống — 17/10/2026

Catalog hiện có 107 món ăn + 89 đồ uống = 196 mục, theo PDF đồ uống `NEW-2026-Oh-Sushi-37-A4-Vordruck.pdf`. Bốn cà phê mã 200–203 được thêm với giá và ký hiệu đúng nguồn; không tự thêm dung tích. Giữ 48 biến thể dung tích/giá. Nội dung email/cart dùng bản mới. Trang 11 có bảng ký hiệu đồ uống nên giao diện có legend riêng, thay ghi chú cũ “không có legend”. Các cập nhật 05/10 và 12/10 phía trên là lịch sử của các bản PDF trước.

## Bật lại đặt món — 26/10/2026

Khôi phục chức năng trước ngày tắt: `orders.js`, catalog nhúng 196 mục, nút thêm/chọn món, giỏ hàng trong header/mobile/floating desktop và form email nháp. Script build tiếp tục tạo controls/catalog từ 107 món + 89 đồ uống, giữ 87 lựa chọn giá và source menu hiện hành. Theme đen–trắng, logo màu gốc, lịch thứ Ba nghỉ và form đặt bàn không đổi. Các file PDF/email mẫu trong `.work/invoice-sample` là tài liệu thử riêng, không tham gia luồng đặt món hay bản build website.
