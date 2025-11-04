import axiosInstance from "@/services/axios/axiosInstance";

export const createPurchaseOrder = async (formData) => {
  const res = await axiosInstance.post("finance/create-purchaseOrder", formData);
  return res;
};

export const updatePurchaseOrder = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/finance/update-purchaseOrder/${ROWID}`, formData);
  return res;
};

export const deletePurchaseOrder = async (ROWID) => {
  const res = await axiosInstance.delete(`/finance/delete-purchaseOrder/${ROWID}`);
  return res;
};

export const getPurchaseOrderById = async (ROWID) => {
  const res = await axiosInstance.get(`/finance/get-purchaseOrder-by-id/${ROWID}`);
  return res;
};
