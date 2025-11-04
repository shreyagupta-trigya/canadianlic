import axiosInstance from "../axios/axiosInstance";

export const userAuth = async (formData) =>{
    const res = await axiosInstance.post("/user/login",formData);
    return res;
}