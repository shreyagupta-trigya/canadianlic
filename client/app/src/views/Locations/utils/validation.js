import axios from "axios";
import { putUrl } from "../../../boot/axios";


import {getRole,encryptData,showAccessDeniedPopupAndNavigate} from "../../utils/util-js/utilites"

// Validate contact list data and fetch permissions
export const validatePartnerListData = async () => {
  try {
    // Retrieve permissions data from localStorage
    const permissionsData = localStorage.getItem("permissions");
    const jsonData = JSON.parse(permissionsData);

    // Find permissions for the contact module
    const result = jsonData.find((item) => item.moduleName === "location");

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
    const response = await axios.post(`${putUrl}locations/api/v1/getlocation`,config);

   
    
    console.log("locations data",response);
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

    return [showAndHideState, response.data ];
  } catch (error) {
    console.error("Error:", error);
  }
};
