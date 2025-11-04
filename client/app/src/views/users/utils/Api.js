import axios from "axios";
import { putUrl } from "../../../boot/axios";

export const getAllUserRoles =async()=> {
    try {
      const response = await axios.get(`${putUrl}usersFunction/getAllUsersRole`);
      // const response = await axios.get(`${putUrl}usersFunction/app-user-role`);
      console.log("<<<<<<<<== get users===>>>>>>>", response);
    //   console.log("response.data.map((item) => item.appUserRole)",response.data.map((item) => item.appUsersRole));
      return response.data.map((item) => item.appUsersRole);
    } catch (error) {
      console.error(error);
    }
  }
export const getRoles =async()=> {
    try {
      const response = await axios.get(`${putUrl}usersFunction/getRole`);
      // const response = await axios.get(`${putUrl}usersFunction/app-user-role`);
      console.log("<<<<<<<<== get users Roles===>>>>>>>", response);
    //   console.log("response.data.map((item) => item.appUserRole)",response.data.map((item) => item.appUsersRole));
      return response.data.map((item) => item.roles);
    } catch (error) {
      console.error(error);
    }
  }