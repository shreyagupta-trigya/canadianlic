import axiosInstance from "@/services/axios/axiosInstance";

export const createPolicy = async (formData) => {
  const res = await axiosInstance.post("/crm/create-policy", formData);
  return res;
};

export const updatePolicy = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/crm/update-policy/${ROWID}`, formData);
  return res;
};

export const deletePolicy = async (ROWID) => {
  const res = await axiosInstance.delete(`/crm/delete-policy/${ROWID}`);
  return res;
};

export const sendMassEmail = async (emailData) => {
  const res = await axiosInstance.post("/crm/send-mass-email", emailData);
  return res;
};

export const createInvestment = async (formData) => {
  const res = await axiosInstance.post("/crm/create-investment", formData);
  return res;
};
