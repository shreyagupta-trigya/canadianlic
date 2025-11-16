import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchOfferings,
  deleteOfferingFromList,
} from "@/redux/slices/offerings/offeringsSlice";
import { deleteOffering } from "@/services/crm/offeringApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import Swal from "sweetalert2";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  RotateCcw,
  Download,
  Upload,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const OfferingListView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: offerings, loading, error, fetched } = useSelector(
    (state) => state.offerings.all
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [showSearchDetail, setShowSearchDetail] = useState(false);
  const [searchForm, setSearchForm] = useState({
    name: "",
    offeringActive: "",
    offeringCategory: "",
    offeringType: "",
    insurancePartnerName: "",
  });
  const [operationForm, setOperationForm] = useState({
    name: "",
    offeringActive: "",
    offeringCategory: "",
    offeringType: "",
    insurancePartnerName: "",
  });
  const [fieldChecks, setFieldChecks] = useState({
    name: false,
    offeringActive: false,
    offeringCategory: false,
    offeringType: false,
    insurancePartnerName: false,
  });
  const [inputVisibility, setInputVisibility] = useState({});
  const [betweenFields, setBetweenFields] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const allFields = [
    { label: "Offering Name", model: "name", placeholder: "Offering Name", type: "text" },
    { label: "Offering Active", model: "offeringActive", placeholder: "Offering Active", type: "text" },
    { label: "Offering Category", model: "offeringCategory", placeholder: "Offering Category", type: "text" },
    { label: "Offering Type", model: "offeringType", placeholder: "Offering Type", type: "text" },
    { label: "Insurance Partner Name", model: "insurancePartnerName", placeholder: "Insurance Partner Name", type: "text" },
  ];

  const stringComponent = [
    { value: "is", label: "Is" },
    { value: "is_not", label: "Is Not" },
    { value: "contains", label: "Contains" },
    { value: "does_not_contain", label: "Does Not Contain" },
    { value: "starts_with", label: "Starts With" },
    { value: "ends_with", label: "Ends With" },
  ];

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchOfferings());
    }
  }, [fetched, dispatch]);

  useEffect(() => {
    setTotalItems(offerings.length);
  }, [offerings]);

  const paginatedUsers = offerings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(offerings.length / itemsPerPage);

  const getOperationOptions = (field) => {
    if (["text", "email", "picklist", "array"].includes(field.type)) {
      return stringComponent;
    }
    return stringComponent;
  };

  const handleFieldCheckChange = (model, checked) => {
    setFieldChecks((prev) => ({ ...prev, [model]: checked }));
    if (checked) {
      const operations = getOperationOptions({ type: "text" });
      setOperationForm((prev) => ({ ...prev, [model]: operations[0]?.value || "" }));
    } else {
      setOperationForm((prev) => ({ ...prev, [model]: "" }));
      setSearchForm((prev) => ({ ...prev, [model]: "" }));
    }
  };

  const handleOperationChange = (fieldName, operation) => {
    setBetweenFields((prev) => ({ ...prev, [fieldName]: false }));
    setInputVisibility((prev) => ({ ...prev, [fieldName]: false }));

    if (operation === "between") {
      setBetweenFields((prev) => ({ ...prev, [fieldName]: true }));
    } else if (operation) {
      setInputVisibility((prev) => ({ ...prev, [fieldName]: true }));
    }
  };

  const searchOffering = async () => {
    // Implement search logic here
    setShowSearchDetail(false);
    toast.info("Search functionality to be implemented");
  };

  const resetFilters = () => {
    setSearchForm({
      name: "",
      offeringActive: "",
      offeringCategory: "",
      offeringType: "",
      insurancePartnerName: "",
    });
    setFieldChecks({
      name: false,
      offeringActive: false,
      offeringCategory: false,
      offeringType: false,
      insurancePartnerName: false,
    });
    setOperationForm({
      name: "",
      offeringActive: "",
      offeringCategory: "",
      offeringType: "",
      insurancePartnerName: "",
    });
    setInputVisibility({});
    setBetweenFields({});
  };

  const resetOffering = () => {
    dispatch(fetchOfferings());
    setCurrentPage(1);
  };

  const confirmDelete = (id) => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   iconColor: "red",
    //   showCancelButton: true,
    //   confirmButtonColor: "#E9C874",
    //   cancelButtonColor: "red",
    //   confirmButtonText: "Yes, delete it!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     deleteProduct(id);
    //   }
    // });
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteOffering(id);
      if (res.success) {
        dispatch(deleteOfferingFromList(id));
        // Swal.fire({
        //   title: "Policy Deleted Successfully",
        //   icon: "success",
        // });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete offering");
    }
  };

  const downloadFile = async () => {
    // Implement download logic here
    toast.info("Download functionality to be implemented");
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const gotoPage = (page) => setCurrentPage(page);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4 p-4 min-h-screen">
      <div className="grid grid-cols-1">
        <div className="border rounded-lg">
          {/* Header Section */}
          <div className="flex justify-end items-center p-4">
            <div className="flex items-center gap-2">
              <Drawer open={showSearchDetail} onOpenChange={setShowSearchDetail}>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Advanced Search</DrawerTitle>
                    <DrawerDescription>
                      Filter offerings by various criteria
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-200px)] p-4">
                    {allFields.map((field) => (
                      <div key={field.model} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={fieldChecks[field.model]}
                            onCheckedChange={(checked) => handleFieldCheckChange(field.model, checked)}
                          />
                          <Label>{field.label}</Label>
                        </div>
                        {fieldChecks[field.model] && (
                          <div className="space-y-2">
                            <Select
                              value={operationForm[field.model]}
                              onValueChange={(value) => handleOperationChange(field.model, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {getOperationOptions(field).map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {betweenFields[field.model] ? (
                              <div className="flex flex-col gap-2">
                                <Input
                                  type="datetime-local"
                                  placeholder="From"
                                  value={searchForm[`${field.model}From`] || ""}
                                  onChange={(e) =>
                                    setSearchForm((prev) => ({ ...prev, [`${field.model}From`]: e.target.value }))
                                  }
                                />
                                <Input
                                  type="datetime-local"
                                  placeholder="To"
                                  value={searchForm[`${field.model}To`] || ""}
                                  onChange={(e) =>
                                    setSearchForm((prev) => ({ ...prev, [`${field.model}To`]: e.target.value }))
                                  }
                                />
                              </div>
                            ) : (
                              inputVisibility[field.model] && (
                                <Input
                                  type={field.type === "date" ? "datetime-local" : "text"}
                                  placeholder={field.placeholder}
                                  value={searchForm[field.model] || ""}
                                  onChange={(e) =>
                                    setSearchForm((prev) => ({ ...prev, [field.model]: e.target.value }))
                                  }
                                />
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <DrawerFooter>
                    <Button onClick={searchOffering}>Search</Button>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Button variant="outline" size="sm" onClick={resetOffering}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={() => navigate("/crm/offerings/create")} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                + New
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    ⋯
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={downloadFile}>
                    <Download className="w-4 h-4 mr-2" />
                    Exports
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Header Section ends */}
          <div className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox />
                    </TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Offering Name</TableHead>
                    <TableHead>Offering Active</TableHead>
                    <TableHead>Offering Category</TableHead>
                    <TableHead>Offering Type</TableHead>
                    <TableHead>Insurance Partner Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((offering, index) => (
                    <TableRow key={offering.ROWID}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/crm/offerings/details/${offering.ROWID}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                ⋯
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => navigate(`/crm/offerings/update/${offering.ROWID}`)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => confirmDelete(offering.ROWID)}
                                className="text-red-500"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                      <TableCell>{offering.offeringName}</TableCell>
                      <TableCell>{offering.offeringActive ? "true" : "false"}</TableCell>
                      <TableCell>{offering.offeringCategory}</TableCell>
                      <TableCell>{offering.offeringType}</TableCell>
                      <TableCell>{offering.insurancePartnerName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center gap-4 p-4">
              <div className="text-sm font-medium">
                Total Offerings: {totalItems}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {totalPages <= 3 ? (
                  pages.map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => gotoPage(page)}
                    >
                      {page}
                    </Button>
                  ))
                ) : (
                  <>
                    {[1, 2, 3].map((index) => (
                      <Button
                        key={index}
                        variant={currentPage === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => gotoPage(index)}
                      >
                        {index}
                      </Button>
                    ))}
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferingListView;
