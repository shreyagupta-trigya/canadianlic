import axiosInstance from "@/services/axios/axiosInstance";

export const createAccount = async (formData) => {
  const res = await axiosInstance.post("/crm/create-company", formData);
  return res;
};

export const updateAccount = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/crm/update-company/${ROWID}`, formData);
  return res;
};

export const deleteAccount = async (ROWID) => {
  const res = await axiosInstance.delete(`/crm/delete-company/${ROWID}`);
  return res;
};
