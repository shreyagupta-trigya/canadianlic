import axiosInstance from "@/services/axios/axiosInstance";

export const createShipment = async (formData) => {
  const res = await axiosInstance.post("finance/create-shipment", formData);
  return res;
};

export const updateShipment = async (formData, ROWID) => {
  const res = await axiosInstance.put(`/finance/update-shipment/${ROWID}`, formData);
  return res;
};

export const deleteShipment = async (ROWID) => {
  const res = await axiosInstance.delete(`/finance/delete-shipment/${ROWID}`);
  return res;
};

export const getShipmentById = async (ROWID) => {
  const res = await axiosInstance.get(`/finance/get-shipment-by-id/${ROWID}`);
  return res;
};
