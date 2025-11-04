import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, MoreVertical, Plus, UploadCloud } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const filteredData = [
    { name: "CREDIT CARD FEE", price: "-$98.20", sku: "" },
    {
        name: "AREA: SHOEBOX GALLEON PEDESTRIAN COMPANION QM 85W 120-277V",
        price: "$0.00",
        sku: "GPC-AF-02-LED-E1-T4FT-BZ-QM-800",
    },
    { name: "2441317", price: "$0.00", sku: "2441317" },
    {
        name: "2X4 LED PANEL",
        price: "$0.00",
        sku: "RXR24-2WSO-40/80-CW-VARDM-122/00-(8400)",
    },
    { name: "TR24-DM-TWTS", price: "$0.00", sku: "TR24-DM-TWTS" },
    { name: "CRVHTUBA", price: "$0.00", sku: "CRVHTUBA" },
    { name: "LTB60-1LZ", price: "$0.00", sku: "LTB60-1LZ" },
    { name: "LTB60-1LZ", price: "$0.00", sku: "LTB60-1LZ" },
    { name: "LTB60-1LZ", price: "$0.00", sku: "LTB60-1LZ" },
    { name: "LTB60-1LZ", price: "$0.00", sku: "LTB60-1LZ" },
    { name: "LTB60-1LZ", price: "$0.00", sku: "LTB60-1LZ" },
];
const filterOptions = [
    "Estimates",
    "Sales Orders",
    "Invoices",
    "Credit Notes",
    "Recurring Invoices",
];
const historyData = [
    { date: "05 Mar 2024 10:11 AM", detail: "updated by", by: "jamie" },
    { date: "05 Oct 2023 05:07 AM", detail: "updated by", by: "jamie" },
    { date: "07 Mar 2023 02:20 AM", detail: "updated by", by: "jamie" },
    {
        date: "29 Dec 2021 02:39 AM",
        detail: "updated from Zoho CRM by",
        by: "Zoho Books",
    },
    { date: "29 Dec 2021 02:09 AM", detail: "marked as active", by: "jamie" },
    {
        date: "02 Dec 2021 01:31 PM",
        detail: "updated from Zoho CRM by",
        by: "Zoho Books",
    },
    {
        date: "02 Dec 2021 12:11 PM",
        detail: "marked as inactive",
        by: "Jeremy Newton",
    },
    {
        date: "15 Sep 2021 02:12 AM",
        detail: "updated from Zoho CRM by",
        by: "Zoho Books",
    },
    { date: "15 Sep 2021 05:38 AM", detail: "created by", by: "jamie" },
];
const statusOptions = [
    "All",
    "In Transit",
    "Received",
    "Billed",
    "Partially Billed",
];
const ItemListDetail = () => {
    const { data, loading, error, fetched } = useSelector((state) => state.inventory.all);
    const location = useLocation();
    const vendorDetails = location.state
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [filterBy, setFilterBy] = useState("Estimates");
    const [status, setStatus] = useState("All");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [currentVendorDetails, setCurrentVendorDetails] = useState({});
    
    useEffect(()=>{
        setCurrentVendorDetails(vendorDetails);
    },[])
    return (
        <>
            <div className="flex border h-screen overflow-hidden ">
                {/* Sidebar */}
                <div className="w-1/4 border-r">
                    {/* Dropdown Header */}
                    <div className="p-4 border-b h-20 w-full bg-background flex items-center justify-between">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="font-semibold">
                                    {selectedStatus}
                                    <ChevronDown className="ml-2 w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {statusOptions.map((status) => (
                                    <DropdownMenuItem
                                        key={status}
                                        onSelect={() => setSelectedStatus(status)}
                                    >
                                        {status}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => navigate("/purchase-recieve/create")}
                                size="sm"
                                className="bg-orange-500"
                            >
                                +
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Import</DropdownMenuItem>
                                    <DropdownMenuItem>Export</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Sales Orders List */}
                    <div className="h-[calc(100%-120px)] overflow-y-scroll">
                        {data.map((po) => (
                            <div
                                key={po.name}
                                className="p-4 hover:bg-gray-100 border-b cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-semibold text-sm  w-45 ">
                                            {po.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {po.sku}
                                        </div>
                                        <span
                                            className={`text-sm mt-1 ${po.status === "Done"
                                                    ? "text-green-500"
                                                    : po.status === "In Process"
                                                        ? "text-blue-500"
                                                        : "text-gray-500"
                                                }`}
                                        >
                                            {po.status}
                                        </span>
                                    </div>
                                    <div className="font-semibold ">{po.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="flex-1 ">
                    <span className="flex justify-between items-center p-5 border-b w-full">
                        <h2 className="text-lg font-semibold mb-2">CREDIT CARD FEE</h2>
                        <span
                            className="cursor-pointer text-xl w-5"
                            onClick={() => navigate(-1)}
                        >
                            X
                        </span>
                    </span>

                    <Tabs defaultValue="overview" className=" h-full py-5 mt-5 w-full">
                        <TabsList className=" w-80 shadow-none rounded-none bg-white  ">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="transactions">Transactions</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        <hr />
                        <div className="h-[calc(100%-170px)] overflow-y-scroll">
                            <TabsContent value="overview">
                                {/* Item Info */}

                                <div className="mt-1 flex gap-16 space-y-6">
                                    <div>
                                        <div className="p-4 space-y-1">
                                            <div className=" ">
                                                <div className="flex p-2 gap-10">
                                                    <Label className="text-muted-foreground">
                                                        Item Type
                                                    </Label>
                                                    <div>{currentVendorDetails.productType}</div>
                                                </div>
                                                <div className="flex p-2 gap-10">
                                                    <Label className="text-muted-foreground">
                                                       Unit
                                                    </Label>
                                                    <div>{currentVendorDetails.unit || "NA"}</div>
                                                </div>
                                                <div className="flex p-2 gap-10">
                                                    <Label className="text-muted-foreground">
                                                        Creator Master Id
                                                    </Label>
                                                    <div>{currentVendorDetails.creatorMasterId}</div>
                                                </div>
                                                <div className="flex p-2 gap-10">
                                                    <Label className="text-muted-foreground">
                                                        Created Source
                                                    </Label>
                                                    <div>CSV</div>
                                                </div>
                                                <div className="flex p-2 gap-10">
                                                    <Label className="text-muted-foreground">
                                                        Tax Preference
                                                    </Label>
                                                    <div>{currentVendorDetails?.salesInformation?.taxPreference || "NA  "}</div>
                                                </div>
                                                <div className="flex p-2 gap-10">
                                                    <Label className="text-muted-foreground">
                                                        Inventory Account
                                                    </Label>
                                                    <div>{currentVendorDetails?.inventoryAccount || "NA  "}</div>
                                                </div>
                                                <div className="flex p-2 gap-10">
                                                    <Label className="text-muted-foreground">
                                                        Inventory Valuation Method
                                                    </Label>
                                                    <div>{currentVendorDetails?.inventoryValuationMethod || "NA  "}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4  space-y-2">
                                            <Label className="text-base ml-3 font-semibold">
                                                Purchase Information
                                            </Label>
                                            <div className="flex gap-4">
                                                <div>
                                                    <div className="flex p-3 gap-10">
                                                        <Label className="text-muted-foreground">
                                                            Cost Price
                                                        </Label>
                                                        <div className={`${currentVendorDetails?.purchaseInformation?.costPrice <0?'text-red-600':currentVendorDetails?.salesInformation?.sellingPrice>0?'text-green-600':""}`}>{currentVendorDetails?.salesInformation?.sellingPrice || 0}</div>
                                                    </div>
                                                    <div className="flex p-3 gap-10">
                                                        <Label className="text-muted-foreground">
                                                            Purchase Account
                                                        </Label>
                                                        <div>{currentVendorDetails.purchaseInformation?.account || "NA"}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sales Info */}
                                        <div className="p-4  space-y-2">
                                            <Label className="text-base ml-3 font-semibold">
                                                Sales Information
                                            </Label>
                                            <div className="flex gap-4">
                                                <div>
                                                    <div className="flex p-3 gap-10">
                                                        <Label className="text-muted-foreground">
                                                            Selling Price
                                                        </Label>
                                                        <div className={`${currentVendorDetails?.salesInformation?.sellingPrice <0?'text-red-600':currentVendorDetails?.salesInformation?.sellingPrice>0?'text-green-600':""}`}>{currentVendorDetails?.salesInformation?.sellingPrice || 0}</div>
                                                    </div>
                                                    <div className="flex p-3 gap-10">
                                                        <Label className="text-muted-foreground">
                                                            Sales Account
                                                        </Label>
                                                        <div>{currentVendorDetails.salesInformation?.account || "NA"}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reporting Tags */}
                                        <div className="p-4 space-y-2">
                                            <Label className="text-base font-semibold">
                                                Reporting Tags
                                            </Label>
                                            <div className="text-muted-foreground text-sm">
                                                No reporting tag has been associated with this item.
                                            </div>
                                        </div>
                                    </div>
                                    {/* Image Upload */}
                                    <div className="p-2 ml-10">
                                        <Label
                                            htmlFor="file"
                                            className="flex flex-col items-center justify-center cursor-pointer p-3 w-70 h-48 border-2 border-dashed rounded-md"
                                        >
                                            <UploadCloud className="h-8 w-8 mb-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Drag image(s) here or{" "}
                                                <div className="text-blue-500 underline text-center cursor-pointer">
                                                    Browse images
                                                </div>
                                                <input type="file" id="file" className="hidden" />
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                You can add up to 15 images, each not exceeding 5 MB in
                                                size and 7000 X 7000 pixels resolution.
                                            </p>
                                        </Label>
                                    </div>
                                </div>

                                <>
                                    {/* Associated Price Lists Section */}

                                    <div className="flex px-3">
                                        <Tabs onClick={() => setOpen(!open)}>
                                            <TabsList className="bg-transparent">
                                                <TabsTrigger className=" " variant="none" value="">
                                                    Associated Price Lists
                                                </TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setOpen(!open)}
                                        >
                                            <ChevronDown
                                                className={`transition-transform ${open ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </Button>
                                    </div>
                                    {open && (
                                        <div className="px-3">
                                            <div className="mt-3 border w-[50vw] rounded-md">
                                                <div className="grid grid-cols-3 p-3 text-xs font-medium bg-muted border-b">
                                                    <div>NAME</div>
                                                    <div>PRICE</div>
                                                    <div>DISCOUNT</div>
                                                </div>

                                                <div className="p-4 text-sm flex flex-col text-muted-foreground text-center">
                                                    The sales price lists associated with this item will
                                                    be displayed here.{" "}
                                                    <span className="text-blue-600 underline cursor-pointer">
                                                        Create Price List
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="flex text-blue-400 mt-5 cursor-pointer">
                                                {" "}
                                                <Plus /> Associate Price List
                                            </p>
                                        </div>
                                    )}

                                    {/* Sales Order Summary Section */}
                                    <div className=" border rounded-xl mt-5 mx-3 ">
                                        <div className="flex justify-between items-center rounded-t-xl border-b w-full py-5 px-3 bg-gray-50 ">
                                            <h3 className="text-sm font-medium">
                                                Sales Order Summary (In USD)
                                            </h3>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-1 text-xs"
                                            >
                                                This Month <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="flex flex-col p-5 md:flex-row gap-6">
                                            {/* Placeholder Chart */}
                                            <div className="flex-1  border-r h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                                                No data found.
                                            </div>

                                            {/* Sales Summary */}
                                            <div className="w-40 border max-h-20 p-5 flex flex-col justify-center bg-blue-100 mt-30 items-start">
                                                <div className="flex items-center  gap-2 mb-1">
                                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                                    <span className="text-sm font-medium">
                                                        DIRECT SALES
                                                    </span>
                                                </div>
                                                <div className="text-lg ml-5 font-semibold">$0.00</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </TabsContent>

                            <TabsContent value="transactions">
                                <div className="p-6">
                                    {/* Filter Buttons */}
                                    <div className="flex items-center gap-4 mb-10">
                                        {/* Filter By */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="text-sm">
                                                    Filter By:{" "}
                                                    <span className="font-medium ml-1">{filterBy} ▾</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48">
                                                {filterOptions.map((option) => (
                                                    <DropdownMenuItem
                                                        key={option}
                                                        onClick={() => setFilterBy(option)}
                                                        className={
                                                            filterBy === option
                                                                ? " text-white bg-blue-600 cursor-pointer"
                                                                : "cursor-pointer"
                                                        }
                                                    >
                                                        {option}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* Status */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="text-sm">
                                                    Status:{" "}
                                                    <span className="font-medium ml-1">{status} ▾</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-32">
                                                {["All", "Open", "Closed"].map((option) => (
                                                    <DropdownMenuItem
                                                        key={option}
                                                        onClick={() => setStatus(option)}
                                                        className="cursor-pointer"
                                                    >
                                                        {option}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Empty State */}
                                    <div className="text-muted-foreground text-sm text-center">
                                        There are no {filterBy.toLowerCase()}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="history">
                                <div className="">
                                    <div className="grid grid-cols-2 px-2 pb-2 w-full text-xs font-medium text-muted-foreground border-b">
                                        <div>DATE</div>
                                        <div>DETAILS</div>
                                    </div>
                                    {historyData.map((entry, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-2 px-2 py-2 border-b text-sm text-muted-foreground last:border-b-0"
                                        >
                                            <div className="whitespace-nowrap">{entry.date}</div>
                                            <div>
                                                {entry.detail}{" "}
                                                <span className="italic text-blue-600">
                                                    - {entry.by}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default ItemListDetail;
