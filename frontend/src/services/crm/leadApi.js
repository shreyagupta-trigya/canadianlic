import axiosInstance from "@/services/axios/axiosInstance";

export const createLead = async (formData) => {
  const res = await axiosInstance.post("/crm/create-lead", formData);
  return res;
};

export const updateLead = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/crm/update-lead/${ROWID}`, formData);
  return res;
};

export const deleteLead = async (ROWID) => {
  const res = await axiosInstance.delete(`/crm/delete-lead/${ROWID}`);
  return res;
};
