// Cấu hình API Key ImgBB dùng chung cho toàn bộ hệ thống NgocNhi-OS
const IMGBB_API_KEY = "DÁN_KEY_IMGBB_CỦA_BẠN_VÀO_ĐÂY";

/**
 * Hàm upload ảnh lên ImgBB dùng chung cho tất cả các trang (Trang trại, Quán ăn, Tiệc cưới)
 * @param {File} fileObject - File lấy từ thẻ <input type="file">
 * @returns {Promise<string|null>} Trả về link URL của ảnh nếu thành công
 */
async function uploadImageToImgBB(fileObject) {
  if (!fileObject) {
    alert("Vui lòng chọn một tệp hình ảnh!");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", fileObject);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      console.log("Upload ảnh lên ImgBB thành công:", result.data.url);
      return result.data.url; // Link ảnh dạng: https://i.ibb.co/xxxx/xxxx.jpg
    } else {
      throw new Error(result.error.message || "Không thể tải ảnh lên");
    }
  } catch (error) {
    console.error("Lỗi upload ImgBB:", error);
    alert("Lỗi tải ảnh lên: " + error.message);
    return null;
  }
}
