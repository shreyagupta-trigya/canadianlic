import CryptoJS from "crypto-js";
// import Swal from "sweetalert2";
import { putUrl } from "../boot/axios";
import axios from "axios";
import { Router } from "react-router-dom";

// Encrypt data using AES encryption
export const encryptData = (data, secretKey) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

// Fetch user role from the server
export const getRole = async (id) => {
  const response = await axios.get(
    `${putUrl}usersFunction/getAllUsersRole/${id}`
  );
  return response.data[0].appUsersRole.roleName;
};

// Show access denied popup and navigate to signin page
export const showAccessDeniedPopupAndNavigate = () => {
  Swal.fire({
    timer: 2000,
    title: "<strong>You don't have access. Please contact the administrator</strong>",
    icon: "error",
  }).then(() => {
    Router.push("/dashboard");
  });
};
