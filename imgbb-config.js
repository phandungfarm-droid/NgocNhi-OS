/* =========================================================================
   IMGBB CONFIG DÙNG CHUNG — HỆ THỐNG DỊCH VỤ NGỌC NHI
   -------------------------------------------------------------------------
   Dùng để upload ảnh module (Cài đặt hệ thống ở Trung tâm điều hành) lên
   ImgBB thay cho Firebase Storage. Chỉ cần điền API Key thật của bạn TẠI
   ĐÂY — lấy tại https://api.imgbb.com/ (đăng nhập → mục API).
   Chỉ index.html (Trung tâm điều hành) nạp file này — đúng kiến trúc hiện
   có: chỉ Trung tâm điều hành mới có chức năng upload ảnh.
   ========================================================================= */
window.IMGBB_CONFIG = {
  apiKey: "REPLACE_WITH_IMGBB_API_KEY"
};
