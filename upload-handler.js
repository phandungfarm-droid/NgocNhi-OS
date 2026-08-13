// Khai báo API Key ImgBB
const IMGBB_API_KEY = "deb05009b627d89158a533a177701b3a";

// Hàm xử lý upload tệp ảnh lên ImgBB
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
            return result.data.url; // Trả về đường link ảnh trực tiếp
        } else {
            alert("Lỗi upload ảnh: " + (result.error ? result.error.message : "Thất bại"));
            return null;
        }
    } catch (err) {
        console.error("Lỗi kết nối ImgBB:", err);
        alert("Không thể kết nối tới máy chủ ImgBB!");
        return null;
    }
}
