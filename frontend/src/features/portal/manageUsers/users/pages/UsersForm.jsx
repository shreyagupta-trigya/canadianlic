import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function UsersForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employeeName: "",
        owner: "",
        email: "",
        employeeStatus: "",
        dateOfBirth: "",
        otherContactDetail: "",
        startDate: "",
        phoneNumber: "",
        rateHour: "",
        nationality: "",
        permissions: "",
        department: "",
        taxCode: "",
        iRDNumber: "",
        bank: "",
        branch: "",
        account: "",
        suffix: "",
        timesheetLink: "",
        vehicleJobLink: "",
        machineJobLink: "",
        worksheetLink: "",
        confirmationDate: "",
        street: "",
        city: "",
        state: "",
        PinCode: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // API call can be added here
    };

    const handleReset = () => {
        setFormData({
            employeeName: "",
            owner: "",
            email: "",
            employeeStatus: "",
            dateOfBirth: "",
            otherContactDetail: "",
            startDate: "",
            phoneNumber: "",
            rateHour: "",
            nationality: "",
            permissions: "",
            department: "",
            taxCode: "",
            iRDNumber: "",
            bank: "",
            branch: "",
            account: "",
            suffix: "",
            timesheetLink: "",
            vehicleJobLink: "",
            machineJobLink: "",
            worksheetLink: "",
            confirmationDate: "",
            street: "",
            city: "",
            state: "",
            PinCode: "",
            country: "",
        });
    };

    return (
        
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="w-full flex justify-between px-6 text-xl font-semibold py-4 border-b">
                    <h2>New User</h2>
                      <div className=" flex justify-center gap-4 ">
                    <Button onClick={()=>navigate(-1)} className={"cursor-pointer bg-gray-300 hover:bg-gray-500"}>Back</Button>
                    <Button className={"cursor-pointer bg-blue-300 hover:bg-blue-500"}>Submit</Button>
            
                  </div>
                  </div>
            {/* Employee Information */}
            <div className="card p-4 border rounded-lg">
                <legend className="sub-headers text-lg font-semibold mb-2">Employee Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                        <Label className="mb-2">Employee Name <span className="text-red-500">*</span></Label>
                        <Input name="employeeName" value={formData.employeeName} onChange={handleChange} placeholder="Enter Name" />
                    </div>
                    <div>
                        <Label className="mb-2">Owner <span className="text-red-500">*</span></Label>
                        <Input name="owner" value={formData.owner} onChange={handleChange} placeholder="Enter Owner" />
                    </div>
                    <div>
                        <Label className="mb-2">Email <span className="text-red-500">*</span></Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <Label htmlFor="employeeStatus" className="mb-2">Employee Status</Label>
                        <Select
                            id="employeeStatus"
                            value={formData.employeeStatus}
                            onValueChange={(val) =>
                                handleChange({ target: { name: "employeeStatus", value: val } })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent side="bottom" sideOffset={5}>
                                <SelectItem value="None">None</SelectItem>
                                <SelectItem value="Underprocess">Underprocess</SelectItem>
                                <SelectItem value="Waiting on Document">Waiting on Document</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="mb-2">Date of Birth</Label>
                        <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    <div>
                        <Label className="mb-2">Other Contact Detail</Label>
                        <Input name="otherContactDetail" value={formData.otherContactDetail} onChange={handleChange} placeholder="Enter Contact Details" />
                    </div>
                    <div>
                        <Label className="mb-2">Start Date</Label>
                        <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                    </div>
                    <div>
                        <Label className="mb-2">Phone Number</Label>
                        <Input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter Phone Number" />
                    </div>
                    

                    <div>
                        <Label className="mb-2"htmlFor="nationality">Nationality</Label>
                        <Select
                            id="nationality"
                            value={formData.nationality}
                            onValueChange={(val) => handleChange({ target: { name: "nationality", value: val } })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Nationality" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="New Zealand">New Zealand</SelectItem>
                                <SelectItem value="India">India</SelectItem>
                                <SelectItem value="USA">USA</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="permissions">
                            Permission <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            id="permissions"
                            value={formData.permissions}
                            onValueChange={(val) => handleChange({ target: { name: "permissions", value: val } })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Permission" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Manager">Manager</SelectItem>
                                <SelectItem value="Executive">Executive</SelectItem>
                                <SelectItem value="Intern">Intern</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Department Field */}
                    <div>
                        <Label className="mb-2" htmlFor="department">Department</Label>
                        <Select
                            id="department"
                            value={formData.department}
                            onValueChange={(val) => handleChange({ target: { name: "department", value: val } })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="HR">HR</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

                <div className="card p-4 border rounded-lg">
                <legend className="sub-headers text-lg font-semibold mb-2">Address Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="mb-2">Street</Label>
                        <Input name="street" value={formData.street} onChange={handleChange} placeholder="Enter Street" />
                    </div>
                    <div>
                        <Label className="mb-2">City</Label>
                        <Input name="city" value={formData.city} onChange={handleChange} placeholder="Enter City" />
                    </div>
                    <div>
                        <Label className="mb-2">State</Label>
                        <Input name="state" value={formData.state} onChange={handleChange} placeholder="Enter State" />
                    </div>
                    <div>
                        <Label className="mb-2">Pincode</Label>
                        <Input name="PinCode" type="number" value={formData.PinCode} onChange={handleChange} placeholder="Enter Pincode" />
                    </div>
                    <div>
                        <Label className="mb-2" htmlFor="country">Country</Label>
                        <Select
                            id="country"
                            value={formData.country}
                            onValueChange={(val) =>
                                handleChange({ target: { name: "country", value: val } })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent side="bottom" sideOffset={5}>
                                <SelectItem value="India">India</SelectItem>
                                <SelectItem value="USA">USA</SelectItem>
                                <SelectItem value="New Zealand">New Zealand</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
  
            {/* Bank Details */}
            <div className="card p-4 border rounded-lg">
                <legend className="sub-headers text-lg font-semibold mb-2">Bank Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="mb-2">Bank</Label>
                        <Input name="bank" value={formData.bank} onChange={handleChange} placeholder="Enter Bank Name" />
                    </div>
                    <div>
                        <Label className="mb-2">Branch</Label>
                        <Input name="branch" value={formData.branch} onChange={handleChange} placeholder="Enter Branch Name" />
                    </div>
                    <div>
                        <Label className="mb-2">Account Number</Label>
                        <Input name="account" type="number" value={formData.account} onChange={handleChange} placeholder="Enter Account Number" />
                    </div>
                    
                </div>
            </div>

            
        </form>
    );
}

export default UsersForm;
