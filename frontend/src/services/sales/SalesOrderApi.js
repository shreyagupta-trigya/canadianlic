import axiosInstance from "@/services/axios/axiosInstance";

export const createSalesOrder = async (formData) => {
  const res = await axiosInstance.post("/finance/create-sales-order", formData);
  return res.data;
};

export const updateSalesOrder = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/finance/update-sales-order/${ROWID}`, formData);
  return res.data;
};

export const deleteSalesOrder = async (ROWID) => {
  const res = await axiosInstance.delete(`/finance/delete-sales-order/${ROWID}`);
  return res.data;
};
