import axiosInstance from "@/services/axios/axiosInstance";

export const createOffering = async (formData) => {
  const res = await axiosInstance.put("/ProductFunction/createoffering", formData);
  return res;
};

export const updateOffering = async (formData, ROWID) => {
  const res = await axiosInstance.post(`/productFunction/updateproduct/${ROWID}`, formData);
  return res;
};

export const getSingleOffering = async (ROWID) => {
  const res = await axiosInstance.get(`/productFunction/getsingleproduct/${ROWID}`);
  return res;
};

export const getUsers = async () => {
  const res = await axiosInstance.get("/contact/api/v1/getusers");
  return res;
};

export const deleteOffering = async (ROWID) => {
  const res = await axiosInstance.delete(`/ProductFunction/deleteoffering/${ROWID}`);
  return res;
};
