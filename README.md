# 🎉 Website Mừng Sinh Nhật Nguyễn Thành Trung (06/11/2012) - Lớp 9C2

Website sinh nhật tone Xanh dương & Trắng, sticker mèo cute, khóa mật khẩu ngày sinh và lời chúc đỗ THPT Nam Tiền Hải.

## 🚀 Cách Đưa Lên GitHub Pages Để `index.html` Hoạt Động Ngay

Dự án đã được cấu hình đường dẫn tương đối (`base: './'`) để tương thích 100% với GitHub Pages:

### Cách 1: Tải trực tiếp thư mục `dist` lên GitHub (Nhanh nhất)
1. Thư mục `dist/` đã được build sẵn gồm:
   - `index.html`
   - `assets/` (chứa toàn bộ JS, CSS và hình ảnh sticker mèo)
2. Bạn chỉ cần tải toàn bộ nội dung bên trong thư mục `dist/` lên repository GitHub của bạn.
3. Vào **Settings** của repository trên GitHub -> mục **Pages**:
   - Source: chọn **Deploy from a branch**
   - Branch: chọn **main** (hoặc `master`), thư mục **/ (root)** -> bấm **Save**.
4. Chờ 1 phút, trang web `index.html` của bạn sẽ hoạt động ngay tại đường dẫn `https://<ten-user>.github.io/<ten-repo>/`!

### Cách 2: Tự động deploy bằng GitHub Actions
Dự án đã tích hợp sẵn file `.github/workflows/deploy.yml`. Khi bạn push toàn bộ mã nguồn lên GitHub:
1. Vào **Settings** -> **Pages** -> Source: chọn **GitHub Actions**.
2. GitHub sẽ tự động build và xuất bản trang web của bạn mỗi khi bạn cập nhật code.

---
© 2026 nguyentrung_notsafe. All rights reserved .
