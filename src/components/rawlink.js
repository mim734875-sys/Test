// Minimal JS to call API tạo rawlink, hiển thị thông báo, hiển thị UI link và cho phép lưu tên / copy.
// Cần điều chỉnh endpoint /api/rawlink cho phù hợp backend của bạn.

(function () {
  const btnCreate = document.getElementById('create-rawlink-btn');
  const toast = document.getElementById('rawlink-toast');
  const panel = document.getElementById('rawlink-panel');
  const urlEl = document.getElementById('rawlink-url');
  const nameInput = document.getElementById('rawlink-name');
  const saveNameBtn = document.getElementById('rawlink-save-name');
  const copyBtn = document.getElementById('rawlink-copy');

  function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `rawlink-toast ${type}`;
    toast.classList.remove('hidden');
    // Auto hide after 4s
    clearTimeout(toast._hideTimeout);
    toast._hideTimeout = setTimeout(() => toast.classList.add('hidden'), 4000);
  }

  function showPanel(rawUrl, defaultName = '') {
    urlEl.href = rawUrl;
    urlEl.textContent = rawUrl;
    nameInput.value = defaultName;
    panel.classList.remove('hidden');
    panel.setAttribute('aria-hidden', 'false');
  }

  async function createRawLink() {
    showToast('Đang tạo Rawlink...');
    try {
      // Gửi data cần thiết để tạo rawlink. Điều chỉnh payload theo backend.
      const resp = await fetch('/api/rawlink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // ví dụ: file path, branch, content id...
          // filePath: currentFilePath
        }),
      });
      const j = await resp.json();
      if (resp.ok && j.success && j.url) {
        showToast('Rawlink đã được tạo thành công!', 'success');
        showPanel(j.url, j.name || '');
      } else {
        showToast('Tạo Rawlink thất bại: ' + (j.message || resp.statusText), 'error');
      }
    } catch (err) {
      showToast('Lỗi: ' + err.message, 'error');
    }
  }

  async function saveName(rawUrl, name) {
    try {
      const resp = await fetch('/api/rawlink/name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: rawUrl, name }),
      });
      const j = await resp.json();
      if (resp.ok && j.success) {
        showToast('Tên Raw đã được lưu', 'success');
      } else {
        showToast('Không thể lưu tên: ' + (j.message || resp.statusText), 'error');
      }
    } catch (err) {
      showToast('Lỗi khi lưu tên: ' + err.message, 'error');
    }
  }

  btnCreate && btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    createRawLink();
  });

  saveNameBtn && saveNameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const rawUrl = urlEl.href;
    if (!rawUrl) return showToast('Chưa có Rawlink để lưu tên', 'error');
    saveName(rawUrl, nameInput.value.trim());
  });

  copyBtn && copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const rawUrl = urlEl.href;
    if (!rawUrl) return showToast('Chưa có Rawlink để sao chép', 'error');
    try {
      await navigator.clipboard.writeText(rawUrl);
      showToast('Đã sao chép vào bộ nhớ tạm', 'success');
    } catch (err) {
      showToast('Không thể sao chép: ' + err.message, 'error');
    }
  });
})();