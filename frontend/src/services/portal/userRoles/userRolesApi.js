import axiosInstance from "@/services/axios/axiosInstance";

export const createUserRole = async (formData) =>{
    const res = await axiosInstance.post("/user/create-role",formData);
    return res;
}

export const deleteUserRole = async (ROWID) =>{
    const res = await axiosInstance.delete(`/user/delete-role/${ROWID}`,);
    return res;
}

export const updateUserRole = async (formData, ROWID) =>{
    const res = await axiosInstance.put(`/user/update-role/${ROWID}`,formData);
    return res;
}