import axiosInstance from "@/services/axios/axiosInstance";

export const createInvoice = async (formData) => {
  const res = await axiosInstance.post("/finance/create-invoice", formData);
  return res.data;
};

export const updateInvoice = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/finance/update-invoice/${ROWID}`, formData);
  return res.data;
};

export const deleteInvoice = async (ROWID) => {
  const res = await axiosInstance.delete(`/finance/delete-invoice/${ROWID}`);
  return res.data;
};
