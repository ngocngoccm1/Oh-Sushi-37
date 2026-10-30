# Đặt bàn — Oh! Sushi 37

Yêu cầu ngày 14/10/2026 bổ sung đặt bàn và làm rõ đặt món. Quán cung cấp email `ohsushirestaurent@gmail.com` và số điện thoại `02943 9800335`. Luồng đặt bàn tạo yêu cầu qua email để quán phản hồi xác nhận.

## Luồng

1. Bấm Reservieren trong header, menu điện thoại hoặc thanh cố định dưới màn hình; cũng có Tisch reservieren ở hero và Tisch anfragen ở section đặt bàn.
2. Điền ngày, giờ mong muốn, số khách, tên và số điện thoại. Ghi chú tùy chọn.
3. Form kiểm tra lịch từ `openingHoursSpecification` trong Restaurant JSON-LD. Lịch cũ đến hết 07/11/2026: thứ Hai 08:00–22:00, thứ Ba nghỉ, thứ Tư–Sáu 11:30–22:00, thứ Bảy/Chủ nhật 11:30–22:30. Từ 08/11/2026: thứ Hai nghỉ, thứ Ba–Năm 11:30–22:00, thứ Sáu–Chủ nhật 11:30–22:30. `calendar.js` chọn openingHoursSpecification theo validFrom/validThrough của ngày khách chọn, không dùng lịch hôm nay cho mọi ngày tương lai. Ngày lễ có thể có giờ khác; form ghi rõ cần quán xác nhận. Giờ phải từ lúc mở cửa và trước lúc đóng cửa. Ngày/giờ đã qua bị chặn theo Europe/Berlin, kể cả khi thiết bị khách đang ở múi giờ khác.
4. E-Mail-Anfrage öffnen mở email nháp gồm thông tin khách và thời gian mong muốn. Khách cần gửi trong ứng dụng email; chỉ có đặt bàn sau khi quán xác nhận.
5. Anfrage kopieren sao chép cùng nội dung; nếu clipboard bị chặn, hiện ô văn bản để sao chép thủ công. Restaurant anrufen gọi số thực tế của quán.

Giữ form trong lượt truy cập, không lưu thông tin khách trong localStorage và không tự coi việc mở email là đặt bàn thành công. Không áp giới hạn sức chứa chưa được quán cung cấp; quán kiểm tra số khách khi phản hồi.

## Bảo trì

- `reservations.js`: kiểm tra dữ liệu và tạo nội dung yêu cầu.
- `contact.js`: đọc email quán từ JSON-LD, mở email nháp và sao chép.
- `dialogs.js`: native dialog, đóng bằng nút/Escape/click ngoài, giữ focus trong form và trả focus sau khi đóng. Mở từ navigation điện thoại sẽ đóng navigation trước, khôi phục focus về nút menu khi kết thúc.
- `index.html`: form semantic, nhãn, thông báo trạng thái và các CTA. Link trong section đặt bàn còn có mailto dự phòng khi JavaScript tắt.
- `styles.css`: hai cột trên desktop, một cột trên điện thoại; dialog cuộn trong viewport, nút đóng giữ trên cùng.

Không cần server trên GitHub Pages. Nếu quán cung cấp booking provider/endpoint sau này, thay bước mở draft bằng tích hợp và phản hồi từ dịch vụ thật.
