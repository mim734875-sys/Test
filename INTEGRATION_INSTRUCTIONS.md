# Hướng dẫn tích hợp Rawlink UI

1. Thêm file HTML (RawLinkPanel.html) vào template nơi bạn muốn nút "Tạo Rawlink" xuất hiện.
2. Import CSS và JS (rawlink.css, rawlink.js) vào bundler hoặc layout:
   - <link rel="stylesheet" href="/src/components/rawlink.css">
   - <script src="/src/components/rawlink.js" defer></script>

3. Backend endpoints cần:
   - POST /api/rawlink
     - Payload: tùy backend (filePath, branch, ...)
     - Response example: { success: true, url: "https://...", name: "tên mặc định" }
   - POST /api/rawlink/name
     - Payload: { url: "...", name: "..." }
     - Response example: { success: true }

4. Commit & Push example:
   git checkout feature/rawlink-ui
   git add src/components/RawLinkPanel.html src/components/rawlink.js src/components/rawlink.css
   git commit -m "feat: add Rawlink creation UI with notifications"
   git push origin feature/rawlink-ui

5. Test:
   - Mở trang có component -> click "Tạo Rawlink" -> kiểm tra thông báo, panel hiển thị link.
   - Lưu tên và copy link.
