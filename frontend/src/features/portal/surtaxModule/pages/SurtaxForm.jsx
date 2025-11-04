import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import FormPageLayout from "@/layout/FormPageLayout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { leadOwner, accountType, currecy, industry, city, state } from "@/features/utils/ListViewMenu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
const SurtaxForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        countryName:"",
        surtax:"",
        zipCodeType:"",
        zipCodeName:"",
        zipCode:""
    })
    const onCancel = () => {
        navigate("/portal/surtax");
    };



    const handleSubmit = () => {
        //handle Submit
        window.alert("success");
    };
    return (
        <FormPageLayout
            title={"Create Surtax"}
            onCancel={onCancel}
            onSubmit={handleSubmit}
        >
            <FormCard title={"Surtax Details"}>
                <div className="md:flex w-full my-5 justify-between gap-3">
                    <FormField label="Country Name">
                        <Input
                            className="w-[100%]"
                            type="text"
                            id=""
                            placeholder="Enter Country Name"
                        />
                    </FormField>
                    <FormField className={'mt-5 md:mt-0'} label="Surtax">
                        <Input
                            className="w-[100%]"
                            type="number"
                            id=""
                            placeholder="Enter Surtax"
                        />
                    </FormField>
                </div>
                <div className="md:flex w-full my-5 justify-between gap-3">
                    <FormField label="Zip Code Type">
                        <Input
                            className="w-[100%]"
                            type="text"
                            id=""
                            placeholder="Enter Zip Code Type"
                        />
                    </FormField>
                    <FormField label="Zip Code Name">
                        <Input
                            className="w-[100%]"
                            type="text"
                            id=""
                            placeholder="Enter Zip Code Name"
                        />
                    </FormField>
                </div>
                <div className="md:flex w-full my-5 justify-between gap-3">
                    <FormField label="Zip Code">
                        <Input
                            className="w-[100%]"
                            type="text"
                            id=""
                            placeholder="Enter Zip Code"
                        />
                    </FormField>
                    
                </div>
                
            </FormCard>
        </FormPageLayout>
    );
};

export default SurtaxForm;
