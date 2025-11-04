import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import FormPageLayout from "@/layout/FormPageLayout";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { leadOwner, accountType, currecy, industry, paymentTerms, countries } from "@/features/utils/ListViewMenu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { validateForm } from "@/utils/validation";
import { required } from "@/utils/validation/rules";
import { toast } from "react-toastify";
import { createAccount, updateAccount } from "@/services/crm/accountsApis";
import { addAccountToList, updateAccountInList } from "@/redux/slices/accounts/accountSlice";

const AccountsForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const dataToEdit = location.state
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        accountOwner: "",
        phone: "",
        accountName: "",
        website: "",
        accountType: "",
        exchangeRate: "",
        industry: "",
        currency: "",
        billingStreet: "",
        billingCity: "",
        billingState: "",
        billingCode: "",
        billingCountry: "",
        others: "",
        description: "",
        paymentTerms: "",
        accountNumber: "", // Added to state
        buildingNumber: "", // Added to state
        officeNumber: "", // Added to state
    })

    useEffect(() => {
        if (dataToEdit) {
            setFormData(dataToEdit);
        }
    }, [dataToEdit]);

    useEffect(() => {
        setErrors({});
    }, [formData])

    const handleChange = (e) => {
        e.preventDefault()
        const { value, name } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Helper for Select components since they don't use e.target
    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onCancel = () => {
        navigate("/crm/accounts");
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const rules = {
            accountOwner: [required("Account Owner is Required")],
            accountName: [required("Account Name is Required")],
        };

        const validationErrors = validateForm(formData, rules);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            toast.warning(Object.values(validationErrors)[0])
            return;
        }
        setLoading(true)
        if (dataToEdit) {
            updateAccount(formData, dataToEdit.ROWID).then((res) => {
                if (res.data.success) {
                    toast.success("Account Updated Successfully")
                    dispatch(updateAccountInList({ ...formData, ROWID: dataToEdit.ROWID }));
                    navigate('/crm/accounts')
                }
            }).catch((err) => {
                toast.error(err?.response?.data?.message || err.message || "Error Occured during the Account Updation!")
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createAccount(formData).then((res) => {
                if (res.data.success) {
                    toast.success('Account Created Successfully');
                    dispatch(addAccountToList({ ...formData, ROWID: res.data.company.ROWID }))
                    navigate('/crm/accounts')
                }
            }).catch((err) => {
                toast.error(err?.response?.data?.message || err.message || "Error Occured during the Account creation!")
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
       <FormPageLayout
  title={
    <span className="text-lg font-semibold md:text-2xl">
      {dataToEdit ? "Edit Account" : "Create Account"}
    </span>
  }
  onCancel={onCancel}
  onSubmit={handleSubmit}
  loading={loading}
>

         
            <FormCard title={"Account Details"}>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                    <FormField label="Account Name">
                        <Input
                            name="accountName"
                            onChange={handleChange}
                            value={formData.accountName}
                            className={`${errors?.accountName && "border-red-600"} w-full`}
                            type="text"
                            placeholder="Enter Account Name"
                        />
                    </FormField>
                    <FormField label="Account Number">
                        <Input
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Account Number"
                        />
                    </FormField>
                    <FormField label="Account Owner">
                        <Select
                            name="accountOwner"
                            value={formData.accountOwner}
                            onValueChange={(value) =>
                                handleSelectChange("accountOwner", value)
                            }
                        >
                            <SelectTrigger className={`${errors?.accountOwner && "border-red-600"} w-full`}>
                                <SelectValue placeholder="Owner" />
                            </SelectTrigger>
                            <SelectContent>
                                {leadOwner.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                    <FormField label="Account Type">
                        <Select
                            name="accountType"
                            value={formData.accountType}
                            onValueChange={(value) =>
                                handleSelectChange("accountType", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {accountType.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                                <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormField>
                    <FormField label="Phone">
                        <Input
                            name="phone"
                            onChange={handleChange}
                            value={formData.phone}
                            type="number" 
                            placeholder="Phone"
                        />
                    </FormField>

                    <FormField label="Industry">
                        <Select
                            name="industry"
                            value={formData.industry}
                            onValueChange={(value) =>
                                handleSelectChange("industry", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Industry" />
                            </SelectTrigger>
                            <SelectContent>
                                {industry.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                    <FormField label="Website">
                        <Input
                            name="website"
                            onChange={handleChange}
                            value={formData.website}
                            type="url"
                            placeholder="Website"
                        />
                    </FormField>

                    <FormField label="Exchange Rate">
                        <Input
                            name="exchangeRate"
                            onChange={handleChange}
                            value={formData.exchangeRate}
                            type="text"
                            placeholder="Exchange Rate"
                            readOnly
                        />
                    </FormField>
                    <FormField label="Currency">
                        <Select
                            name="currency"
                            value={formData.currency}
                            onValueChange={(value) =>
                                handleSelectChange("currency", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="KWD" />
                            </SelectTrigger>
                            <SelectContent>
                                {currecy.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                    <FormField label="Payment Terms">
                        <Select
                            name="paymentTerms"
                            value={formData.paymentTerms}
                            onValueChange={(value) =>
                                handleSelectChange("paymentTerms", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Payment Terms" />
                            </SelectTrigger>
                            <SelectContent>
                                {paymentTerms.map((term) => (
                                    <SelectItem key={term.value} value={term.value}>
                                        {term.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                 
                    <div className="hidden md:block" />
                    <div className="hidden md:block" />
                </div>


                {formData.accountType === "others" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-5">
                        <FormField label="Others">
                            <Input
                                name="others"
                                value={formData.others || ""}
                                onChange={handleChange}
                                type="text"
                                placeholder="Others"
                            />
                        </FormField>
                       
                        <div className="hidden md:block" />
                        <div className="hidden md:block" />
                    </div>
                )}
            </FormCard>

          
            <FormCard title={"Address Information"}>
             
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
                    <FormField label="Building Number">
                        <Input
                            name="buildingNumber"
                            value={formData.buildingNumber}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Building Number"
                        />
                    </FormField>

                    <FormField label="Office Number">
                        <Input
                            name="officeNumber"
                            value={formData.officeNumber}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Office Number"
                        />
                    </FormField>

                    <FormField label="Street / Building">
                        <Input
                            name="billingStreet"
                            value={formData.billingStreet}
                            onChange={handleChange}
                            type="text"
                            placeholder="Street / Building"
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
                    <FormField label="City">
                        <Input
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleChange}
                            type="text"
                            placeholder="City"
                        />
                    </FormField>

                    <FormField label="State">
                        <Input
                            name="billingState"
                            value={formData.billingState}
                            onChange={handleChange}
                            type="text"
                            placeholder="State"
                        />
                    </FormField>
                    <FormField label="Zip Code">
                        <Input
                            name="billingCode"
                            value={formData.billingCode}
                            onChange={handleChange}
                            type="text"
                            placeholder="Zip Code"
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
                    <FormField label="Country">
                        <Select
                            name="billingCountry"
                            value={formData.billingCountry}
                            onValueChange={(value) =>
                                handleSelectChange("billingCountry", value)
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
                   
                    <div className="hidden md:block" />
                    <div className="hidden md:block" />
                </div>
            </FormCard>

         
            <FormCard title={"Description"}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                    <FormField label="Description">
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                           rows={2}
        className="w-full"
                            placeholder="Enter Description"
                        />
                    </FormField>
                     <FormField label="Upload Attachment">
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

export default AccountsForm;