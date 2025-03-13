export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "BoardSwap");
  formData.append("cloud_name", "dogm5xki5");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dogm5xki5/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();
  const imgUrl = data.secure_url;
  return imgUrl;
};
