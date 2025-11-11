import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import Swal from 'sweetalert2';
import { verifyUser } from '@/verifyUser/verifyUser';
import { putUrl } from '@/boot/axios';
import { validateContactListData } from '@/features/crm/pages/contacts/utils/validation';
export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [showAndHideState, setShowAndHideState] = useState({
    deleteButton: false,
    editButton: false,
    previewButton: false,
    import: false,
    export: false,
    addButton: false,
  });

  const getContactClientCount = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${putUrl}canadianlicapi/contact/client/api/v2/get-contact-client-count`
      );
      setTotalItems(response?.data?.count);
    } catch (error) {
      console.error("Error fetching contacts count", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchContacts = useCallback(async (payload = {}) => {
    try {
      setIsLoading(true);
      const result = await validateContactListData(payload);
      if (result && result.flattenedContacts) {
        setContacts(result.flattenedContacts);
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteContact = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${putUrl}contact/api/v1/deletecontact/${id}`
      );
      setContacts(contacts.filter((contact) => contact.ROWID !== id));
      Swal.fire({
        title: "<strong>Contact Deleted Successfully</strong>",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "<strong>Error Deleting Contact</strong>",
        text: error.response && error.response.data ? error.response.data.message : "An error occurred while deleting the contact.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [contacts]);

  const exportToExcel = useCallback(() => {
    const header = Object.keys(contacts[0] || {}).join(",");
    const csvContent = contacts.map((contact) => Object.values(contact).join(",")).join("\n");
    const csvData = header + "\n" + csvContent;

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "contacts.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [contacts]);

  const handleSearchResults = useCallback(async (searchFields) => {
    setIsLoading(true);
    try {
      if (Array.isArray(searchFields)) {
        const payload = {
          page: 1,
          limit: '300',
          search: searchFields
        };
        const result = await validateContactListData(payload);
        if (result && result.flattenedContacts) {
          setContacts(result.flattenedContacts);
        } else {
          setContacts([]);
          Swal.fire("No results", "No contacts matched your search", "info");
        }
      } else {
        throw new Error("Search data format invalid");
      }
    } catch (error) {
      console.error('Error while fetching contacts:', error);
      Swal.fire("Search Failed", error?.response?.data?.message || "Something went wrong. Please try again.", "error");
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetContacts = useCallback(async () => {
    setIsLoading(true);
    await getContactClientCount();
    await fetchContacts();
    setIsLoading(false);
  }, [getContactClientCount, fetchContacts]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const validationResult = await validateContactListData();
      setShowAndHideState(validationResult.showAndHideState);
      setContacts(validationResult.flattenedContacts);
      setOriginalContacts(validationResult.flattenedContacts);

      const verified = await verifyUser();
      if (!verified) {
        // navigate('/signin'); // This should be handled in the component
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    getContactClientCount();
  }, [getContactClientCount]);

  return {
    contacts,
    originalContacts,
    isLoading,
    totalItems,
    showAndHideState,
    fetchContacts,
    deleteContact,
    exportToExcel,
    handleSearchResults,
    resetContacts,
  };
};
