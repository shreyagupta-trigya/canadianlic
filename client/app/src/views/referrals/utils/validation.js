import axios from "axios";
import { putUrl } from "../../../boot/axios";
import CryptoJS from "crypto-js";
import router from "../../../router/index";
import Swal from "sweetalert2";

// Encrypt data using AES encryption
function encryptData(data, secretKey) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

// Fetch user role from the server
const getRole = async (id) => {
  const response = await axios.get(
    `${putUrl}usersFunction/getAllUsersRole/${id}`
  );
  return response.data[0].appUsersRole.roleName;
};

// Show access denied popup and navigate to signin page
const showAccessDeniedPopupAndNavigate = () => {
  Swal.fire({
    timer: 2000,
    title: "<strong>You Don't Have Access... Contact Administrator</strong>",
    icon: "error",
  }).then(() => {
    router.push("/signin");
  });
};

// Validate contact list data and fetch permissions
export const validateReferralListData = async (payload={}) => {
  try {
    // Retrieve permissions data from localStorage
    const permissionsData = localStorage.getItem("permissions");
    const jsonData = JSON.parse(permissionsData);

    // Find permissions for the contact module
    const result = jsonData.find((item) => item.moduleName === "refferel");

    // If module access is denied, show popup and navigate
    if (!result || !result.module_access) {
      showAccessDeniedPopupAndNavigate();
      return;
    }

    // Retrieve user ID and role ID from localStorage
    const userId = localStorage.getItem("userId");
    const roleId = localStorage.getItem("roleId");

    // Generate encrypted data
    const secretKey = "shgfsyurswr67wr7wguwguwrwrw7fwuygw7it";
    const encryptedData = encryptData(
      `${userId},${result.viewOnly},${result.viewAll}`,
      secretKey
    );

    // Set up request headers with encrypted data
    const config = { headers: { encryptedData } };

    // Fetch contact list data from the server
    const response = await axios.post(
      `${putUrl}referralFunction/getallreferrals`,payload,
      config
    );

    console.log("referrals", response);

    // Determine user role
    const role = await getRole(roleId);

    // Determine if the edit button should be enabled
    const enableEdit =
      role === "Super Admin" ||
      result.modifyAll ||
      (result.modifyOnly && result.viewOnly);

    // Define show and hide state for buttons
    const showAndHideState = {
      deleteButton: result.delete,
      previewButton: result.viewOnly,
      import: result.import,
      export: result.export,
      addButton: result.add,
      editButton: enableEdit,
    };

    return [showAndHideState, response.data];
  } catch (error) {
    console.error("Error:", error);
  }
};
