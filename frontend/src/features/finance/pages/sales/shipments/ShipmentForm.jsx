import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";

import { useLocation, useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a Checkbox component
import { Button } from "@/components/ui/button";
import { CalendarIcon, HelpCircle, Loader, Radio, Trash2, Upload } from "lucide-react";

import { Label } from "recharts";
import { Textarea } from "@/components/ui/textarea";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
    carrier,
    purchase,
    purchaseOrders,
    Vendors,
} from "@/features/utils/ListViewMenu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FormPageLayout from "@/layout/FormPageLayout";
import { fetchContacts } from "@/redux/slices/contacts/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesOrders } from "@/redux/slices/sales/SalesOrderSlice";
import { fetchPackages } from "@/redux/slices/sales/PackageSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { formatDateOnly } from "@/utils/helpers/helper";
import { createShipment, updateShipment } from "@/services/shipments/shipmentsApi";
import { addShipmentToList } from "@/redux/slices/shipments/shipmentSlice";
import { toast } from "react-toastify";
import { required } from "@/utils/validation/rules";
import { validateComplexForm } from "@/utils/validation";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Assuming you have RadioGroup components

// Placeholder for company data, replace with your actual data source

const ShipmentForm = () => {
    const { data: contacts, loading: contactLoading, fetchedContacts } = useSelector((state) => state.contacts.all);
    const { data: salesOrder, loading: salesOrderLoading, fetched: salesOrderFetched } = useSelector((state) => state.salesOrders.all);
    const { data: packages, loading: packagesLoading, fetched: packagesFetched } = useSelector((state) => state.packages.all);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const dataToEdit = location.state
    const [isFormDisabled, setIsFormDisabled] = useState(true);
    const [openShipDate, setOpenShipDate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        customerName: "", //forign key - contact
        salesOrder: "",//forign key - sales order
        package: "",//forign key - package
        shipmentOrder: "",
        shipDate: "",
        carrier: "",
        tracking: "",
        trackingUrl: "",
        shippingCharges: "",
        customerPo: "",
        jobNumber: "",
        notes: ""
    });

    const [customerFullData, setCustomerFullData] = useState({})
    const [salesOrderFullData, setSalesOrderFullData] = useState({});
    // let isFormDisabled = !selectedPO;

    useEffect(() => {

        if (dataToEdit) {
            // setSelectedPO(true)
            setIsFormDisabled(false)
            console.log(dataToEdit.salesOrder?.ROWID,"sales Order datatoedit");
            setFormData({ ...dataToEdit, customerName: dataToEdit?.customerName?.ROWID, salesOrder: "22106000006233292" }); // prefill the form
            console.log(dataToEdit, 'datatoedit')
        }
    }, [dataToEdit]);

    useEffect(() => {
        if (!fetchedContacts) {
            dispatch(fetchContacts());
        }
    }, [fetchedContacts, dispatch]);

    useEffect(() => {
        if (!salesOrderFetched) {
            dispatch(fetchSalesOrders());
        }
    }, [salesOrderFetched, dispatch]);

    useEffect(() => {
        if (!packagesFetched) {
            dispatch(fetchPackages());
        }
    }, [packagesFetched, dispatch]);

    // useEffect(() => {
    //     if (selectedPO && purchaseOrders[selectedPO]) {
    //         setFormData(purchaseOrders[selectedPO]);
    //     }
    // }, [selectedPO]);

    useEffect(() => {
        setErrors({});
    }, [formData])

     useEffect(()=>{
        console.log(dataToEdit,'datatoedit formdata');
        console.log(" datatoedit formdata Does match exist?",
  salesOrder.find(item => (item.ROWID) === dataToEdit.salesOrder?.ROWID)
);

    },[formData])

    const handleChange = (e) => {
        e.preventDefault()
        const { value, name } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }));

    }

    const onCancel = () => {
        navigate(-1);
    };

    const handleSubmit = () => {

        const rules = {
            customerName: [required("Customer Name is Required")],
            salesOrder: [required("Sales Order is Required")],
            package: [required("Package is Required")],
            shipmentOrder: [required("Shipment Order is Required")],
            shipDate: [required("Ship Date is Required")],
            tracking: [required("Tracking is Required")],
        };

        const validationErrors = validateComplexForm(formData, rules);


        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            console.log(validationErrors)
            toast.warning(Object.values(validationErrors)[0])
            return;
        }
        //handle Submit
        setLoading(true);
        if (dataToEdit) {
            updateShipment(formData, dataToEdit.ROWID).then((res)=>{
                if(res.data.success){
                    toast.success(res.data.message);
                   const payload = { ...formData, ROWID: dataToEdit.ROWID, customerName: dataToEdit.customerName, salesOrder: dataToEdit.salesOrder }
                    dispatch(addShipmentToList(payload))
                    onCancel()
                }else{
                    toast.warning(res.data.message);
                }
            }).catch((err)=>{
                console.log(err?.response?.data?.message || err?.message || "Error Occured during the updation!");
            }).finally(()=>{
                setLoading(false);
            })
        } else {
            createShipment(formData).then((res) => {
                if (res.data.success || res.data.sucess) {
                    const payload = { ...formData, ROWID: res.data.shipment[0].ROWID, customerName: customerFullData, salesOrder: salesOrderFullData }
                    dispatch(addShipmentToList(payload))
                    console.log(payload, ' dispatch Payload');
                    toast.success(res.data.message || "Shipment created Successfully")
                    // navigate('finance/sales/shipments/shipment-list')
                    onCancel()
                } else {
                    toast.warning(res.data.message);
                }
            }).catch((err) => {
                console.log(err);
                toast.error(err?.response?.data?.message || err?.message || "Error occured during the creation!")
            }).finally(() => {
                setLoading(false);
            })
        }
    };

   
    return (
        <>
            <FormPageLayout
                title="New Shipment"
                onCancel={onCancel}
                onSubmit={handleSubmit}
                loading={loading}
            >
                {/* <CardTitle className="text-2xl w-full flex justify-between  dark:bg-black bg-white   p-5 ">
        {" "}
        <div> </div>
        <button
          className="text-black cursor-pointer text-xl font-bold"
          onClick={onCancel}
        >
          ✕
        </button>
      </CardTitle> */}

                {/* Vendor Name Section */}

                <div className="w-full mt-5  bg-[#f9f9fb] p-5">
                    <FormField
                        className={
                            "flex whitespace-nowrap w-full items-center justify-center ml-2 "
                        }
                        label="Customer Name"
                    >
                        <Select value={formData.customerName}
                            onValueChange={(value) => {
                                const selected = contacts.find((item) => item.ROWID === value);
                                handleChange({ target: { name: "customerName", value }, preventDefault: () => { } })
                                setCustomerFullData(selected)
                            }} className="text-black  ">
                            <SelectTrigger className={`${errors?.customerName && 'border-red-600'} w-[100vw] bg-white ml-20`} >
                                <SelectValue placeholder="Select or add a customer" />
                            </SelectTrigger>
                            <SelectContent>
                                {contactLoading ? (
                                    <div className="p-4 flex justify-center items-center">
                                        <Loader className="h-4 w-4 animate-spin" />
                                        {/* Alternatively, use a skeleton */}
                                        {/* <Skeleton className="h-4 w-full" /> */}
                                    </div>
                                ) : contacts.length > 0 ? (
                                    contacts.map((option) => (
                                        <SelectItem key={option.ROWID} value={option.ROWID}>
                                            {option.firstName + " " + option.lastName}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-4 text-sm text-muted-foreground">No contacts found</div>
                                )}
                            </SelectContent>
                        </Select>
                    </FormField>
                    <FormField
                        label={<span className="text-red-500">Sales Order#*</span>}
                        className="flex whitespace-nowrap gap-20 mt-5  ml-1 "
                    >
                        <Select value={String(formData.salesOrder)}
                            className="border text-black px-3 py-2"
                            
                            onValueChange={(value) => {
                                const selected = salesOrder.find((item) => item.ROWID === value);
                                handleChange({ target: { name: "salesOrder", value }, preventDefault: () => { } });
                                setSalesOrderFullData(selected)
                                selected && setFormData((prev) => ({ ...prev, customerPo: selected.customerPo, jobNumber: selected.jobNumber }))
                                // setSelectedPO(value)
                                setIsFormDisabled(false);
                            }}
                        >
                            <SelectTrigger className={`${errors?.salesOrder && 'border-red-600'} w-[100vw] bg-white ml-20`} >
                                <SelectValue placeholder="Select Sales Order" />
                            </SelectTrigger>
                            <SelectContent>
                                {salesOrderLoading ? (
                                    <div className="p-4 flex justify-center items-center">
                                        <Loader className="h-4 w-4 animate-spin" />
                                        {/* Alternatively, use a skeleton */}
                                        {/* <Skeleton className="h-4 w-full" /> */}
                                    </div>
                                ) : salesOrder.length > 0 ? (
                                    salesOrder.map((option) => (
                                        <SelectItem key={option.ROWID} value={option.ROWID}>
                                            {option?.salesOrder}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-4 text-sm text-center text-muted-foreground">No Sales Order found</div>
                                )}
                            </SelectContent>
                        </Select>
                    </FormField>
                </div>

                <div
                    className={`ml-5 ${isFormDisabled ? "opacity-30 pointer-events-none" : ""
                        } `}
                >
                    <div className="flex items-center">
                        <div className="space-y-5 mt-10 ">
                            <FormField
                                label={<span className="text-red-500">Package#</span>}
                                className="flex whitespace-nowrap gap-16"
                            >
                                <Select
                                    className="border text-black px-3 py-2"
                                    value={formData.package}
                                    onValueChange={(value) => {
                                        const selected = packages.find((pkg) => pkg.ROWID === value);
                                        const numberPart = selected?.packageSlip.split("-")[1];
                                        handleChange({ target: { name: "package", value }, preventDefault: () => { } });
                                        numberPart && setFormData((prev) => ({ ...prev, shipmentOrder: `SHP-${numberPart}` }))
                                    }}
                                >
                                    <SelectTrigger className={`${errors?.package && 'border-red-600'} w-[100vw] bg-white `}  >
                                        <SelectValue placeholder="Select Package" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {packagesLoading ? (
                                            <div className="p-4 flex justify-center items-center">
                                                <Loader className="h-4 w-4 animate-spin" />
                                                {/* Alternatively, use a skeleton */}
                                                {/* <Skeleton className="h-4 w-full" /> */}
                                            </div>
                                        ) : packages.length > 0 ? (
                                            packages.map((option) => (
                                                <SelectItem key={option.ROWID} value={option.ROWID}>
                                                    {option?.packageSlip}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-4 text-sm text-center text-muted-foreground">No Sales Order found</div>
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormField>

                            <FormField
                                label={<span className="text-red-500">Shipment Order#</span>}
                                className="flex whitespace-nowrap gap-16"
                            >
                                <Input className={`${errors?.shipmentOrder && 'border-red-600'} `}
                                    type="text"
                                    placeholder="Shipment Order"
                                    value={formData.shipmentOrder}
                                    name="shipmentOrder"
                                    onChange={(e) => handleChange(e)}

                                />
                            </FormField>

                            <FormField
                                label={<span className="text-red-500">Ship Date*</span>}
                                className="flex whitespace-nowrap gap-21"
                            >
                                {/* <Input
                                    type="date"
                                    placeholder="dd Jun 2025"
                                    value={formData.shipDate}
                                    name="shipDate"
                                    onChange={(e)=>handleChange(e)}

                                /> */}
                                <Popover open={openShipDate} onOpenChange={setOpenShipDate} >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            data-empty={!formData.shipDate}
                                            className={`data-[empty=true]:text-muted-foreground justify-start min-w-xs text-left font-normal ${errors?.shipDate && 'border-red-600'}`}
                                        >
                                            <CalendarIcon />
                                            {formData.shipDate ? format(formData.shipDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={formData.shipDate ?? undefined} onSelect={(date) => {
                                            const formatted = date ? formatDateOnly(date) : "";
                                            setFormData((prev) => ({ ...prev, shipDate: formatted }));
                                            setOpenShipDate(false);
                                        }} />
                                    </PopoverContent>
                                </Popover>
                            </FormField>

                            <div className="flex justify-between w-full">
                                <FormField
                                    label="Carrier"
                                    className="flex whitespace-nowrap gap-24"
                                >
                                    <Select value={formData.carrier}
                                        onValueChange={(value) => {
                                            handleChange({ target: { name: "carrier", value }, preventDefault: () => { } })
                                        }} className="text-black  ">
                                        <SelectTrigger className=" w-[100vw] bg-white">
                                            <SelectValue placeholder="select or type to add" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {carrier.map((item) =>
                                                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormField>


                                <FormField
                                    label={<span className="text-red-500 ml-12">Tracking#</span>}
                                    className="flex whitespace-nowrap gap-16"
                                >
                                    <Input
                                        type="text"
                                        className={`w-[100vw] ${errors?.tracking && 'border-red-600'}`}
                                        placeholder="Tracking No"
                                        name="tracking"
                                        value={formData.tracking}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormField>
                            </div>

                            <FormField
                                label={<span className="text-black ">Tracking URL</span>}
                                className="flex whitespace-nowrap gap-16"
                            >
                                <Input
                                    type="text"
                                    className="w-[100vw]"
                                    placeholder="Tracking URL"
                                    name="trackingUrl"
                                    value={formData.trackingUrl}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormField>

                            <FormField
                                label={<span className="text-black ">Shipping Charges</span>}
                                className="flex whitespace-nowrap gap-16"
                            >
                                <Input
                                    type="text"
                                    className="w-[100vw]"
                                    placeholder="Shipping Charges"
                                    name="shippingCharges"
                                    value={formData.shippingCharges}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormField>


                            <div className="flex justify-between w-full">
                                <FormField
                                    label="Customer PO"
                                    className="flex whitespace-nowrap gap-24"
                                >
                                    <Input
                                        type="text"
                                        className="w-[100vw]"
                                        placeholder="Customer PO"
                                        name="customerPo"
                                        value={formData.customerPo}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormField>


                                <FormField
                                    label={<span className="text-black ml-12">Job Number</span>}
                                    className="flex whitespace-nowrap gap-16"
                                >
                                    <Input
                                        type="text"
                                        className="w-[100vw]"
                                        placeholder="Job No"
                                        name="jobNumber"
                                        value={formData.jobNumber}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormField>
                            </div>

                        </div>
                    </div>



                    <FormField
                        label="Notes "
                        className={"mt-10 text-sm mb-10"}
                    >
                        <Textarea
                            id="internal-notes"
                            value={formData.notes}
                            name="notes"
                            onChange={(e) => handleChange(e)}
                            className="text-sm w-full min-h-[50px]"
                        />
                    </FormField>



                    <div className="flex gap-3 border-t pt-4">
                        <Button
                            className={"bg-[#fd9134] text-white"}
                            variant="outline"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>

                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </FormPageLayout>
        </>
    );
};
export default ShipmentForm;
