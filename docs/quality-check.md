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
