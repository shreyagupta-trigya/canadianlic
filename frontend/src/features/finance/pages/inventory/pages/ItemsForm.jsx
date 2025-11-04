// import { cn } from "@/lib/utils";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  account,
  brand,
  categories,
  lightingVendors,
  productType,
  units,
  vendors,
  widthUnits,
} from "@/features/utils/ListViewMenu";
import FormPageLayout from "@/layout/FormPageLayout";
import { cn } from "@/lib/utils";
import { addInventoryItem } from "@/redux/slices/inventory/inventorySlice";
import { createInventory } from "@/services/inventory/inventoryApi";
import { formatDateOnly } from "@/utils/helpers/helper";
import { validateComplexForm, validateForm } from "@/utils/validation";
import { required } from "@/utils/validation/rules";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronsDown,
  ChevronsRight,
  ImageIcon,
  Info,
  Plus,
  Star,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const ItemsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dataToEdit = location.state;
  const [type, setType] = useState("Goods");
  const [images, setImages] = useState([]);
  const [primaryIndex, setPrimaryIndex] = useState(0);

  const [rows, setRows] = useState([
    { warehouseName: "", openingStock: "", openingStockValue: "" },
  ]);

  // 🔹 Add new row
  const handleAddRow = () => {
    setRows([
      ...rows,
      { warehouseName: "", openingStock: "", openingStockValue: "" },
    ]);
  };

  // 🔹 Remove row
  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // 🔹 Handle input changes per row
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const [isReturnable, setIsReturnable] = useState(true);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("cm");
  const [currency, setCurrency] = useState("kd");

  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [formData, setFormData] = useState({
    name: "",
    type: "goods",
    sku: "",
    unit: "",
    category: "",
    isReturnable: true,
    itemImages: [],

    dimensions: "",
    weight: "",
    manufacturer: "",
    brand: "",
    upc: "",
    mpn: "",
    ean: "",
    isbn: "",
    productType: "",
    backorderQty: "",
    // purchaseCost: "",
    // backOrderDate: null,
    // shipDate: null,
    // fixtureType: "",
    // freightCarrier: "",
    // trackingNo: "",
    binLocation: "",
    // creatorId: "",
    // parentSKU: "",
    // creatorMasterId: "",

    salesInfo: true,
    // salesInformation: {
    sellingPrice: "",
    sellingAccount: "",
    sellingDescription: "",
    taxPreference: "taxable",
    // },
    purchaseInfo: true,
    // purchaseInformation: {
    // purchaseAccount: "",
    // purchaseDescription: "",
    // preferredVendor: "",
    // },

    inventoryAccount: "",
    inventoryValuationMethod: "fifo",
    reorderPoint: "",
    warehouseName: "",
    openingStock: "",
    openingStockValue: "",
  });

  const [dimensions, setDimensions] = useState("");
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openShipDate, setOpenShipDate] = useState(false);
  const [salesInfo, setSalesInfo] = useState(true);
  const [purchaseInfo, setPurchaseInfo] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rowes, setRowes] = useState([{ id: 1, packSize: "", components: "" }]);

  const addRow = () => {
    setRowes((prev) => [
      ...prev,
      { id: Date.now(), packSize: "", components: "" },
    ]);
  };
  const options = [
    { label: "Ditergent-0802", value: "0802" },
    { label: "Ad Mixture-0803", value: "0803" },
    { label: "Oil Field-0804", value: "0804" },
    { label: "Contribution-0805 ", value: "0805" },
    { label: " Contrution-0805 ", value: "00805" },
  ];
  const deleteRow = (id) => {
    setRowes((prev) => prev.filter((row) => row.id !== id));
  };

  const updateRow = (id, field, value) => {
    setRowes((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  useEffect(() => {
    if (dataToEdit) {
      setFormData(dataToEdit); // prefill the form
      console.log(dataToEdit, "datatoedit");
    }
  }, [dataToEdit]);

  useEffect(() => {
    if (length && width && height) {
      setDimensions(`${length} x ${width} x ${height} ${unit}`);
      setFormData((prev) => ({
        ...prev,
        dimensions: `${length} x ${width} x ${height} ${unit}`,
      }));
    }
  }, [length, width, height, unit]);

  useEffect(() => {
    if (weight) {
      setFormData((prev) => ({ ...prev, weight: `${weight} ${weightUnit}` }));
    }
  }, [weight]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      salesInfo: salesInfo,
      purchaseInfo: purchaseInfo,
    }));
  }, [salesInfo, purchaseInfo]);

  useEffect(() => {
    setErrors({});
  }, [formData]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleOption = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const [primaryImage, setPrimaryImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newImages]);

    // ✅ Store only File objects in formData.itemImages
    setFormData((prev) => ({
      ...prev,
      itemImages: [...(prev.itemImages || []), ...files], // not newImages
    }));
  };

  const handleSetPrimary = (id) => {
    setPrimaryImage(id);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const buildFormData = (data, form = new FormData(), parentKey = "") => {
    // ✅ Handle File arrays specifically for itemImages
    if (Array.isArray(data) && parentKey.split(".").pop() === "itemImages") {
      console.log("hi", data);
      data.forEach((file) => {
        if (file instanceof File) {
          form.append("itemImages", file);
        }
      });
      return form;
    }

    // ✅ 2. Handle Date objects
    if (data instanceof Date && parentKey) {
      form.append(parentKey, data.toISOString()); // or .toLocaleDateString() as needed
      return form;
    }

    // ✅ 3. Handle plain objects (recursively)
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof File) &&
      !Array.isArray(data)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(data[key], form, parentKey ? `${parentKey}.${key}` : key);
      });
    }
    // ✅ 4. Handle primitives
    else if (data !== undefined && data !== null && parentKey) {
      form.append(parentKey, data);
    }

    return form;
  };

  const handleSubmit = () => {
    const rules = {
      name: [required("Name is Required")],
      ...(formData.type === "goods" && {
        unit: [required("Unit is Required")],
      }),
      productType: [required("Product Type is Required")],
      ...(formData.salesInfo && {
        sellingPrice: [required("Selling Price is Required")],
        sellingAccount: [required("Sales Info Account is Required")],
        taxPreference: [required("Tax Preference is Required")],
      }),
      ...(formData.purchaseInfo && {
        purchasePrice: [required("Cost Price is Required")],
        purchaseAccount: [required("Purchase Info Account is Required")],
        preferredVendor: [required("Prefered Vendor is Required")],
      }),
      inventoryAccount: [required("Inventory Account is Required")],
      inventoryValuationMethod: [
        required("Inventory Valuation Method is Required"),
      ],
    };

    const validationErrors = validateComplexForm(formData, rules);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      console.log(validationErrors);
      toast.warning(Object.values(validationErrors)[0]);
      return;
    }
    const formDataToSend = buildFormData(formData);

    // console.log("FormData contents:", formDataToSend.itemImages);
    // for (const [key, value] of formDataToSend.entries()) {
    //     console.log(`${key}:`, value);
    // }
    setLoading(true);
    if (dataToEdit) {
    } else {
      createInventory(formDataToSend)
        .then((res) => {
          if (res.data.succes) {
            dispatch(
              addInventoryItem({
                ...formData,
                ROWID: res.data?.inventory?.ROWID,
              })
            );
            toast.success("Inventory Created Successfully!");
          } else {
            toast.warning(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message || err.message || "Error Occured !"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const handleRemove = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (primaryIndex === index) setPrimaryIndex(0);
  };
  return (
    <>
      <FormPageLayout
        title="New Item"
        onCancel={onCancel}
        onSubmit={handleSubmit}
        loading={loading}
        // onSubmit={handleSubmit(onSubmit)}
      >
        {/* --- Lead Details --- */}
        <FormCard title="Details">
          <div className="flex gap-y-6  gap-3">
            <div className="flex flex-col gap-y-6 md:w-1/2">
              <FormField label="Type">
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                  className={"flex"}
                  defaultValue="finishGoods"
                >
                  <div className="flex items-center whitespace-nowrap space-x-2">
                    <RadioGroupItem value="finishGoods" id="finishGoods" />
                    <Label htmlFor="finishGoods">Finished Goods</Label>
                  </div>
                  <div className="flex items-center whitespace-nowrap  space-x-2">
                    <RadioGroupItem value="rawMaterial" id="rawMaterial" />
                    <Label htmlFor="rawMaterial">Raw Material</Label>
                  </div>
                  <div className="flex items-center whitespace-nowrap  space-x-2">
                    <RadioGroupItem value="semiGoods" id="semiGoods" />
                    <Label htmlFor="semiGoods">Semi-Finished Goods</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="services" id="services" />
                    <Label htmlFor="services">Services</Label>
                  </div>
                </RadioGroup>
              </FormField>
              <FormField textRed required={true} label="Name">
                <Input
                  className={`${errors?.name && "border-red-600"}`}
                  value={formData.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Name"
                />
              </FormField>
              <FormField info label="SKU">
                <Input
                  value={formData.sku}
                  name="sku"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter SKU"
                />
              </FormField>
              <FormField label={<span className="text-red-500">Unit</span>}>
                <Select
                  name="unit"
                  value={formData.unit}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "unit", value },
                      preventDefault: () => {},
                    })
                  }
                >
                  <SelectTrigger
                    className={`${errors?.unit && "border-red-600"} w-full`}
                  >
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Category">
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "category", value },
                      preventDefault: () => {},
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              {formData.type == "finishGoods" && (
                <FormField label="Is Returnable">
                  <RadioGroup
                    value={formData.isReturnable ? "yes" : "no"}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        isReturnable: value == "yes" ? true : false,
                      }))
                    }
                    className={"flex"}
                    defaultValue="yes"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No</Label>
                    </div>
                  </RadioGroup>
                </FormField>
              )}
            </div>
            <div className=" md:w-1/2">
              <div className="w-full max-w-md p-4 mx-auto space-y-4">
                {/* Upload box */}
                <div className="border border-dashed border-gray-300 rounded-lg p-7 bg-muted/40 text-center cursor-pointer">
                  <div
                    className="flex flex-col items-center justify-center space-y-3"
                    onClick={handleBrowseClick}
                  >
                    <ImageIcon className="w-10 h-10 text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Drag image(s) here or{" "}
                      <span className="text-blue-600 underline">
                        Browse images
                      </span>
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((img) => (
                        <div
                          key={img.id}
                          className="relative group border rounded-md overflow-hidden"
                        >
                          <button
                            className={cn(
                              "absolute bottom-1 left-1 p-1 rounded-md text-xs bg-white shadow",
                              primaryImage === img.id
                                ? "text-blue-600 font-semibold"
                                : "text-gray-500"
                            )}
                            onClick={() => handleSetPrimary(img.id)}
                          >
                            <Star className="w-3 h-3 inline mr-1" />
                            {primaryImage === img.id
                              ? "Primary"
                              : "Make Primary"}
                          </button>
                          <img
                            src={img.id}
                            alt="preview"
                            className="object-cover w-full h-24"
                          />

                          {/* Remove Button */}
                          <button
                            className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-red-100"
                            onClick={() => handleRemove(img.id)}
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>

                          {/* Primary Button */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preview */}
              </div>
            </div>
          </div>
        </FormCard>
        <FormCard>
          <div className="flex justify-between gap-20 mb-6 w-full">
            <div className="flex flex-col w-[50%]">
              <label className="font-medium">HS Code</label>
              <Input
                type="text"
                onChange={(e) => e.target.value}
                className="mt-2"
                placeholder="Enter HS Code"
              />
            </div>
            <div className=" w-[50%]">
              <label className="font-medium">MSDS </label>
              <div className="flex relative">
                <Input
                  type="url"
                  onChange={(e) => e.target.value}
                  className="mt-2"
                  placeholder="Enter URL  (www.xyz.com) "
                />
                {/* <label htmlFor="files">
                  <div className="w-25 h-9 absolute right-0 cursor-pointer border rounded-md rounded-l-none flex justify-center items-center">
                    {" "}
                    <UploadCloud />
                  </div>
                  <Input type="file" id="files" className={"hidden"} />
                </label> */}
              </div>
            </div>
            {/* ICAO / IATA Code Field */}
            {/* <div className="flex flex-col w-[50%]">
              <label className="font-medium">ICAO Code</label>
              <Input
                type="text"
                onChange={(e) => e.target.value}
                className="mt-2"
                placeholder="Enter ICAO  Code"
              />
            </div> */}
          </div>

          {/* MSDS / PDS / TDS Links Field */}
          {/* <div className="flex justify-between gap-20 mb-6 w-full">
            <div className="flex flex-col w-[50%]">
              <label className="font-medium"> IATA Code</label>
              <Input
                type="text"
                onChange={(e) => e.target.value}
                className="mt-2"
                placeholder="Enter IATA Code"
              />
            </div>
          </div> */}

          {/* Components & Pack Sizes Field */}
          <div className="flex justify-between gap-20 mb-6 w-full">
            <div className=" flex flex-col w-1/2">
              <label className="font-medium">MTC/TDS/COA </label>
              <div className="flex mt-2">
                <label htmlFor="files">
                  <div className="w-100 h-11 border-dashed bg-gray-50 hover:bg-blue-50 cursor-pointer border rounded-md  flex justify-center gap-3 items-center">
                    {" "}
                    <UploadCloud />
                    Upload File
                  </div>
                  <Input type="file" id="files" className={"hidden"} />
                </label>
              </div>
            </div>

            <div className="w-1/2">
              <label className="font-medium ">Business Language</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full flex justify-between items-center"
                  >
                    {selected.length > 0 ? (
                      <div className="flex flex-wrap mt-2 items-start gap-1 cursor-pointer min-h-10 w-full border rounded-md px-2 py-1">
                        {selected.map((val) => {
                          const item = options.find((o) => o.value === val);
                          return (
                            <div >
                              <span
                                key={val}
                                className="flex items-center gap-1 px-2 py-1 rounded-2xl  bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
                              >
                                {item?.label}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOption(val);
                                  }}
                                  className="text-xs text-gray-500 hover:text-red-500"
                                >
                                  ✕
                                </button>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex border p-2 w-[100%] mt-2 rounded-md justify-between items-center flex-wrap gap-1 ">
                        <span className="text-gray-400">
                          Select Storage Condition
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </div>
                    )}
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-56 p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            key={option.value}
                            onSelect={() => toggleOption(option.value)}
                            className="cursor-pointer"
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                selected.includes(option.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* <div className="flex flex-col w-[50%] mb-6">
              <label className="font-medium">Storage Conditions</label>
              <Select>
                <SelectTrigger
                  id="storageConditions"
                  className="w-full border border-gray-300 mt-2 rounded-md p-2"
                >
                  <SelectValue placeholder="Select Storage Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC Storage">AC Storage</SelectItem>
                  <SelectItem value="Normal Room Temp">
                    Normal Room Temp
                  </SelectItem>
                  <SelectItem value="Shaded Area">Shaded Area</SelectItem>
                  <SelectItem value="Ventilated Area">
                    Ventilated Area
                  </SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          {/* Storage Conditions Field */}
          {/* <div className="space-y-4">
            <table className="w-full border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-center border">S.No</th>
                  <th className="p-2 text-left border">Components</th>
                  <th className="p-2 text-left border">Pack Size</th>
                  <th className="p-2 text-center border">Action</th>
                </tr>
              </thead>
              <tbody>
                {rowes.map((row, index) => (
                  <tr key={row.id} className="border-t">
                    <td className="p-2 text-center border w-20">{index + 1}</td>
                    <td className="p-2 border">
                      <Textarea
                        value={row.components}
                        onChange={(e) =>
                          updateRow(row.id, "components", e.target.value)
                        }
                        placeholder="Enter components"
                        rows={2}
                      />
                    </td>
                    <td className="p-2 w-1/4 border">
                      <Select
                        value={row.packSize}
                        onValueChange={(val) =>
                          updateRow(row.id, "packSize", val)
                        }
                      >
                        <SelectTrigger className="w-full border border-gray-300 rounded-md">
                          <SelectValue placeholder="Select Pack Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1L">1L</SelectItem>
                          <SelectItem value="5L">5L</SelectItem>
                          <SelectItem value="10kg">10kg</SelectItem>
                          <SelectItem value="25kg Bag">25kg Bag</SelectItem>
                          <SelectItem value="Drum">Drum</SelectItem>
                          <SelectItem value="Pallet">Pallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRow(row.id)}
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button
              onClick={addRow}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Plus className="w-4 h-4" /> Add Row
            </Button>
          </div> */}
        </FormCard>
        <FormCard title={"Core Details"}>
          <div className="flex w-full my-5 justify-between">
            <FormField label="Dimensions" subLabel="(Length x Width x Height)">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="L"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-16"
                  type="number"
                />
                <span>x</span>
                <Input
                  placeholder="W"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-16"
                  type="number"
                />
                <span>x</span>
                <Input
                  placeholder="H"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-16"
                  type="number"
                />
                <Select value={unit} onValueChange={(value) => setUnit(value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormField>
            <FormField label="Weight">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  type="text"
                />
                <Select
                  value={weightUnit}
                  onValueChange={(value) => setWeightUnit(value)}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Width" />
                  </SelectTrigger>
                  <SelectContent>
                    {widthUnits.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormField>
          </div>
          <div className="flex w-full my-5 justify-between">
            <FormField label="Manufacturer">
              <Select
                name="manufacturer"
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "manufacturer", value },
                    preventDefault: () => {},
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Manufacturer" />
                </SelectTrigger>
                <SelectContent>
                  {lightingVendors.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Brand">
              <Select
                name="brand"
                value={formData.brand}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "brand", value },
                    preventDefault: () => {},
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brand.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <div className="flex w-full my-5 justify-between">
            <FormField label="UPC" info>
              <Input
                value={formData.upc}
                name="upc"
                onChange={(e) => handleChange(e)}
                className="w-[100%]"
                type="text"
                id=""
                placeholder="UPC"
              />
            </FormField>
            {/* <FormField label="MPN" info>
              <Tooltip><TooltipTrigger></TooltipTrigger>
  <TooltipContent>
    <p>Manfacturer Part Number</p>
  </TooltipContent></Tooltip>
              <Input
                value={formData.mpn}
                name="mpn"
                onChange={(e) => handleChange(e)}
                className="w-[100%]"
                type="text"
                id=""
                placeholder="Manufacturer Part Controller"
              />
            </FormField> */}
            <FormField
              label={
                <div className="flex items-center gap-2">
                  <span>MPN</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-gray-500 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Manufacturer Part Number</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              }
            >
              <Input
                value={formData.mpn}
                name="mpn"
                onChange={(e) => handleChange(e)}
                className="w-[100%]"
                type="text"
                placeholder="Manufacturer Part Number"
              />
            </FormField>
          </div>
          <div className="flex w-full my-5 justify-between">
            <FormField label="EAN" info>
              <Input
                value={formData.ean}
                name="ean"
                onChange={(e) => handleChange(e)}
                className="w-[100%]"
                type="text"
                id=""
                placeholder="EAN"
              />
            </FormField>
            <FormField label="ISBN" info>
              <Input
                value={formData.isbn}
                name="isbn"
                onChange={(e) => handleChange(e)}
                className="w-[100%]"
                type="text"
                id=""
                placeholder="ISBN"
              />
            </FormField>
          </div>
          <div className="flex w-full my-5 justify-between"></div>
        </FormCard>

        {/* Sales Information Section - Hide if Raw Material */}
        {formData.type !== "rawMaterial" && (
          <FormCard
            title={"Sales Information"}
            checkBox={true}
            value={salesInfo}
            setValue={setSalesInfo}
          >
            {/* ...Sales Information fields... */}
            <div className="flex w-full my-5 justify-between">
              <FormField
                label="Selling Price"
                required={salesInfo}
                textRed={salesInfo}
              >
                <div className="flex mt-1">
                  <span className="inline-flex items-center  border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
                    <Select
                      value={currency}
                      onValueChange={(value) => setCurrency(value)}
                    >
                      <SelectTrigger className=" border-0 shadow-none focus:ring-0 focus:outline-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem defaultValue value="kd">
                          KD
                        </SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                  <Input
                    value={formData.sellingPrice}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sellingPrice: e.target.value,
                      }))
                    }
                    className={`${
                      errors?.salesInformation?.sellingPrice && "border-red-600"
                    } w-full rounded-l-none h-10 `}
                    type="number"
                    placeholder="0.00"
                  />
                </div>
              </FormField>
              <FormField
                label="Account"
                textRed={salesInfo}
                required={salesInfo}
              >
                <Select
                  name="account"
                  value={formData.sellingAccount}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, sellingAccount: value }))
                  }
                >
                  <SelectTrigger
                    className={`${
                      errors?.salesInformation?.account && "border-red-600"
                    } w-full`}
                  >
                    <SelectValue placeholder="Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {account.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
            <div className="flex w-full my-5 justify-between">
              <FormField label="Description" t>
                <Textarea
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sellingDescription: e.target.value,
                    }))
                  }
                  value={formData.sellingDescription}
                  placeholder="Sales Description"
                  rows={2}
                />
              </FormField>
            </div>
          </FormCard>
        )}

        {/* <FormCard
          title={"Sales Information"}
          checkBox={true}
          value={salesInfo}
          setValue={setSalesInfo}
        >
          <div className="flex w-full my-5 justify-between">
            
            <FormField
              label="Selling Price"
              required={salesInfo}
              textRed={salesInfo}
            >
              <div className="flex mt-1">
                <span className="inline-flex items-center  border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
                  <Select
                    value={currency}
                    onValueChange={(value) => setCurrency(value)}
                  >
                    <SelectTrigger className=" border-0 shadow-none focus:ring-0 focus:outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem defaultValue value="kd">
                        KD
                      </SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </span>
                <Input
                  value={formData.sellingPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sellingPrice: e.target.value,
                    }))
                  }
                  className={`${errors?.salesInformation?.sellingPrice && "border-red-600"
                    } w-full rounded-l-none h-10 `}
                  type="number"
                  placeholder="0.00"
                />
              </div>
             
            </FormField>
            <FormField label="Account" textRed={salesInfo} required={salesInfo}>
              <Select
                name="account"
                value={formData.sellingAccount}
                onValueChange={(value) =>
                
                  setFormData((prev) => ({ ...prev, sellingAccount: value }))
                }
              >
                <SelectTrigger
                  className={`${errors?.salesInformation?.account && "border-red-600"
                    } w-full`}
                >
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent>
                  {account.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <div className="flex w-full my-5 justify-between">
            <FormField label="Description" t>
              <Textarea
                
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sellingDescription: e.target.value,
                  }))
                }
                value={formData.sellingDescription}
                placeholder="Sales Description"
                rows={2}
              />
            </FormField>
          </div>
        </FormCard> */}
        <FormCard
          title={"Purchase Information"}
          checkBox={true}
          value={purchaseInfo}
          setValue={setPurchaseInfo}
        >
          <div className="flex w-full my-5 justify-between">
            <FormField
              label="Cost Price"
              required={purchaseInfo}
              textRed={purchaseInfo}
            >
              <div className="flex mt-1">
                <span className="inline-flex items-center  border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
                  <Select
                    value={currency}
                    onValueChange={(value) => setCurrency(value)}
                  >
                    <SelectTrigger className=" border-0 shadow-none focus:ring-0 focus:outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem defaultValue value="kd">
                        KD
                      </SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </span>
                <Input
                  className="w-full rounded-l-none"
                  type="number"
                  placeholder="0.00"
                  value={formData.purchaseCost}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      purchaseCost: e.target.value,
                    }))
                  }
                />
              </div>
              {/* <Input value={formData.parentSKU} name="parentSKU" onChange={(e) => handleChange(e)} className="w-[100%]" type="text" id="" placeholder="Parent SKU" /> */}
            </FormField>
            <FormField
              label="Account"
              textRed={purchaseInfo}
              required={purchaseInfo}
            >
              <Select
                name="account"
                value={formData.purchaseAccount}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, purchaseAccount: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent>
                  {account.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <div className="flex w-full my-5 justify-between">
            <FormField label="Description" t>
              <Textarea
                // className="mt-1 block w-full border rounded px-3 py-2"
                placeholder="Sales Description"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    purchaseDescription: e.target.value,
                  }))
                }
                rows={2}
              />
            </FormField>
            <FormField
              label="Prefered Vendor"
              required={purchaseInfo}
              textRed={purchaseInfo}
            >
              <Select
                name="preferedVendor"
                value={formData.preferredVendor}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, preferredVendor: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="preferedVendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </FormCard>

        <FormCard>
          <div className="my-0">
            {/* Account and Valuation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="inventory-account"
                  className="text-red-600 mb-3"
                >
                  Inventory Account*
                </Label>
                <Select
                  name="inventoryAccount"
                  value={formData.inventoryAccount}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "inventoryAccount", value },
                      preventDefault: () => {},
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stock-In-Hand">Stock-In-Hand</SelectItem>
                    <SelectItem value="Inventory Adjustment">
                      Inventory Adjustment
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </FormCard>
        <FormCard className="mt-6 mb-8 py-0">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">Warehouse Details</h3>
            <button
              onClick={handleAddRow}
              type="button"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Plus size={16} /> Add New
            </button>
          </div>

          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs font-semibold">
                <th className="border border-gray-200 px-3 py-2 text-left w-12 whitespace-nowrap">
                  Sr No.
                </th>
                <th className="border border-gray-200 px-3 py-2 text-left whitespace-nowrap">
                  WAREHOUSE NAME
                </th>
                <th className="border border-gray-200 px-3 py-2 text-left whitespace-nowrap">
                  OPENING STOCK{" "}
                  <span className="text-blue-600 cursor-pointer">
                    COPY TO ALL
                  </span>
                </th>
                <th className="border border-gray-200 px-3 py-2 text-left whitespace-nowrap">
                  OPENING STOCK VALUE PER UNIT{" "}
                  <span className="text-blue-600 cursor-pointer">
                    COPY TO ALL
                  </span>
                </th>
                <th className="border border-gray-200 px-3 py-2 text-left w-20 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {/* Sr No. */}
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    {index + 1}
                  </td>

                  {/* Warehouse Name */}
                  <td className="border border-gray-200 px-3 py-2">
                    <Select
                      value={row.warehouseName}
                      onValueChange={(value) =>
                        handleChange(index, "warehouseName", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Warehouse Name..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ion-lighting-stock">
                          Warehouse 1
                        </SelectItem>
                        <SelectItem value="secondary">Warehouse 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Opening Stock */}
                  <td className="border border-gray-200 px-3 py-2">
                    <Input
                      type="number"
                      value={row.openingStock}
                      onChange={(e) =>
                        handleChange(index, "openingStock", e.target.value)
                      }
                    />
                  </td>

                  {/* Opening Stock Value */}
                  <td className="border border-gray-200 px-3 py-2">
                    <Input
                      type="number"
                      value={row.openingStockValue}
                      onChange={(e) =>
                        handleChange(index, "openingStockValue", e.target.value)
                      }
                    />
                  </td>

                  {/* Action */}
                  <td className="border border-gray-200 px-3 py-2 text-center">
                    <Trash2
                      size={16}
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleRemoveRow(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FormCard>
        {/* d */}
      </FormPageLayout>
    </>
  );
};

export default ItemsForm;
