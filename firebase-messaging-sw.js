/* =========================================================================
   SERVICE WORKER CHO FCM (BACKGROUND PUSH) — QUÁN ĂN NGỌC NHI
   -------------------------------------------------------------------------
   PHẢI đặt file này ở ĐÚNG thư mục gốc của trang GitHub Pages, cùng cấp với
   index.html/quan_an.html (không đặt trong thư mục con) — đây là yêu cầu kỹ
   thuật bắt buộc của Firebase Messaging cho Web Push.

   Vì sao KHÔNG dùng chung firebase-config.js: Service Worker chạy trong môi
   trường riêng, không có "window" (firebase-config.js gán vào
   window.FIREBASE_CONFIG nên sẽ lỗi nếu nạp thẳng ở đây) — Google chính thức
   khuyến nghị khai báo config riêng ngay trong file service worker. Giá trị
   Firebase Web config KHÔNG phải bí mật (an toàn khi hiển thị công khai,
   Firebase bảo mật bằng Rules chứ không phải bằng việc giấu config) — chỉ
   cần copy ĐÚNG cùng giá trị bạn đã điền trong firebase-config.js vào đây.
   ========================================================================= */
importScripts("https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyAMIDwDZvvPntqQcd2SHcCsvkzSV3vV4U8",
  authDomain:        "ngocnhi-os.firebaseapp.com",
  databaseURL:       "https://ngocnhi-os-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "ngocnhi-os",
  storageBucket:     "ngocnhi-os.firebasestorage.app",
  messagingSenderId: "341142528514",
  appId:             "1:341142528514:web:7b6d226bd6439431a17d1b"
});

var messaging = firebase.messaging();

// Xử lý thông báo khi tab/app đang đóng hoặc chạy nền — hiển thị đúng nội
// dung Cloud Function đã gửi (functions/index.js), ví dụ:
// "🔔 Đơn mới – Bàn 05" / "🛎️ Đơn online mới – Nguyễn Văn A"
messaging.onBackgroundMessage(function(payload){
  var title = (payload.notification && payload.notification.title) || "Cảnh báo đơn hàng";
  var body = (payload.notification && payload.notification.body) || "";
  self.registration.showNotification(title, {
    body: body,
    icon: "https://phandungfarm-droid.github.io/NgocNhi-OS/",
    data: payload.data || {}
  });
});
