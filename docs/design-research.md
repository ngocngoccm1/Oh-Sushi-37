# Oh! Sushi 37 — phân tích nội dung và thiết kế

## Tài liệu đã đọc

- **Yêu cầu chính:** `Tài liệu không có tiêu đề.docx`, toàn bộ paragraph và hyperlink trong Word, không có ảnh nhúng, header/footer hay note khác.
- **Menu chính:** `2026-Oh-Sushi-37-A4-Copyright.pdf`, toàn bộ 14 trang. PDF gồm ảnh raster CMYK, không có text để extract. Đã render từng trang, đọc trực tiếp và dùng OCR Đức/Anh để hỗ trợ đối chiếu; không đưa nguyên văn OCR chưa kiểm tra lên website.
- **Asset:** chỉ có hai tài liệu trên. Logo thật được lấy từ bìa PDF. Không có ảnh riêng của nhà hàng, nhân viên hay món ăn.

## Content inventory

| Trường | Nội dung / nguồn |
|---|---|
| Tên | Oh! Sushi 37 — Word |
| Ngôn ngữ | Đức — Word |
| Địa chỉ | Hellweg Straße 30, 59597 Erwitte — Word |
| Điện thoại | 02943 9800335 — Word |
| Email | ohsushirestaurent@gmail.com — Word |
| Montag–Donnerstag | 11:30–22:00 — Word |
| Freitag–Sonntag | 11:30–23:00 — Word |
| Facebook | [Oh Sushi-37](https://www.facebook.com/share/1ErfTDVLSe/?mibextid=LQQJ4d) — Word |
| Instagram | [Oh Sushi-37](https://www.instagram.com/ohsushirestaurent?stkn=bzJxaWx1Nmh0MXlp&utm_source=qr) — Word |
| Brand palette | Word ban đầu: nâu–đen. Sau các phản hồi giảm tối, giảm sáng/đơn điệu và tăng sự hài hòa, phiên bản hiện tại dùng taupe–walnut–đỏ rượu. |
| Ẩm thực | Nhật, Việt, châu Á — suy ra từ các món thật trong PDF |
| Menu | 105 món, 21 nhóm, 39 lựa chọn; xem `data/menu.json` và `docs/menu-transcription.md` |
| Dị ứng/phụ gia | 14 nhóm A–N và toàn bộ mã phụ gia trong PDF trang 2 |
| Booking URL / WhatsApp / order | Không được cung cấp hệ thống. Yêu cầu mới trong chat: đặt món. Hiện soạn yêu cầu qua email có thật của quán. |
| Domain / canonical | Không được cung cấp |
| Pháp lý / chủ thể vận hành | Không được cung cấp |
| Câu chuyện quán / chef / awards / reviews | Không được cung cấp |

CTA đặt bàn dùng `tel:029439800335`. Không tạo form booking, xác nhận đặt chỗ, dịch vụ giao hàng, rating hay testimonial. Địa chỉ hiển thị đúng Word, không tự đổi thành cách viết khác.

## Các website chính thức đã nghiên cứu

Đã search chính xác bốn câu theo brief, truy cập website chính thức bằng web tool, và kiểm tra giao diện/typography trên Chromium desktop 1440px. Không dùng ảnh, logo, font độc quyền, text, code hay animation từ những website này.

### [MINA Berlin](https://minaberlin.de/) — PRIMARY

Quan sát: hero photography lớn; display serif và sans gọn; navigation đi trực tiếp đến menu, giới thiệu và contact; narrative chuyển từ atmosphere sang cuisine, ảnh món và location. Booking là CTA rõ trong header. Website hiện tại dùng màu xanh và kem cùng typography Instrument.

Áp dụng nguyên tắc: dẫn từ cảm nhận món ăn đến lựa chọn món và đặt bàn; nhịp ảnh lớn xen typography; contact đầy đủ ở cuối. Oh! Sushi 37 dùng hero chữ lớn bên trái/ảnh dạng vòm bên phải, palette taupe–walnut–đỏ rượu, cặp font khác, không tái tạo hero centered hay bố cục MINA.

### [CODA Berlin](https://coda-berlin.com/) — SECONDARY

Quan sát: hero ảnh chiếm gần trọn viewport; typography tự tin; layout ít phần tử; các khối philosophy/food/interior tạo nhịp khác nhau. Font GT Walsheim và GT Pressura Mono; màu gần đen. Navigation và logo được xử lý tối giản.

Áp dụng nguyên tắc: khoảng trống mạnh, khổ chữ lớn, ảnh là một phần composition. Không lấy bố cục logo góc phải, menu icon đặc trưng, text, texture hay photography của CODA.

### [Restaurant Tim Raue](https://tim-raue.com/) — ĐÃ ĐÁNH GIÁ

Quan sát: headline rất lớn, menu navigation đơn giản về mặt nội dung; link reservation được nhắc rõ; giờ mở cửa, điện thoại, email và địa chỉ tập trung. Giao diện hiện tại có màu hồng/pastel và lettering riêng.

Áp dụng nguyên tắc: reservation đơn giản, thông tin ghé quán dễ tìm, hierarchy heading mạnh. Không lấy palette, biểu tượng chim, gradient hay typography đặc trưng của Tim Raue.

### [NENI Berlin](https://nenifood.com/restaurants/berlin) — SECONDARY

Quan sát trong lượt truy cập lại: nền kem ở navigation, mảng lavender ở section menu, vàng và nâu ở logo/CTA; grotesk lớn; section menu và thông tin giờ rõ; nội dung xoay quanh cùng ăn và chia sẻ. Page có ảnh và thông tin nhóm/private celebrations.

Áp dụng nguyên tắc: chuyển mảng màu rõ giữa section và hospitality gắn với các sushi sets trong PDF. Bản chỉnh mới kết hợp nhịp ảnh của MINA, chuyển màu của NENI và tiết chế typography của CODA. Không dùng palette lavender/vàng của NENI, font Roc Grotesk, bố cục hay ảnh của reference. Không thêm private events hay group booking khi khách chưa cung cấp dịch vụ đó.

## Identity riêng

- Personality: modern Japanese & Asian casual dining, ấm và tinh tế; không tự gán fine dining hay chất lượng được chứng nhận.
- Palette hiện tại (02/10/2026): taupe hero `#c7b7a0`, nền chung `#ddd3c5`, giấy menu `#e7ded1`, nền preview/sidebar `#d7cabb`, walnut `#484039` và mực `#342c27`. Đỏ rượu `#743e38` cho CTA/chữ nhấn; mảng reservation `#6c403a`. Chữ trên nền tối dùng cùng màu giấy `#eee5d8` và champagne nhạt `#dbc0ae`. Đã giảm saturation, bỏ mảng xanh olive/cam vàng/đỏ đất cạnh tranh; giữ nhịp sáng–trầm bằng độ đậm của cùng hệ màu ấm. Logo gốc giữ màu đỏ/vàng. Các màu dùng chung được gom thành CSS variables trong `:root`.
- Typography: Cormorant Garamond cho display; Manrope cho navigation và menu. Font open-source, lưu local, kèm OFL.
- Grid: hero ảnh vòm + typography lớn + dấu tròn thương hiệu; thanh navigation đến nhóm món; introduction ảnh trái/chữ phải; preview headline sticky trái và danh sách món phải; sharing đổi nhịp ảnh lớn; menu giấy ấm và sidebar có nền; reservation hai cột trên đỏ rượu; contact taupe nhạt, footer walnut.
- Mobile: hero chữ phía trên/ảnh vòm phía dưới, thanh nhóm món 2×2; intro chữ rồi ảnh; preview một cột; sharing ảnh rồi chữ; category select native, menu một cột, thanh CTA cố định 56px có safe area, dialog đặt món responsive. Input/select cỡ 16px để hạn chế zoom khi nhập trên iOS.
- Interaction: underline/hover và navigation transition nhẹ; không library animation; tôn trọng reduced motion.
- Architecture: HTML/CSS/JS thuần, menu sinh ra HTML lúc build để đọc được không cần JS. Filter chỉ ẩn/hiện semantic sections. Tất cả nguồn ảnh/font ở local.
- Ordering: catalog sinh từ cùng dữ liệu menu; giá tính bằng integer cents; lựa chọn lưu trong localStorage, thông tin liên hệ không được lưu. Soạn email theo địa chỉ thật, có sao chép/gọi điện thay thế. Không tạo xác nhận nhận đơn hoặc thông tin giao hàng khi chưa có hệ thống đó.

## Các điểm nguồn giữ nguyên

- PDF dùng số 33 cho cả TAMARIND và PHO IN LOVE; dùng số 42 cho SHRIMP LOVE JAKOBSMUSCHELN và FITNESS BOWL. Giữ nguyên số và phân biệt bằng category/name.
- Maki được ghi **2 STK.** trong header PDF, giữ đúng nguồn.
- BABY MINI TEMPURA có literal `[UNLESERLICH]` trong tên; không đoán lượng phần ăn.
- SUMO PLATTE bản Đức ghi **1 St. Nigiri**, bản Anh ghi **3 Nigiri**. Website tiếng Đức giữ **1 St. Nigiri**.
- Giữ nguyên allergen, kể cả các nhãn có vẻ không nhất quán như VEGGIE có mã cá/hải sản. Không tự chuyển thành badge vegan/gluten-free.
- PDF không có nhóm đồ uống; không tự tạo.

## Nội dung chưa có trong tài liệu

Ảnh hiện tại là ảnh minh họa tạo bằng imagegen, có ghi “Bildillustration” và alt phù hợp; không phải ảnh thực tế nhà hàng. Xem `docs/image-assets.md` để thay bằng ảnh khách cung cấp.

Chưa có dữ liệu pháp lý để soạn Impressum/Datenschutz hoàn chỉnh; chưa thêm các link pháp lý giả. Chưa có domain để đặt canonical và URL tuyệt đối cho OpenGraph. Khi khách bổ sung, cập nhật những mục này trước khi public website.
