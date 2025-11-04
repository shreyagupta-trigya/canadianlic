import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import FormPageLayout from "@/layout/FormPageLayout";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    // leadSource, // Not used in the provided code, but kept in imports
    // company, // Using hardcoded data in refactored Selects where available
    leadOwner,
} from "@features/utils/ListViewMenu.jsx";
import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Tabs are not used
import { required } from "@/utils/validation/rules";
import { validateForm } from "@/utils/validation";
import {
    addContactToList,
    updateContactInList,
} from "@/redux/slices/contacts/contactSlice";
import { createContact, updateContact } from "@/services/crm/contactApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { countries } from "@/features/utils/ListViewMenu";

// Mock data to replace missing imports/resolve issues
const mockContactTypes = [
    { label: "Client", value: "client" },
    { label: "Vendor", value: "vendor" },
    { label: "Partner", value: "partner" },
];
// NOTE: Replaced 'company' with 'mockContactTypes' and 'leadOwner' with 'mockLeadOwner' if @features/utils/ListViewMenu is not accessible
const mockLeadOwner = leadOwner;


const ContactsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const dataToEdit = location.state;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        alias: "",
        firstName: "",
        lastName: "",
        account: "", // Renamed from contactType for clarity in form
        vendor: "", // Not used in form fields
        email: "",
        mobile: "",
        phone: "",
        title: "", // Renamed from position
        department: "",
        contactOwner: "",
        buildingNumber: "",
        officeNumber: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "kuwait",
        description: "",
        accountName: "",
        accountNumber: "", // Added to state
    });
    const [errors, setErrors] = useState({});
    
    // Keeping contactPersons state as it exists in the original code, though not used in the final render
    const [contactPersons, setContactPersons] = useState([
        {
            salutation: "",
            firstName: "Aim",
            lastName: "Unith",
            email: "unit@gmail.com",
            workPhone: "32353234",
            mobile: "98482732",
        },
    ]);

    useEffect(() => {
        if (dataToEdit) {
            setFormData(dataToEdit);
            console.log(dataToEdit, "datatoedit");
        }
    }, [dataToEdit]);

    useEffect(() => {
        setErrors({});
    }, [formData]);

    // This function is not used in the final form render, but kept for completeness
    const addNewRow = () => {
        const newRow = {
            salutation: "",
            firstName: "",
            lastName: "",
            email: "",
            workPhone: "",
            mobile: "",
        };
        setContactPersons((prev) => [...prev, newRow]);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Helper for Select components since they don't use e.target
    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onCancel = () => {
        navigate("/crm/contacts");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const rules = {
            firstName: [required("First Name is Required")],
            lastName: [required("Last Name is Required")],
        };

        const validationErrors = validateForm(formData, rules);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            console.log(validationErrors);
            toast.warning(Object.values(validationErrors)[0]);
            return;
        }
        setLoading(true);

        if (dataToEdit) {
            // Update Contact
            updateContact(formData, dataToEdit.ROWID)
                .then((res) => {
                    if (res.data.success) {
                        toast.success("Contact Updated Successfully");
                        dispatch(
                            updateContactInList({ ...formData, ROWID: dataToEdit.ROWID })
                        );
                        navigate("/crm/contacts");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(
                        err?.response?.data?.message ||
                        err.message ||
                        "Error Occured during the Contact Updation!"
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
       
            createContact(formData)
                .then((res) => {
                    if (res.data.success) {
                        toast.success("Contact Created Successfully");
                        dispatch(
                            addContactToList({ ...formData, ROWID: res.data.contact.ROWID })
                        );
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(
                        err?.response?.data?.message ||
                        err.message ||
                        "Error Occured during the Contact creation!"
                    );
                })
                .finally(() => {
                    setLoading(false);
                    navigate("/crm/contacts");
                });
        }
    };

    return (
       <FormPageLayout 
  title={
    <span className="text-lg font-semibold md:text-2xl">
      {dataToEdit ? "Edit Contact" : "Create Contact"}
    </span>
  }
  onCancel={onCancel}
  onSubmit={handleSubmit}
  loading={loading}
>

         
            <FormCard title={"Contact Details"} >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                    <FormField label="First Name">
                        <Input
                            value={formData.firstName}
                            name="firstName"
                            onChange={handleChange}
                            className={`${errors?.firstName && "border-red-600"} w-full`}
                            type="text"
                            placeholder="Enter First Name"
                        />
                    </FormField>
                    <FormField label="Last Name">
                        <Input
                            value={formData.lastName}
                            name="lastName"
                            onChange={handleChange}
                            className={`${errors?.lastName && "border-red-600"} w-full`}
                            type="text"
                            placeholder="Enter Last Name"
                        />
                    </FormField>
                       <FormField label="Position">
                        <Input
                            name="title"
                            value={formData.title} 
                            onChange={handleChange}
                            className="w-full"
                            type="text"
                            placeholder="Position"
                        />
                    </FormField>
                  
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                 

                  

                    <FormField label="Account Name">
                        <Select
                            value={formData.accountName}
                            name="accountName"
                            onValueChange={(value) =>
                                handleSelectChange("accountName", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Account" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="account1">Account 1</SelectItem>
                                <SelectItem value="account2">Account 2</SelectItem>
                                <SelectItem value="account3">Account 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormField>
                     <FormField label="Account Number">
                        <Input
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className="w-full"
                            type="number"
                            placeholder="Account Number"
                        />
                    </FormField>
                    <FormField label="Contact Owner">
                        <Select
                            value={formData.contactOwner}
                            name="contactOwner"
                            onValueChange={(value) =>
                                handleSelectChange("contactOwner", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Contact Owner" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockLeadOwner.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                   

                    <FormField label="Department">
                        <Select
                            name="department"
                            value={formData.department}
                            onValueChange={(value) =>
                                handleSelectChange("department", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="management">Management</SelectItem>
                                <SelectItem value="procurement">Procurement</SelectItem>
                                <SelectItem value="site">Site</SelectItem>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="accounts">Accounts</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormField>
                     <FormField label="Email">
                        <Input
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            className="w-full"
                            type="email"
                            placeholder="Email"
                        />
                    </FormField>
                    <FormField label="Mobile">
                        <Input
                            value={formData.mobile}
                            name="mobile"
                            onChange={handleChange}
                            className="w-full"
                            type="tel"
                            placeholder="Mobile"
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                   
                    <FormField label="Phone">
                        <Input
                            value={formData.phone}
                            name="phone"
                            onChange={handleChange}
                            className="w-full"
                            type="tel"
                            placeholder="Phone"
                        />
                    </FormField>
                </div>
            </FormCard>

       
            <FormCard title={"Address"}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                    <FormField label="Building Number">
                        <Input
                            value={formData.buildingNumber}
                            name="buildingNumber"
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter Building Number"
                        />
                    </FormField>
                    <FormField label="Office Number">
                        <Input
                            value={formData.officeNumber}
                            name="officeNumber"
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter Office Number"
                        />
                    </FormField>
                    <FormField label="Street / Building">
                        <Input
                            value={formData.street}
                            name="street"
                            onChange={handleChange}
                            type="text"
                            placeholder="Street / Building"
                        />
                    </FormField>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                    <FormField label="City">
                        <Input
                            value={formData.city}
                            name="city"
                            onChange={handleChange}
                            type="text"
                            placeholder="City"
                        />
                    </FormField>
                   
                    <FormField label="Zip Code">
                        <Input
                            value={formData.zipCode}
                            name="zipCode"
                            onChange={handleChange}
                            type="text" 
                            placeholder="Zip Code"
                        />
                    </FormField>
                      <FormField label="Country">
                        <Select
                            name="country"
                            value={formData.country}
                            onValueChange={(value) =>
                                handleSelectChange("country", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                </div>
            </FormCard>

       
            <FormCard title={"Description"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                    <FormField label="Description">
                        <Textarea
                            value={formData.description}
                            name="description"
                            onChange={handleChange}
                           rows={2}
        className="w-full"
                            placeholder="Enter Description"
                        />
                    </FormField>
                     <FormField label="Attachment File">
      <input
        type="file"
        name="fileUpload"
        className="border rounded px-3 mb-6 py-2 w-full"
      />
    </FormField>

                </div>
            </FormCard>
        </FormPageLayout>
    );
};

export default ContactsForm;