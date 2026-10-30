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


## Bản chuẩn & giao diện mới — 12/10/2026

- Đã render và đọc đủ 12 trang food + 10 trang drinks. Hai PDF local khớp byte/checksum với file khách gửi. Menu có 107 món, 85 đồ uống, 31 category gốc và 7 nhóm điều hướng; 39 lựa chọn món + 48 lựa chọn dung tích/giá.
- Kiểm tra độc lập các sửa đổi của bản chuẩn: Baby Mini Tempura VEGIE/8 STK., mô tả Yakitori, Pho mã 34, Maki 6 STK. và mã M6–M15, thêm M15 Tori Maki / U26 Tori I.O, U16–U23/U25, BEST FRIEND PLATTE, Sumo 3 Nigiri, IKIGAI DELUXE riêng 12 STK. Giữ “HÄNSCHENSCHENKEL” đúng chữ in trong PDF.
- HTML/catalog đối chiếu 192 mã, tên, mô tả, ký hiệu, trang nguồn, giá và giá lựa chọn; cả hai link tải PDF trả 200. Địa chỉ, giờ thứ Hai nghỉ, email và QR giữ đúng thông tin khách đã xác nhận.
- Viewport 320/375/390/430/768/1024/1440/1920: không overflow ở trang đầu, tất cả 31 category và 7 nhóm; đủ 7 nhóm ngay đầu trang. Đã xem screenshot thật của hero, menu khai vị, sushi, món chính, đồ uống, story/QR ở mobile 320/390 và desktop 1440.
- Kiểm tra click nhóm, subnavigation, native select mobile, active state, tìm kiếm Tori (5 kết quả có Tori trong nguồn), no-results/clear, deep link category/nhóm/allergen, navigation mobile/Escape/focus, reduced motion, menu 192 mục khi tắt JS. Tất cả pass.
- Kiểm tra trang dưới prefix `/Oh-Sushi-37/`: HTML, JS, CSS, font, ảnh và PDF dùng đường dẫn tương đối, không lỗi asset. Root `index.html` và `.nojekyll` hỗ trợ GitHub Pages, không yêu cầu framework/build runtime.
- axe: default 390/1440, navigation mobile, toàn bộ 192 mục/legend, giỏ hàng mobile/desktop, hộp lựa chọn và giỏ rỗng: 0 violations. Không có lỗi JavaScript, link nội bộ hỏng hoặc request tới third party lúc tải trang.
- Ordering: kiểm tra biến thể, beilage, giới hạn số lượng, tính tiền, lưu/tải lại, email nháp/copy fallback; không gửi email thử. Các món mới và khẩu phần/dung tích được kiểm tra riêng ở cả tám kích thước; đơn 2×Tori Maki + Tori I.O + IKIGAI DELUXE + nước ép + vang 0,7 l tổng 80,60 € đúng giá. Khóa Maki cũ được loại thay vì ghép sang món mới.
- Build static chạy lại phải cho cùng HTML. Ảnh hiện hành đều lấy từ PDF khách cung cấp, caption/alt ghi rõ; ảnh AI và file PDF cũ không còn được tham chiếu trong giao diện.

## Đặt bàn và đặt món — 14/10/2026

- Thêm form đặt bàn từ header/hero/section đặt bàn/navigation điện thoại/thanh dưới. Ngày, giờ, số khách, tên và số điện thoại bắt buộc; ghi chú tùy chọn. Lịch đọc trực tiếp từ Restaurant JSON-LD theo Europe/Berlin. Không gửi email hoặc đơn thử tới quán.
- Kiểm tra thứ Hai nghỉ, ngày đã qua, giờ trước mở cửa/đúng giờ đóng cửa, thứ Sáu 22:15 được phép và Chủ Nhật 22:15 bị chặn, giờ đã qua trong ngày, số khách 0/số lẻ/để trống, tên chỉ chứa khoảng trắng. Email có đúng địa chỉ, ngày tiếng Đức, giờ địa phương, số khách, tên, điện thoại và Unicode ghi chú. Sao chép và fallback textarea pass.
- Kiểm tra form tại 320/375/390/430/768/1024/1440/1920px: không tràn ngang. Xem screenshot thực tế form, hero và section đặt bàn trên mobile 320/390 và desktop 1440. Viewport thấp 320×480 vẫn cuộn được tới thông tin khách và nút đóng luôn trong màn hình.
- Tab/Shift+Tab giữ focus trong dialog, Escape/nút đóng trả focus, navigation mobile đóng và bỏ inert trước khi mở form, đổi giữa giỏ/form chỉ có một dialog và body lock được giải phóng đúng. Reload không giữ thông tin khách.
- Chạy lại giỏ hàng: 192 mục/87 giá lựa chọn khớp nguồn, biến thể/beilage, số lượng/tổng tiền, tăng/giảm/xóa, persistence/dữ liệu hỏng, email nháp và copy fallback pass. Hero dẫn tới menu và focus bộ lọc mobile.
- Chạy lại toàn bộ trang/menu ở tám viewport, 31 category/7 nhóm, tìm kiếm/deep link/navigation, ảnh decode, link nội bộ, PDF, schema và no-JS. Kiểm tra prefix GitHub Pages `/Oh-Sushi-37/` bao gồm các JS mới: pass, không lỗi asset hoặc JavaScript.
- axe: form đặt bàn/copy fallback 390/1440, giỏ hàng mobile/desktop/hộp lựa chọn/giỏ rỗng, trang mặc định 390/1440 và navigation mobile đều 0 violations.

## Menu đồ uống mới — 17/10/2026

- Đọc text và ảnh render đủ 12 trang `NEW-2026 Oh Sushi 37 A4 Vordruck.pdf`; lưu bản nguyên byte tại `NEW-2026-Oh-Sushi-37-A4-Vordruck.pdf`. SHA256: `78e7d9336f6038c56055b0d6f40aa558fe3f508f62fa4f11bf59ecb44504a570`. Link tải trên trang trả HTTP 200 và đúng byte nguồn.
- 89 đồ uống / 10 category / 48 lựa chọn dung tích, thêm 200 KAFFE 3,20 € (9), 201 ESPRESSO 3,00 € (9), 202 DOPPELTER ESPRESSO 3,90 €, 203 CAPPUCCINO 3,50 €. Đối chiếu độc lập 89 mã và 113 mức giá với text PDF; kiểm tra bằng mắt tên, mô tả, dung tích, ký hiệu và bảng mã trang 11. Giữ đúng cách viết trong nguồn mới.
- Bảng dị ứng/phụ gia đồ uống được dựng từ dữ liệu riêng, có accordion và deep link; giữ nguyên bảng của món ăn. Ghi chú “không có legend” đã thay bằng hướng dẫn tới hai bảng. Không tự thêm dị ứng hoặc đổi mã nguồn.
- Menu HTML và catalog hiện có 196 mục, tên/mô tả/giá/ký hiệu/trang nguồn/biến thể khớp dữ liệu. Toàn bộ 107 món ăn và Restaurant JSON-LD không đổi. Giờ trên trang 11 PDF khác lịch khách đã xác nhận trực tiếp; giữ thứ Hai nghỉ theo yêu cầu trước, có ghi nhận ở `client-updates.md` và thông báo trong chat.
- Kiểm tra toàn trang, 31 category và 7 nhóm tại 320/375/390/430/768/1024/1440/1920px: không tràn ngang, ảnh decode được, link nội bộ và PDF hoạt động, không lỗi JavaScript. Tìm kiếm, deep link, navigation mobile/Escape, no-JS đủ 196 mục và đường dẫn GitHub Pages `/Oh-Sushi-37/` pass. Root index.html giữ nguyên vị trí.
- Xem screenshot menu cà phê mới và legend ở 320/390/1440px; kiểm tra giỏ mới trên điện thoại/desktop. Thêm 2×KAFFE, ESPRESSO, DOPPELTER ESPRESSO, CAPPUCCINO, nước ép, whisky 2 cl và 4 cl, vang 0,7 l, HUGO: 9 dòng / 10 đồ uống tổng 60,20 € đúng. Email nháp giữ mã, giá, số lượng/dung tích; reload giữ đúng tổng. Email kiểm thử bị chặn, không gửi tới quán.
- Chạy lại kiểm tra giỏ chung: biến thể, beilage, giới hạn số lượng, tính tiền, tăng/giảm/xóa, persistence, dữ liệu hỏng, sao chép/fallback và keyboard/focus pass. Axe: toàn bộ menu, cà phê với legend mở và giỏ đồ uống mới 390/1440, giỏ chung/hộp biến thể/giỏ rỗng: 0 violations. Build chạy lại cho cùng index.html; git diff --check sạch.

## Theme đen–trắng và giờ mới — 24/10/2026

- Tham khảo lại website CODA trực tiếp, chuyển palette UI sang đen/xám/chữ trắng, bỏ nền giấy/tre và graphic đỏ/vàng. Logo hiển thị grayscale, file gốc giữ nguyên; ảnh món/đồ uống là ảnh của khách. Không thêm tuyên bố xếp hạng hoặc sao.
- Đồng bộ giờ khách yêu cầu: Monday 08:00–22:00, Tuesday nghỉ, Wednesday–Friday 11:30–22:00, Saturday–Sunday 11:30–22:30. Bảng giờ, meta, hero, reservation copy và JSON-LD khớp. Form lấy giờ từ JSON-LD, thông báo thứ Ba nghỉ.
- Kiểm tra lịch với đồng hồ cố định tại Europe/Berlin: thứ Hai 07:59 bị chặn, 08:00/21:59 hợp lệ, 22:00 bị chặn; thứ Ba nghỉ; thứ Tư từ 11:30; thứ Sáu 22:15 bị chặn; Chủ nhật 22:15/22:29 hợp lệ, 22:30 bị chặn. Ngày/giờ đã qua vẫn bị chặn. Email thử thứ Hai 08:00 đúng ngày/giờ, copy/fallback pass; không gửi email thực tế.
- Full page và 31 category / 7 nhóm tại 320/375/390/430/768/1024/1440/1920px: không overflow, ảnh decode được, không lỗi asset/link nội bộ/JavaScript. Chạy lại tìm kiếm, deep link, navigation mobile/keyboard, no-JS đủ 196 mục và GitHub Pages prefix.
- Xem ảnh chụp thực tế hero 320/390/768/1440, intro/sharing/menu/drinks/reservation/contact và form mobile/desktop. Kiểm tra màu computed của các surface: đen/xám trung tính, không còn texture giấy/tre. Bản in menu nền trắng/chữ đen.
- Axe: trang mặc định và form đặt bàn 390/1440, navigation mobile, toàn bộ menu, giỏ hàng mobile/desktop, hộp biến thể và giỏ rỗng đều 0 violations. Chạy lại toàn bộ giỏ: biến thể, beilage, quantity, tổng tiền, persistence/dữ liệu lỗi, email/copy/fallback, Tab/Escape/focus pass. Dữ liệu 107 món + 89 đồ uống và các PDF không chỉnh.

## Tắt đặt món mang về — 25/10/2026

- Không còn nút Bestellen/Hinzufügen, giỏ hàng, form gửi đơn, catalog hoặc request orders.js. Xóa script chức năng đặt món và generation controls/catalog khỏi build; build lặp lại giữ trạng thái tắt. Có giỏ hợp lệ từ bản cũ trong localStorage cũng không làm hiện lại chức năng.
- Hero/thanh điện thoại dẫn tới menu xem món/giá, focus đúng bộ lọc mobile/search desktop. Đặt bàn từ section/mobile navigation/thanh dưới vẫn mở form; Tab/Escape/focus, email nháp/copy/fallback và lịch mới tiếp tục pass. Email kiểm thử bị chặn, không gửi tới quán.
- Kiểm tra 320/375/390/430/768/1024/1440/1920px: không tràn ngang, header không có giỏ trống hoặc khoảng chừa icon, thanh dưới có Reservieren/Speisekarte. Xem screenshot thực tế hero mobile/desktop và menu mobile.
- Chạy lại 196 mục / 31 category / 7 nhóm, tên/mô tả/giá/biến thể/ký hiệu, tìm kiếm/deep link/native select/mobile navigation, ảnh/link/PDF và no-JS, GitHub Pages prefix: pass. Dữ liệu menu và Restaurant JSON-LD không đổi.
- Axe trang và form đặt bàn 390/1440, navigation mobile và toàn bộ menu: 0 violations. Không lỗi JavaScript/asset. Bản in ẩn header/form, menu nền trắng/chữ đen.

## Bật lại đặt món — 26/10/2026

- Khôi phục chọn món/biến thể, giỏ, số lượng/tổng tiền, persistence, email nháp/copy/fallback và các CTA đặt món. Build tạo lại controls và catalog 196 mục từ dữ liệu hiện hành; chạy lại build cho cùng index.html. Dữ liệu menu, Restaurant JSON-LD, giờ mở cửa, liên hệ và form đặt bàn không đổi.
- Đối chiếu toàn bộ catalog với 107 món + 89 đồ uống và 87 lựa chọn giá. Chọn nhiều biến thể/beilage, quantity 1–99, tăng/giảm/xóa, giỏ rỗng, tải lại, dữ liệu lưu hỏng/giá giả, email có đúng món/giá và copy/fallback: pass. Email kiểm thử bị chặn, không gửi tới quán.
- Kiểm tra giỏ/cấu hình và toàn bộ menu tại 320/375/390/430/768/1024/1440/1920px: không tràn ngang. Xem screenshot thật giỏ hàng mobile/desktop và hộp chọn món mobile. Nội dung 196 mục, 31 category/7 nhóm, tìm kiếm/deep link, navigation, no-JS và GitHub Pages prefix tiếp tục pass.
- Kiểm tra riêng 4 cà phê mới, whisky 2 cl/4 cl, vang 0,7 l, tổng mẫu 60,20 €, persistence và email nháp. PDF menu tải đúng byte nguồn; legend đồ uống mở đúng.
- Chạy lại form đặt bàn với lịch thứ Hai 08:00, thứ Ba nghỉ, thứ Sáu 22:00 và cuối tuần 22:30; Tab/Escape/focus, email/copy/fallback pass. Axe giỏ 390/1440, hộp biến thể, giỏ rỗng, đồ uống/cà phê/legend, form đặt bàn, trang mặc định/navigation mobile: 0 violations. Không tích hợp email gửi tự động hoặc PDF hóa đơn vào luồng đặt món trong đợt này.

## Ưu đãi đến hết 07/11 và giờ mới từ 08/11 — 30/10/2026

- Khách chọn chỉ hiện thông báo ưu đãi 20%, giữ giá gốc. Banner ghi bis einschließlich 07.11.2026; đến hết ngày 07/11 theo Europe/Berlin, ẩn từ 00:00 ngày 08/11. Không suy diễn ngày bắt đầu, phạm vi/điều kiện hoặc trừ tiền trong giỏ.
- Bảng giờ hiển thị hai giai đoạn có ngày rõ ràng. Giữ lịch cũ đến hết 07/11; từ 08/11 thứ Hai nghỉ, thứ Ba–Năm 11:30–22:00, thứ Sáu–Chủ nhật 11:30–22:30. Có ghi chú ngày lễ có thể khác. JSON-LD có 4 mục validThrough 07/11 và 3 mục validFrom 08/11.
- `calendar.js` đọc lịch từ JSON-LD; form chọn lịch theo ngày khách đặt, không áp lịch hôm nay cho ngày tương lai. Kiểm tra 23 trường hợp: thứ Hai 02/11 từ 08:00, thứ Ba 03/11 nghỉ, thứ Sáu 06/11 trước 22:00, thứ Hai 09/11 nghỉ, thứ Ba 10/11 từ 11:30 đến trước 22:00, thứ Sáu 13/11 và cuối tuần đến trước 22:30; ngày/giờ đã qua bị chặn. Nội dung email thứ Ba 10/11 11:30 đúng ngày/giờ; chặn gửi thực tế trong test.
- Kiểm tra trước/sau mốc 07/11 23:59:59 → 08/11 00:00 theo giờ Đức, với thiết bị dùng Asia/Bangkok và America/Los_Angeles. Timer chuyển ngày trên tab đang mở tự ẩn ưu đãi/lịch cũ, đổi summary và min date trong form; visibility/pageshow làm mới khi quay lại tab.
- Viewport 320/375/390/430/768/1024/1440/1920 cho cả trước/sau mốc chuyển: không overflow. Xem screenshot hero/banner và bảng giờ trên mobile/desktop. Khi tắt JS, hai bảng vẫn có ngày hiệu lực rõ ràng, hero dùng thông tin ngày chuyển, banner mặc định ẩn để không quảng cáo ưu đãi hết hạn.
- Axe trước/sau ở 390/1440: 0 violations. Chạy lại toàn bộ menu 196 mục/31 category/7 nhóm, tìm kiếm/deep link/mobile navigation, ảnh/PDF/link, no-JS và GitHub Pages prefix: pass. Giá, catalog, preview, legend, dữ liệu món ăn/đồ uống và orders.js khớp nguyên bản trước đợt này.
- Giỏ hàng/biến thể/beilage/số lượng/tổng tiền/persistence/dữ liệu hỏng/email/copy/fallback/keyboard tại tám viewport pass; axe giỏ mobile/desktop/hộp chọn món/giỏ rỗng 0 violations. Build idempotent và git diff --check sạch. Không thêm dịch vụ bên ngoài.
