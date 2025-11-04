import axiosInstance from "@/services/axios/axiosInstance";

export const createDeal = async (formData) => {
  const res = await axiosInstance.post("/crm/create-deal", formData);
  return res;
};

export const updateDeal = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/crm/update-deal/${ROWID}`, formData);
  return res;
};

export const deleteDeal = async (ROWID) => {
  const res = await axiosInstance.delete(`/crm/delete-deal/${ROWID}`);
  return res;
};
