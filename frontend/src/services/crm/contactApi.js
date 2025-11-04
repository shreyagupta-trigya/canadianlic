import axiosInstance from "@/services/axios/axiosInstance";

export const createContact = async (formData) => {
  const res = await axiosInstance.post("/crm/create-contact", formData);
  return res;
};

export const updateContact = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/crm/update-contact/${ROWID}`, formData);
  return res;
};

export const deleteContact = async (ROWID) => {
  const res = await axiosInstance.delete(`/crm/delete-contact/${ROWID}`);
  return res;
};
