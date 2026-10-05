# Quality check — 02/10/2026

Kiểm tra bằng Playwright trên Microsoft Edge, phục vụ project qua HTTP local. Bản hiện tại đã thiết kế lại theo PDF: đen–vàng–đỏ, giấy sáng, Bodoni Moda/Manrope, masthead lớn và ảnh chữ nhật. Đã xem ảnh render desktop/mobile, giữ nguyên toàn bộ menu và luồng đặt món.

## Responsive

| Viewport | Toàn trang | Tất cả nhóm menu |
|---|---|---|
| 320px | Không tràn ngang; ảnh/font tải đúng | Pass |
| 375px | Không tràn ngang; ảnh/font tải đúng | Pass |
| 390px | Không tràn ngang; ảnh/font tải đúng | Pass |
| 430px | Không tràn ngang; ảnh/font tải đúng | Pass |
| 768px | Không tràn ngang; ảnh/font tải đúng | Pass |
| 1024px | Không tràn ngang; ảnh/font tải đúng | Pass |
| 1440px | Không tràn ngang; ảnh/font tải đúng | Pass |
| 1920px | Không tràn ngang; ảnh/font tải đúng | Pass |

Đã chọn lần lượt 21 nhóm và “Die ganze Karte” ở mỗi kích thước để kiểm tra overflow. Mobile có layout riêng, menu một cột, native select và CTA cố định với safe area. Món có variant dài vẫn wrap đúng ở 320px.

Bản mới đã kiểm tra lại tám viewport và tất cả nhóm món. Đã phát hiện và sửa link Fusion Rolls tràn ngang ở 320px bằng grid có cột co được và typography riêng cho màn hình hẹp. Kiểm tra dialog đặt món cũng chạy đủ tám viewport. Đã xem hero 320/375/390/430/768/1024/1440/1920px, menu điện thoại, ảnh/crop và các section desktop.

## Nội dung và interaction

- 105 món và 39 giá variant trong HTML khớp bản chép đã đối chiếu trực tiếp từ PDF. Không có món bị ghi đè do số trùng.
- Allergen và phụ gia có legend HTML, giữ mã nguồn, không suy ra thêm dietary badge.
- Link anchor trong trang đều trỏ tới id có thật. PDF trả HTTP 200.
- Số điện thoại, email, địa chỉ, giờ từng ngày và social lấy từ Word.
- Menu điện thoại mở/đóng; Escape đóng và trả focus; focus trap; main/footer inert trong khi navigation mở.
- Chọn Sushi Set hiển thị 9 món; Hauptspeisen hiển thị 4 món; Sauce hiển thị 4 món.
- Tìm “Lachs” tìm trên toàn bộ menu. Query không khớp có trạng thái rõ ràng. Xóa search trả toàn bộ 105 món.
- Các link preview, link Sushi Sets và URL có `#menu-sets` mở đúng nhóm.
- Link `#allergene` tự mở legend.
- Khi không có JavaScript, đủ 105 món vẫn đọc được và link nhóm hoạt động bằng anchor.
- `prefers-reduced-motion: reduce` tắt smooth scroll và transitions.
- Không có lỗi JavaScript hoặc request asset 4xx/5xx trong lượt kiểm tra cuối.

## Giỏ hàng và đặt món

- 105 khóa món duy nhất, 105 tên và toàn bộ giá/39 biến thể trong catalog khớp dữ liệu menu nguồn.
- Thêm món cố định; bắt buộc chọn biến thể hoặc beilage nếu nguồn có lựa chọn; các biến thể khác nhau của cùng món có dòng riêng.
- Giới hạn 1–99 mỗi lựa chọn; giá và tổng tiền tính bằng integer cents. Đã kiểm tra tăng/giảm/xóa và focus sau khi cập nhật.
- Giỏ lưu và khôi phục khi reload. Không lưu tên/số điện thoại/ghi chú. Dữ liệu storage hỏng, mã không có thật và số lượng sai bị loại; giá tự chèn trong storage không được dùng.
- Nội dung email có mã biến thể, tên, lựa chọn, số lượng, tổng và contact; recipient đúng email trong Word. Trong kiểm thử đã chặn mailto, không gửi email thật.
- Sao chép đơn hoạt động; fallback textarea khi clipboard bị từ chối. Mở email không tự xóa giỏ và không hiển thị xác nhận nhận đơn giả.
- Cart/configurator không tràn ngang ở đủ 8 viewport trong bảng. Kiểm tra riêng viewport 320×480px để đảm bảo form dài có thể cuộn và nút gửi/sao chép/gọi điện tiếp cận được.
- Native modal kết hợp focus trap; Tab giữ focus bên trong, Escape đóng và trả focus về nút mở. Input/select mobile 16px.
- Đã xem screenshot giỏ, chọn biến thể và checkout trên điện thoại; giỏ desktop. Bước nhận đơn hiện là email nháp cần khách gửi và quán phản hồi, chưa có backend nhận đơn.

## Accessibility tự động

Dùng axe-core 4.13.0, các rules `wcag2a`, `wcag2aa`, `wcag21aa`, `best-practice`:

- 390px, trạng thái mặc định: 0 violations.
- 1440px, trạng thái mặc định: 0 violations.
- Navigation mobile đang mở: 0 violations.
- Toàn bộ 105 món và legend allergen đang mở: 0 violations.
- Giỏ hàng có món ở 390px/1440px, chọn biến thể mobile và giỏ rỗng: 0 violations.

Có semantic landmarks, một h1, heading hierarchy, alt, focus states, skip link và label cho controls. Kiểm tra tự động không thay thế đầy đủ đánh giá accessibility bằng người dùng thực tế.

## Hiệu năng và SEO

- Không dùng framework hoặc library trên website. HTML/CSS/JS thuần.
- Menu là HTML tĩnh, không phụ thuộc request JSON hoặc JavaScript để hiển thị nội dung.
- Hero WebP có srcset/preload/fetchpriority; ảnh dưới fold lazy load, có width/height và crop responsive.
- Font WOFF2 local, font-display swap; hai family, kèm giấy phép OFL.
- Không có request tới third-party trong lượt tải trang. Map/social chỉ mở khi bấm link.
- Title, description, OpenGraph, favicon và Restaurant JSON-LD hiện diện. Schema dùng thông tin thật trong Word.
- Chưa đặt canonical hoặc URL tuyệt đối OpenGraph vì chưa được cung cấp domain.

## Giới hạn dữ liệu

Ảnh hiện tại là minh họa được tạo bằng imagegen, có ghi chú; chưa có ảnh thật của quán. Tài liệu không có nội dung pháp lý đầy đủ hoặc booking URL. Các điểm chưa rõ/sai khác trong PDF được ghi tại `docs/design-research.md`; website giữ dữ liệu nguồn Đức, không tự đoán.

## Cập nhật giờ và QR — 05/10/2026

- Giờ trong ảnh khách gửi được cập nhật ở bảng giờ, hero/reservation, meta description và Restaurant JSON-LD. Montag là Ruhetag; Dienstag–Donnerstag/Sonntag 11:30–22:00; Freitag/Samstag 11:30–22:30. Địa chỉ và tên quán giữ nguyên.
- QR SVG footer mở đúng link Google Maps hiện có của quán, có vùng trống bốn module. Đã dùng bộ đọc barcode độc lập (zxing-cpp) giải mã ảnh render thực tế ở viewport 320, 390 và 1440px; cả ba trả đúng URL đích. Không dùng QR localhost hoặc URL website phỏng đoán.
- Đã xem screenshot bảng giờ và QR ở 320/390/1440px; chạy lại đủ tám viewport 320–1920px, tất cả nhóm menu, kiểm tra ảnh/link/JavaScript/no-JS/reduced motion: pass.
- axe: trang mặc định 390/1440px và navigation mobile 0 violations. Kiểm tra nội dung 105 món, schema, link và toàn bộ menu/allergen cũng pass.

## Menu đồ uống mới — 05/10/2026

- Đọc/render đủ 10 trang PDF `2026 Oh Sushi 37 Drink Demo 2.pdf`, đối chiếu thủ công tên, mã, giá, dung tích, mô tả và ký hiệu. Thêm 85 đồ uống / 10 nhóm, giữ 105 món cũ; tổng 190 mục / 31 nhóm và 87 lựa chọn giá. PDF lưu nguyên vẹn, checksum trùng file khách cung cấp; link riêng trả HTTP 200.
- Đối chiếu HTML và catalog với cả hai bản chép: tên, mô tả, giá cố định và 87 giá biến thể đều khớp. Mỗi mục có tên file và trang nguồn. Build chạy lại không đổi kết quả.
- Menu có lối vào Speisen/Getränke và native select chia nhóm trên điện thoại. Tìm kiếm đồ uống ẩn các nhóm bia không có kết quả. Không áp legend của món ăn cho ký hiệu đồ uống thiếu bảng giải thích trong PDF.
- Kiểm tra 320/375/390/430/768/1024/1440/1920px, toàn bộ nhóm menu, navigation mobile, tìm kiếm, deep link, reduced motion và no-JS: không overflow, ảnh hỏng, link nội bộ hỏng hoặc lỗi JavaScript. Đã xem screenshot thực tế phần đồ uống/đơn hàng ở 320/390px và desktop 1440px.
- Kiểm tra thêm nước ép dung tích cố định, hai mã bia cùng tên, rượu vang 0,2 l/0,7 l, whisky 2 cl/4 cl, số lượng, dòng giỏ riêng, tổng tiền, lưu/tải lại và nội dung email có dung tích. Đơn mẫu 6 dòng / 7 đồ uống tổng 62,70 € đúng cộng từng giá; email bị chặn trong test, không gửi đơn thử.
- axe: toàn bộ 190 mục và legend mở, toàn bộ đồ uống, hộp chọn dung tích mobile và giỏ đồ uống ở 390/1440px đều 0 violations. Kiểm tra schema xác nhận giờ mới và địa chỉ cũ vẫn đúng; QR footer giữ nguyên đích Google Maps đã xác minh.
