import axios from "axios";
import { putUrl } from "../../../boot/axios";
import { getRole, encryptData, showAccessDeniedPopupAndNavigate } from "../../utils/util-js/utilites";

// Validate lead list data and fetch permissions
export const validateLeadListData = async (payload={}) => {
  try {
    // Retrieve permissions data from localStorage
    const permissionsData = localStorage.getItem("permissions");
    if (!permissionsData) throw new Error("Permissions data not found");

    const jsonData = JSON.parse(permissionsData);
    // console.log('jsonData', jsonData);
    // Find permissions for the lead module
    const result = jsonData.find((item) => item.moduleName === "lead");

    // If module access is denied, show popup and navigate
    if (!result || !result.module_access) {
      showAccessDeniedPopupAndNavigate();
      return;
    }

    // Retrieve user ID and role ID from localStorage
    const userId = localStorage.getItem("userId");
    const roleId = localStorage.getItem("roleId");
    if (!userId || !roleId) throw new Error("User ID or Role ID not found");

    // Generate encrypted data
    const secretKey = "shgfsyurswr67wr7wguwguwrwrw7fwuygw7it";
    const encryptedData = encryptData(
      `${userId},${result.viewOnly},${result.viewAll}`,
      secretKey
    );

    // Set up request headers with encrypted data
    const config = { headers: { encryptedData } };

    // Fetch lead list data from the server
    const response = await axios.post(
      `${putUrl}canadianlicapi/lead/api/v2/get-lead-details`, payload,
      config
    );
    // const response = await axios.get(
    //   `${putUrl}uatServerFunction/api/v1/getAllLeads`,
    //   config
    // );
    console.log(response,"responseflattenedLead")
    // Extract flattened lead data from the response
    const flattenedLead = response.data.leadDetails.map((item) => ({
      ...item.leadService,
      ...item.leads,
      UserfullName: `${item.userData?.firstName} ${item.userData?.lastName}`,
      advisorfullName: `${item.advisors?.firstName} ${item.advisors?.lastName}`,
    }));

    console.log("flattenedLead", flattenedLead);

    // Determine user role
    const role = await getRole(roleId);

    // Determine if the edit button should be enabled
    const enableEdit =
      role === "super admin" ||
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

    return { showAndHideState, flattenedLead };
  } catch (error) {
    console.error("Error:", error);
  }
};
