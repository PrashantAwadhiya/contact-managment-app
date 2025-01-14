import axios from "axios";

const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "First_Time_Uploading"); 

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/dqlpia3dq/image/upload`,
    formData
  );
  return response.data.secure_url;
};

export default uploadImageToCloudinary;
