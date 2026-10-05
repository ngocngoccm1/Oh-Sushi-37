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
| Montag | Ruhetag — ảnh khách cập nhật 05/10/2026 |
| Dienstag–Donnerstag, Sonntag | 11:30–22:00 — ảnh khách cập nhật 05/10/2026 |
| Freitag–Samstag | 11:30–22:30 — ảnh khách cập nhật 05/10/2026 |
| Facebook | [Oh Sushi-37](https://www.facebook.com/share/1ErfTDVLSe/?mibextid=LQQJ4d) — Word |
| Instagram | [Oh Sushi-37](https://www.instagram.com/ohsushirestaurent?stkn=bzJxaWx1Nmh0MXlp&utm_source=qr) — Word |
| Brand palette | Word ban đầu: nâu–đen. Yêu cầu mới nhất: bám phong cách PDF. Bản mới lấy đen, vàng, đỏ và trắng của menu; xen giấy sáng để cân bằng. |
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

### [MINA Berlin](https://minaberlin.de/) — ĐÃ ĐÁNH GIÁ

Quan sát: hero photography lớn; display serif và sans gọn; navigation đi trực tiếp đến menu, giới thiệu và contact; narrative chuyển từ atmosphere sang cuisine, ảnh món và location. Booking là CTA rõ trong header. Website hiện tại dùng màu xanh và kem cùng typography Instrument.

Áp dụng nguyên tắc: dẫn từ cảm nhận món ăn đến lựa chọn món và đặt bàn; nhịp ảnh lớn xen typography; contact đầy đủ ở cuối. Bản hiện tại chọn bộ màu và chữ đậm từ PDF, không dùng lại hero ảnh vòm hoặc cặp serif mảnh của phiên bản trước.

### [CODA Berlin](https://coda-berlin.com/) — SECONDARY

Quan sát: hero ảnh chiếm gần trọn viewport; typography tự tin; layout ít phần tử; các khối philosophy/food/interior tạo nhịp khác nhau. Font GT Walsheim và GT Pressura Mono; màu gần đen. Navigation và logo được xử lý tối giản.

Áp dụng nguyên tắc: khoảng trống mạnh, khổ chữ lớn, ảnh là một phần composition. Không lấy bố cục logo góc phải, menu icon đặc trưng, text, texture hay photography của CODA.

### [Restaurant Tim Raue](https://tim-raue.com/) — ĐÃ ĐÁNH GIÁ

Quan sát: headline rất lớn, menu navigation đơn giản về mặt nội dung; link reservation được nhắc rõ; giờ mở cửa, điện thoại, email và địa chỉ tập trung. Giao diện hiện tại có màu hồng/pastel và lettering riêng.

Áp dụng nguyên tắc: reservation đơn giản, thông tin ghé quán dễ tìm, hierarchy heading mạnh. Không lấy palette, biểu tượng chim, gradient hay typography đặc trưng của Tim Raue.

### [NENI Berlin](https://nenifood.com/restaurants/berlin) — ĐÃ ĐÁNH GIÁ

Quan sát trong lượt truy cập lại: nền kem ở navigation, mảng lavender ở section menu, vàng và nâu ở logo/CTA; grotesk lớn; section menu và thông tin giờ rõ; nội dung xoay quanh cùng ăn và chia sẻ. Page có ảnh và thông tin nhóm/private celebrations.

Áp dụng nguyên tắc: chuyển mảng màu rõ giữa section và hospitality gắn với các sushi sets trong PDF. Không dùng palette lavender/vàng của NENI, font Roc Grotesk, bố cục hay ảnh của reference. Không thêm private events hay group booking khi khách chưa cung cấp dịch vụ đó.

## Nghiên cứu thêm cho bản thiết kế 02/10/2026

Đã tìm website chính thức, đọc nội dung, truy cập bằng Edge 1440×1000px và xem screenshot ở đầu trang/phần bên dưới. Các file screenshot chỉ nằm trong `.work/`, không được dùng làm asset của website khách hàng.

### [Sticks’n’Sushi](https://www.sticksnsushi.com/de/de/) — PRIMARY

Website chính thức tiếng Đức có ảnh lớn về món ăn và cùng ăn, navigation đến Menü/Reservierung/Takeaway, chuyển từ ảnh trải nghiệm sang menu rồi thông tin quán. Gần personality sushi và social dining của Oh! Sushi 37 hơn hướng fine dining thuần.

Áp dụng: ảnh làm một phần bố cục, đường đi rõ từ thương hiệu → món → chọn món/đặt bàn. Không lấy hình, logo, copy, chương trình Sake/loyalty/catering, menu hoặc giao diện đặt món của reference. Oh! Sushi 37 có masthead serif đậm phía trên ảnh–mảng vàng, không dùng hero lifestyle và cụm navigation dạng pill của Sticks’n’Sushi.

### [KINK Berlin](https://www.kink-berlin.de/de) — SECONDARY

Quan sát: lettering lớn, nền đen ở phần đầu, serif đậm và tương phản mạnh giữa các phần, màu khác nhau phục vụ từng phần nội dung. Chữ và graphic có cá tính thay vì những khối thông tin đồng dạng.

Áp dụng: tự tin về cỡ chữ, thay nhịp serif/grotesk và tương phản sáng–tối. Không lấy wordmark, lavender, copy, event grid, animation hoặc cấu trúc navigation của KINK. Không thêm events nếu tài liệu khách hàng không cung cấp.

### [OMA London](https://www.oma.london/) — ĐÃ ĐÁNH GIÁ

Quan sát: photography rất lớn, ít nội dung, danh sách contact/opening hours tiết chế. Không chọn làm reference chính vì palette và cuisine không gần tài liệu quán bằng Sticks’n’Sushi.

## Đọc lại visual identity của toàn bộ PDF

Đã xem lại đủ 14 trang trước khi code. Menu có nền gần đen, tre chìm, tên món vàng, description/giá trắng, serif đậm ở nhóm món và đường gạch chéo đỏ. Bìa có logo thật với vòng brush vàng, mặt trời/cổng torii đỏ và nigiri. Đây là nguồn màu/graphic chính của bản mới.

## Identity riêng

- Personality: modern Japanese & Asian casual dining, ấm và tinh tế; không tự gán fine dining hay chất lượng được chứng nhận.
- Palette hiện tại: đen `#151511`, vàng `#e5c04a`, đỏ `#a72d24`, giấy `#f2eee4`. Đỏ là màu nhấn cho thương hiệu/đặt món và phần chia sẻ; vàng dùng ở hero, tên món trên nền tối và reservation. Chữ phụ dùng neutral có đủ contrast. Không thêm olive, tím hoặc những accent ngoài hệ màu nguồn.
- Typography: Bodoni Moda variable 600–800 cho masthead/display, phù hợp high contrast serif đậm trong PDF; Manrope cho menu/navigation và heading preview. Font WOFF2 local, hai family, kèm OFL. Không lấy font độc quyền của reference.
- Grid: masthead tên quán khổ lớn; ảnh chữ nhật 62% cạnh mảng vàng 38%; navigation món bằng các đường kẻ; introduction giấy sáng/chữ trái/ảnh portrait bên phải; preview đen hai cột có leader chấm; statement chữ full-width trên đỏ; menu HTML trình bày như trang menu đen/vàng bên cạnh category navigation thoáng; reservation vàng; contact giấy và footer đen.
- Graphic: `assets/bamboo.svg` là họa tiết vector mới vẽ cho project, gợi tre trong PDF, độ tương phản thấp. Gạch chéo đỏ dưới heading nhóm món và tên/giá vàng bám menu thật. Bỏ ảnh dạng vòm, con dấu tròn và serif mảnh của phiên bản trước.
- Mobile: masthead hai dòng, ảnh phía trên mảng vàng với tagline/CTA hai cột; navigation món 2×2; introduction một cột, ảnh lệch; preview một cột; statement đỏ căn trái hai dòng; menu đen full-width với native category select và search, dish/variant wrap; thanh Bestellen cố định, safe area, dialog responsive. Tất cả input/select cỡ 16px ở mobile.
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
