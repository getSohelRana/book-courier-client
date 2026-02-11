import axios from "axios";

export const imgUpload = async  (imgData) =>{
  //prepare form data for imgBB
  const formData = new FormData();
  formData.append("image" , imgData);
  // upload img to imgBB
  const img_api_ulr = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`;
  const res = await axios.post(img_api_ulr, formData);
  return res.data.data.url;
}