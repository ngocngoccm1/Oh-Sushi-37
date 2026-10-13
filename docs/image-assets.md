# Asset hiện hành — 12/10/2026

Ảnh đang dùng trong website được crop từ bản PDF chuẩn khách cung cấp; không lấy ảnh nhà hàng tham khảo và không sửa nội dung ảnh bằng AI.

| Asset | Nguồn | Xử lý |
| --- | --- | --- |
| `menu-sushi-640/960/1536.webp` | PDF món ăn trang 11, phần ảnh dưới menu Sushi Set | Crop bỏ toàn bộ chữ menu; WebP, giữ tỉ lệ; bản lớn thực tế 1415px, khai báo srcset đúng 1415w |
| `menu-craft-480/960.webp` | PDF món ăn trang 8, phần ảnh dưới Fusion Rolls | Crop phần ảnh, giữ bàn tay và món, object-fit cho portrait |
| `menu-drinks-480/960.webp` | Bìa PDF đồ uống | Crop bỏ logo và heading, WebP responsive |
| `menu-blossom-960.webp` | PDF đồ uống trang 2 | Ảnh trang trí nền section chia sẻ; alt rỗng, lazy load, phủ nâu để chữ rõ |
| `paper.svg`, `bamboo.svg` | Vector riêng của project | Texture nhẹ dùng bằng CSS, không sao chép từ website tham khảo |

Các ảnh có caption nguồn trên giao diện và alt mô tả những gì ảnh thể hiện. Chúng không chứng minh ảnh thực tế tại địa điểm nhà hàng. Hai font local Bodoni Moda/Manrope giữ giấy phép OFL như trước. QR địa chỉ không thay đổi.

---

## Lịch sử asset trước 12/10/2026 (không còn dùng ảnh AI trên trang hiện hành)

# Ảnh sử dụng

Project ban đầu không có ảnh món ăn, ảnh nhà hàng hay ảnh nhân viên. Có logo trong trang bìa PDF; logo này được crop từ nguồn khách cung cấp, không thiết kế lại.

Hai ảnh món ăn là **ảnh minh họa** tạo bằng **built-in imagegen**, không phải ảnh thực tế Oh! Sushi 37. Website có caption `Bildillustration` và alt mô tả rõ. Không dùng ảnh từ các website tham chiếu.

## Ảnh hero

Các file trong project:

- `assets/sushi-hero-640.webp`
- `assets/sushi-hero-960.webp`
- `assets/sushi-hero-1536.webp`

Prompt cuối cùng:

```text
Use case: photorealistic-natural. Asset type: editorial sushi restaurant website hero illustration, wide landscape 1536x1024. Primary request: an exquisite natural food photograph of salmon nigiri, tuna nigiri and a few salmon avocado maki arranged on a large irregular dark charcoal ceramic plate, on a warm dark walnut tabletop. This is an illustrative placeholder for a Japanese and Asian restaurant, not a depiction of their actual dishes. Composition: overhead to slight 35 degree angle, large platter occupies the right two thirds of image, crop some platter edges at bottom and right, left quarter mostly dark walnut negative space. Small restrained wasabi and ginger at edge, dark chopsticks near upper right. Lighting: intimate warm directional window light from upper right, subtle highlights on fresh salmon, beautifully detailed rice grains and ceramic texture, rich chocolate brown and near black shadows, vibrant but believable salmon orange and muted green. Premium independent hospitality magazine photography, tactile, appetizing, no stylized illustration. No text, no logos, no watermark, no people, no interior, no collage.
```

## Ảnh preparation

Các file trong project:

- `assets/sushi-craft-480.webp`
- `assets/sushi-craft-960.webp`

Prompt cuối cùng:

```text
Use case: photorealistic-natural. Asset type: illustrative editorial food photography for sushi restaurant website, portrait 1024x1536. Primary request: close-up photograph of anonymous hands gently forming salmon nigiri on a dark walnut cutting surface, a black ceramic small plate with three beautiful simple salmon nigiri in the lower foreground. Only hands and a little black apron at top, no face, no recognizable restaurant or identity, no claim of actual restaurant staff. Human tactile craft detail, naturally shaped rice grains, very simple fresh salmon with no sauce and no decorations, a bamboo sushi mat partially visible at side. Composition: portrait, lower plate sharp, hands in upper third, dark quiet background. Warm amber side light, espresso brown and charcoal near-black palette with vibrant orange salmon, film photography, restrained quiet luxury, subtle film grain, realistic natural food, no text, no logo, no watermark, no collage.
```

## Thay ảnh thật

Hero nhận ảnh ngang; ảnh preparation nhận ảnh dọc. Có thể xuất WebP cùng tên và kích thước tương ứng để thay trực tiếp. Nếu thay tên, cập nhật `src`, `srcset`, preload và OpenGraph trong `index.html`. Các khối ảnh dùng `object-fit: cover`, không stretch.

Sau khi thay ảnh, cập nhật alt/caption phù hợp ảnh thật và kiểm tra crop trên điện thoại. Không gán ảnh minh họa cho một món cụ thể hoặc xem ảnh preparation là ảnh chef của quán.

## Logo và font

- `assets/logo.webp`: crop logo nguyên bản từ bìa PDF.
- `assets/favicon.png`: crop biểu tượng từ cùng logo.
- `assets/fonts/`: Bodoni Moda và Manrope được website tải local, nguồn Google Fonts, file OFL đi kèm. Cormorant Garamond của bản trước còn được lưu nhưng không được load trong giao diện hiện tại. Không có request Google Fonts khi khách mở website.
