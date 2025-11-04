import * as React from "react";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconPlus,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";

function DragHandle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const AccountContacts = () => {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [visibleColumns, setVisibleColumns] = useState({
    contactName: true,
    accountName: true,
    contactType: true,
    email: true,
    phone: true,
  });
  function handleDelete() {
        if (idToDelete !== "") {
            setDeleteLoading(true);
            deleteAccount(idToDelete).then((res) => {
                if (res.data.success) {
                    dispatch(deleteAccountFromList(idToDelete))
                    toast.success("Account Deleted Successfully")
                }
            }).catch((err) => {
                console.log(err);
                toast.error(err?.response?.data?.message || err.message)
            }).finally(() => {
                setDeleteLoading(false);
                setOpenAlert(false)
            })
        }
    }

  const staticData = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      account: "ABC Company",
      contactType: "Main Contractor",
      email: "john@example.com",
      phone: "+91 9876543210",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      account: "XYZ Ltd",
      contactType: "Sub Contractor",
      email: "jane@example.com",
      phone: "+91 9123456789",
    },
  ];

  const totalPages = Math.ceil(staticData.length / pageSize);
  const paginatedData = staticData.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (<>
    <div className="mx-1 lg:mx-2 flex flex-col justify-start gap-3 md:gap-6">
      {/* 🔹 Top Buttons */}
      <div className="flex justify-end items-center gap-2">
        {/* Customize Columns Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span className="hidden lg:inline ml-1">Customize Columns</span>
              <span className="lg:hidden ml-1">Columns</span>
              <IconChevronDown className="ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={visibleColumns.contactName}
              onCheckedChange={() => toggleColumn("contactName")}
            >
              Contact Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.accountName}
              onCheckedChange={() => toggleColumn("accountName")}
            >
              Account Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.contactType}
              onCheckedChange={() => toggleColumn("contactType")}
            >
              Contact Type
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.email}
              onCheckedChange={() => toggleColumn("email")}
            >
              Email
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.phone}
              onCheckedChange={() => toggleColumn("phone")}
            >
              Phone
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Create Contact Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/crm/contacts/create")}
        >
          <IconPlus />
          <span className="hidden lg:inline">Create Contact</span>
        </Button>
      </div>

      {/* 🔹 Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
             <TableHead>
  <Checkbox
    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
    onCheckedChange={(checked) => {
      if (checked) {
        setSelectedRows(paginatedData.map((item) => item.id));
      } else {
        setSelectedRows([]);
      }
    }}
    aria-label="Select all rows"
  />
</TableHead>

              {visibleColumns.contactName && <TableHead>Contact Name</TableHead>}
              {visibleColumns.accountName && <TableHead>Account Name</TableHead>}
              {visibleColumns.contactType && <TableHead>Contact Type</TableHead>}
              {visibleColumns.email && <TableHead>Email</TableHead>}
              {visibleColumns.phone && <TableHead>Phone</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
           <TableRow
  key={item.id}
  className={selectedRows.includes(item.id) ? "bg-muted/30" : ""}
>

                  <TableCell>
                    <DragHandle />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                          size="icon"
                        >
                          <IconDotsVertical />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate("/crm/contacts/update", { state: item })
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/crm/contacts/details/${item.id}`, {
                              state: item,
                            })
                          }
                        >
                          Detail View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() =>{ setOpenAlert(true);}} variant="destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                <TableCell>
  <Checkbox
    checked={selectedRows.includes(item.id)}
    onCheckedChange={(checked) => {
      if (checked) {
        setSelectedRows((prev) => [...prev, item.id]);
      } else {
        setSelectedRows((prev) => prev.filter((id) => id !== item.id));
      }
    }}
    aria-label="Select row"
  />
</TableCell>


                  {visibleColumns.contactName && (
                    <TableCell>
                      <Button
                        variant="link"
                        className="text-foreground cursor-pointer w-fit px-0 text-left"
                        onClick={() =>
                          navigate(`/crm/contacts/details/${item.id}`, {
                            state: item,
                          })
                        }
                      >
                        {item.firstName} {item.lastName}
                      </Button>
                    </TableCell>
                  )}
                  {visibleColumns.accountName && (
                    <TableCell>{item.account}</TableCell>
                  )}
                  {visibleColumns.contactType && (
                    <TableCell>{item.contactType}</TableCell>
                  )}
                  {visibleColumns.email && <TableCell>{item.email}</TableCell>}
                  {visibleColumns.phone && <TableCell>{item.phone}</TableCell>}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>


      <div className="flex items-center justify-between px-4">
        <div className="hidden lg:flex text-sm text-muted-foreground">
          {paginatedData.length} of {staticData.length} row(s) shown.
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
            <div className="hidden lg:flex items-center gap-2">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPageIndex(0);
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm font-medium">
              Page {pageIndex + 1} of {totalPages}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setPageIndex(0)}
              disabled={pageIndex === 0}
            >
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8"
              onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
              disabled={pageIndex === 0}
            >
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8"
              onClick={() =>
                setPageIndex((p) => Math.min(p + 1, totalPages - 1))
              }
              disabled={pageIndex >= totalPages - 1}
            >
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 lg:flex"
              onClick={() => setPageIndex(totalPages - 1)}
              disabled={pageIndex >= totalPages - 1}
            >
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
     <TableDataDeleteAlert loading={deleteLoading} handleDelete={handleDelete} open={openAlert} setOpen={setOpenAlert} />
    </>
  );
};

export default AccountContacts;
