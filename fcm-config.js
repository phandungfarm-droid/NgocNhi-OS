/* =========================================================================
   FCM (FIREBASE CLOUD MESSAGING) CONFIG — QUÁN ĂN NGỌC NHI
   -------------------------------------------------------------------------
   Dùng để đăng ký nhận thông báo đẩy (push) thật cho cảnh báo đơn hàng mới.
   Chỉ cần điền VAPID key thật của bạn TẠI ĐÂY — lấy tại:
   Firebase Console → Project Settings → Cloud Messaging → Web configuration
   → Web Push certificates → Generate key pair (nếu chưa có).
   Chỉ quan_an.html nạp file này.
   ========================================================================= */
window.FCM_CONFIG = {
  vapidKey: "BLwi5t6DdbCZ_NkG31HLLILdS-rK4UgeRkrAN5Zo441De9IgXsjM4vBbvcxcTG1TTjEgVfTQbIbYyAuOF8uAj8s"
};
