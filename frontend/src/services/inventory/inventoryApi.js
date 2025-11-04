import axiosInstance from "@/services/axios/axiosInstance";

export const createInventory = async (formData) => {
  const res = await axiosInstance.post("finance/create-inventory", formData);
  return res;
};

export const updateInventory = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/finance/update-inventory/${ROWID}`, formData);
  return res;
};

export const deleteInventory = async (ROWID) => {
  const res = await axiosInstance.delete(`/finance/delete-inventory/${ROWID}`);
  return res;
};
