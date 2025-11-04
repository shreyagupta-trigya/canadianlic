import axiosInstance from "@/services/axios/axiosInstance";

export const createPackage = async (formData) => {
  const res = await axiosInstance.post("/finance/create-package", formData);
  return res.data;
};

export const updatePackage = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/finance/update-package/${ROWID}`, formData);
  return res.data;
};

export const deletePackage = async (ROWID) => {
  const res = await axiosInstance.delete(`/finance/delete-package/${ROWID}`);
  return res.data;
};
