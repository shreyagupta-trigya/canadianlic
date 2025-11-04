import { FormCard, FormField } from '@/components/custom/CustomFormComponents'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import FormPageLayout from '@/layout/FormPageLayout'
import { addRoleToList, updateRoleInList } from '@/redux/slices/userRoleSlice/userRoleSlice'
import { createUserRole, updateUserRole } from '@/services/portal/userRoles/userRolesApi'
import { validateForm } from '@/utils/validation'
import { required } from '@/utils/validation/rules'
import { ChevronDown, ChevronRight, Rss } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RolesForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()
    const dataToEdit = location.state
    const modules = [
        {
            parentModule: "CRM",
            subModules: [
                { name: "Leads" },
                { name: "Contacts" },
                { name: "Accounts" },
                { name: "Opportunity" },
                { name: "Quote"},
                { name: "Delivery Note"},
                { name: "CRM Tasks"},
            ]

        }, 
        {
            parentModule: "Inventory",
            subModules: [
                { name: "Items" },
                { name: "Stock Transfer" },
                { name: "Warehouse" },
            ]
        }, {
            parentModule: "Procrument",
            subModules: [
                { name: "Vendors" },
                { name: "Material Requisition" },
                { name: "Purchase Orders" },
                { name: "Purchase Receive" },
                { name: "Bills" },
                { name: "Vendors Credits" },
            ]

        },
        {
            parentModule: "Production",
            subModules: [
                // { name: "Shipment Tracker" }
            ]

        }, 
         {
            parentModule: "Portal",
            subModules: [
                { name: "Manage Users" },
                // { name: "Surtax" }
            ]

        }
    ]
    const allPermissionKeys = [
        "add",
        "delete",
        "viewOnly",
        "viewAll",
        "modifyOnly",
        "modifyAll",
        "fullAccess",
        "module_access",
        "moduleAccess",
        "import",
        "export",
    ];
    const overrideViewOnlyPermissions = [
        "viewAll",
        "modifyOnly",
        "modifyAll",
        "add",
        "delete",
        "fullAccess"
    ];

    const [expanded, setExpanded] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        roleName: "",
        description: "",
        permissions: []
    })
    useEffect(() => {
        if (dataToEdit) {
            setFormData(dataToEdit); // prefill the form
        }
    }, [dataToEdit]);

    useEffect(() => {
        setErrors({});
    }, [formData])

    const onCancel = () => {
        navigate('/portal/manage-users/roles')
    }

    const handleChange = (e) => {
        e.preventDefault()
        const { value, name } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const normalizePermissionsBeforeSubmit = (modules) => {
        const normalizedPermissions = [];

        modules.forEach(module => {
            module.subModules.forEach(sub => {
                const existing = formData.permissions.find(p => p.moduleName === sub.name);
                const permissionEntry = { moduleName: sub.name };

                allPermissionKeys.forEach(key => {
                    permissionEntry[key] = existing ? !!existing[key] : false;
                });

                // Ensure module access flags follow the rules
                const anyTrue = allPermissionKeys.some(
                    key => key !== "moduleName" && permissionEntry[key] === true
                );

                if (anyTrue) {
                    permissionEntry.module_access = true;
                    permissionEntry.moduleAccess = true;
                }

                normalizedPermissions.push(permissionEntry);
            });
        });

        return normalizedPermissions;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const rules = {
            roleName: [required("Role Name is Required")],
            description: [required("Description is Required")],
        };

        const validationErrors = validateForm(formData, rules);

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            console.log(validationErrors)
            toast.warning(Object.values(validationErrors)[0])
            return;
        }
        setLoading(true)
        const finalPermissions = normalizePermissionsBeforeSubmit(modules);
        const payload = {
            ...formData,
            permissions: finalPermissions,
        };

        if (dataToEdit) {
            //Update Role
            updateUserRole(payload,dataToEdit.id).then((res)=>{
                if(res.data.success){
                    toast.success("Role Updated Successfully")
                    dispatch(updateRoleInList(payload));
                }
            }).catch((err) => {
                console.log(err);
                toast.error(err?.response?.data?.message || err.message || "Error Occured during the role creation!")
            }).finally(() => {
                setLoading(false)
                navigate('/portal/manage-users/roles')
            })
        } else {
            //Create Role
            createUserRole(payload).then((res) => {
                if (res.data.success) {
                    toast.success('Role Created Successfully');
                    dispatch(addRoleToList({ ...payload, id: res.data.response.ROWID }))
                } else {
                    console.log(res.data);
                }
            }).catch((err) => {
                console.log(err);
                toast.error(err?.response?.data?.message || err.message || "Error Occured during the role creation!")
            }).finally(() => {
                setLoading(false)
                navigate('/portal/manage-users/roles')
            })
        }
    }



    const handlePermissionChange = (moduleName, permissionType, isChecked) => {
        setFormData(prevState => {
            let permissions = [...prevState.permissions];
            let index = permissions.findIndex(p => p.moduleName === moduleName);
            let existing = index !== -1 ? { ...permissions[index] } : { moduleName };

            // Set the specific permission
            existing[permissionType] = isChecked;

            // If any permission is checked, enable module access flags
            const shouldEnableModuleAccess = isChecked || Object.entries(existing).some(
                ([key, value]) =>
                    key !== "moduleName" && key !== permissionType && value === true
            );

            const shouldDisableFullAccess = existing.fullAccess === true &&
                Object.entries(existing).some(
                    ([key, value]) =>
                        key !== "moduleName" && key !== "fullAccess" && value === false
                );


            if (shouldDisableFullAccess) {
                existing.fullAccess = false
            }

            if (shouldEnableModuleAccess) {
                existing.module_access = true;
                existing.moduleAccess = true;
                existing.import = true
                existing.export = true
            }

            // Auto-enable related permissions
            if (permissionType === "fullAccess" && isChecked) {
                existing.fullAccess = true
                existing.viewAll = true;
                existing.viewOnly = true;
                existing.modifyAll = true;
                existing.modifyOnly = true;
                existing.add = true;
                existing.delete = true;
            }
            if (permissionType === "viewAll" && isChecked) {
                existing.viewOnly = true;
            }

            if (permissionType === "add" && isChecked) {
                existing.viewOnly = true;
            }

            if (permissionType === "modifyAll" || permissionType == "modifyOnly" && isChecked) {
                existing.viewOnly = true;
            }

            if (permissionType === "delete" && isChecked) {
                existing.viewOnly = true;

            }

            // Remove permission if everything is unchecked
            const allFalse = Object.entries(existing).every(
                ([key, value]) =>
                    key === "moduleName" || value === false || value === undefined
            );

            if (allFalse) {
                permissions.splice(index, 1);
            } else {
                if (index !== -1) {
                    permissions[index] = existing;
                } else {
                    permissions.push(existing);
                }
            }

            return { ...prevState, permissions };
        });
    };



    const toggleExpand = (moduleName) => {
        setExpanded(prev => (prev === moduleName ? null : moduleName));
    };



    return (
            <FormPageLayout
              title={<span className="text-lg font-semibold md:text-2xl">Create Role</span>}
              onCancel={onCancel}
              onSubmit={handleSubmit}
              loading={loading}
              cancelButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
              submitButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
            >
            <FormCard className={'border-0 px-0 my-0 py-0 '}>
                <div className="md:flex w-full my-5 justify-between gap-3">
                    <FormField label="Role Name" >
                        <Input onChange={(e) => handleChange(e)}
                            className={`${errors?.roleName && 'border-red-600'} w-[100%]`}
                            type="text"
                            name="roleName"
                            placeholder="Enter Role Name"
                            value={formData.roleName}
                        />
                    </FormField>
                    <FormField className={'mt-5 md:mt-0'} label="Role Description">
                        <Input onChange={(e) => handleChange(e)}
                            className={`${errors?.description && 'border-red-600'} w-[100%]`}
                            type="text"
                            name="description"
                            placeholder="Role Description"
                            value={formData.description}
                        />
                    </FormField>
                </div>
                <p className='text-sm font-medium my-3'>Set Permissions</p>
                <Table className={'border rounded-lg'} >
                    {/* <TableCaption>A list of your modules and submodules.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Module</TableHead>
                            <TableHead>View Only</TableHead>
                            <TableHead>View All</TableHead>
                            <TableHead>Create</TableHead>
                            <TableHead>Modify Only</TableHead>
                            <TableHead>Modify All</TableHead>
                            <TableHead>Delete</TableHead>
                            <TableHead>Full Access</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {modules.map((module, index) => {
                            const isOpen = expanded === module.parentModule;
                            return (
                                <React.Fragment key={index}>
                                    {/* Parent row */}
                                    <TableRow
                                        className="cursor-pointer"
                                        onClick={() => toggleExpand(module.parentModule)}
                                    >
                                        <TableCell
                                            className="bg-muted font-bold min-w-[200px] flex items-center gap-2"
                                        >
                                            {isOpen ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                            {module.parentModule}
                                        </TableCell>
                                        <TableCell
                                            colSpan={7}
                                            className="bg-muted "
                                        >
                                        </TableCell>
                                    </TableRow>


                                    {/* Conditionally render submodules */}
                                    {isOpen &&
                                        module.subModules.map((sub, subIndex) => {
                                            const permission = formData.permissions.find(p => p.moduleName === sub.name);
                                            return (

                                                <TableRow key={subIndex}>
                                                    <TableCell className="pl-8">{sub.name}</TableCell>
                                                    <TableCell className=""><Checkbox disabled={overrideViewOnlyPermissions.some(key => permission?.[key])} checked={formData.permissions.find(p => p.moduleName === sub.name)?.viewOnly || false}
                                                        onCheckedChange={(checked) => handlePermissionChange(sub.name, "viewOnly", checked)} name="viewOnly" className={'border border-slate-400'} /></TableCell>

                                                    <TableCell className=""><Checkbox checked={formData.permissions.find(p => p.moduleName === sub.name)?.viewAll || false}
                                                        onCheckedChange={(checked) => handlePermissionChange(sub.name, "viewAll", checked)} name="viewAll" className={'border border-slate-400'} /></TableCell>

                                                    <TableCell className="" ><Checkbox checked={formData.permissions.find(p => p.moduleName === sub.name)?.add || false}
                                                        onCheckedChange={(checked) => handlePermissionChange(sub.name, "add", checked)} name="add" className={'border border-slate-400'} /></TableCell>

                                                    <TableCell className=""><Checkbox checked={formData.permissions.find(p => p.moduleName === sub.name)?.modifyOnly || false}
                                                        onCheckedChange={(checked) => handlePermissionChange(sub.name, "modifyOnly", checked)} name="modifyOnly" className={'border border-slate-400'} /></TableCell>

                                                    <TableCell className=""><Checkbox checked={formData.permissions.find(p => p.moduleName === sub.name)?.modifyAll || false}
                                                        onCheckedChange={(checked) => handlePermissionChange(sub.name, "modifyAll", checked)} name="modifyAll" className={'border border-slate-400'} /></TableCell>

                                                    <TableCell className=""><Checkbox checked={formData.permissions.find(p => p.moduleName === sub.name)?.delete || false}
                                                        onCheckedChange={(checked) => handlePermissionChange(sub.name, "delete", checked)} name="delete" className={'border border-slate-400'} /></TableCell>

                                                    <TableCell className=""><Checkbox checked={formData.permissions.find(p => p.moduleName === sub.name)?.fullAccess || false}
                                                        onCheckedChange={(checked) => handlePermissionChange(sub.name, "fullAccess", checked)} name="fullAccess" className={'border border-slate-400'} /></TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>


            </FormCard>
        </FormPageLayout>
    )
}

export default RolesForm