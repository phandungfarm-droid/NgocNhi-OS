/* =========================================================================
   CLOUD FUNCTION — GỬI PUSH FCM THẬT KHI CÓ CẢNH BÁO ĐƠN HÀNG MỚI
   -------------------------------------------------------------------------
   Vì sao BẮT BUỘC phải có phần backend này:
   Firebase Cloud Messaging không cho phép trình duyệt (client) tự gửi push
   tới MÁY KHÁC — chỉ Admin SDK (chạy trên server, có quyền cao) mới gửi
   được. quan_an.html chỉ ghi 1 bản ghi vào Restaurant/OrderAlerts; hàm này
   lắng nghe đúng sự kiện ghi đó rồi gửi push thật tới mọi token đã đăng ký
   trong Restaurant/NotificationTokens (đăng ký qua nút "Bật thông báo đơn
   hàng" trong quan_an.html).

   KHÔNG đụng tới bất kỳ dữ liệu Orders/Tickets nào — chỉ đọc
   Restaurant/OrderAlerts (bản ghi vừa tạo) và Restaurant/NotificationTokens,
   không xoá/sửa gì trong 2 nhánh dữ liệu đó ngoài việc dọn token đã hết hạn.
   ========================================================================= */
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendOrderAlertPush = functions
  .region("asia-southeast1") // trùng khu vực Realtime Database (asia-southeast1) — đổi nếu project bạn khác
  .database.ref("/Restaurant/OrderAlerts/{alertId}")
  .onCreate(async (snapshot, context) => {
    const alert = snapshot.val();
    if (!alert || !alert.message) return null;

    const tokensSnap = await admin.database().ref("/Restaurant/NotificationTokens").once("value");
    const tokensObj = tokensSnap.val() || {};
    const tokens = Object.keys(tokensObj);
    if (tokens.length === 0) {
      console.log("Chưa có thiết bị nào đăng ký nhận thông báo (Restaurant/NotificationTokens rỗng).");
      return null;
    }

    const payload = {
      notification: {
        title: alert.kind === "table" ? "Đơn mới tại bàn" : "Đơn online mới",
        body: alert.message
      },
      data: {
        kind: alert.kind || "",
        alertId: context.params.alertId,
        orderId: alert.orderId || "",
        ticketId: alert.ticketId || "",
        tableId: alert.tableId || ""
      }
    };

    const response = await admin.messaging().sendEachForMulticast({
      tokens: tokens,
      notification: payload.notification,
      data: payload.data
    });

    // Dọn các token không còn hợp lệ (thiết bị gỡ cài đặt/thu hồi quyền) —
    // chỉ xoá token hỏng trong NotificationTokens, KHÔNG đụng OrderAlerts.
    const updates = {};
    response.responses.forEach((res, idx) => {
      if (!res.success) {
        const code = res.error && res.error.code;
        if (code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token") {
          updates["/Restaurant/NotificationTokens/" + tokens[idx]] = null;
        }
      }
    });
    if (Object.keys(updates).length > 0) {
      await admin.database().ref().update(updates);
    }

    console.log(`Đã gửi push cho cảnh báo ${context.params.alertId}: ${response.successCount}/${tokens.length} thành công.`);
    return null;
  });
