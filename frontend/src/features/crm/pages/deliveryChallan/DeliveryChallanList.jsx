import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  IconChevronDown,
  IconDotsVertical,
  IconLayoutColumns,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import dataSample from "./sample/data.json";
import { useNavigate } from "react-router-dom";
import { TableDataDeleteAlert } from "@/components/custom/TableDataDeleteAlert";


function DeliveryChallanList() {

  const [query, setQuery] = useState("");
  const [data, setData] = useState(dataSample);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    location: true,
    dc: true,
    ref: true,
    customer: true,
    status: true,
    invoiceStatus: true,
    amount: true,
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
  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((r) =>
      [r.date, r.location, r.dc, r.ref, r.customer, r.status, r.invoiceStatus]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, data]);

  // const handleDelete = (id) => {
  //   setData((prev) => prev.filter((r) => r.id !== id));
  // };

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };
const allVisibleIds = filtered
  .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
  .map((r) => r.id);

const allSelected = allVisibleIds.every((id) => selectedIds.has(id));
const someSelected = allVisibleIds.some((id) => selectedIds.has(id));

  return (
    <>
    <div className="p-4">
      <div className="flex items-center justify-end mb-4 gap-2">
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
              checked={visibleColumns.date}
              onCheckedChange={() => toggleColumn("date")}
            >
              Date
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.location}
              onCheckedChange={() => toggleColumn("location")}
            >
              Location
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.dc}
              onCheckedChange={() => toggleColumn("dc")}
            >
              Delivery Tasks
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.ref}
              onCheckedChange={() => toggleColumn("ref")}
            >
              Reference#
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.customer}
              onCheckedChange={() => toggleColumn("customer")}
            >
              Customer Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.status}
              onCheckedChange={() => toggleColumn("status")}
            >
              Status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.invoiceStatus}
              onCheckedChange={() => toggleColumn("invoiceStatus")}
            >
              Invoice Status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.amount}
              onCheckedChange={() => toggleColumn("amount")}
            >
              Amount
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/crm/deliveryChallan/create")}>
          <IconPlus />
          <span className="hidden lg:inline">Create Delivery Tasks</span>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
            <TableHead>
  <Checkbox
    checked={allSelected}
    indeterminate={!allSelected && someSelected}
    onCheckedChange={(val) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (val) {
          allVisibleIds.forEach((id) => next.add(id));
        } else {
          allVisibleIds.forEach((id) => next.delete(id));
        }
        return next;
      });
    }}
  />
</TableHead>

              {visibleColumns.date && <TableHead>Date</TableHead>}
              {visibleColumns.location && <TableHead>Location</TableHead>}
              {visibleColumns.dc && <TableHead>Delivery Tasks</TableHead>}
              {visibleColumns.ref && <TableHead>Reference#</TableHead>}
              {visibleColumns.customer && <TableHead>Customer Name</TableHead>}
              {visibleColumns.status && <TableHead>Status</TableHead>}
              {visibleColumns.invoiceStatus && <TableHead>Invoice Status</TableHead>}
              {visibleColumns.amount && <TableHead className="text-right">Amount</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {(() => {
              const total = filtered.length;
              const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
              const currentPage = Math.min(page, totalPages);
              const start = (currentPage - 1) * rowsPerPage;
              const paginated = filtered.slice(start, start + rowsPerPage);

              return paginated.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="p-2">
                          <IconDotsVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=>navigate("/crm/deliveryChallan/create")}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => navigate("/crm/deliveryChallan/detail")}
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
                      checked={selectedIds.has(row.id)}
                      onCheckedChange={(val) => {
                        setSelectedIds((prev) => {
                          const next = new Set(prev);
                          if (val) next.add(row.id);
                          else next.delete(row.id);
                          return next;
                        });
                      }}
                    />
                  </TableCell>

                  {visibleColumns.date && (
                    <TableCell
                      onClick={() => navigate("/crm/deliveryChallan/detail")}
                      className="text-blue-500 cursor-pointer whitespace-nowrap"
                    >
                      {row.date}
                    </TableCell>
                  )}
                  {visibleColumns.location && <TableCell>{row.location}</TableCell>}
                  {visibleColumns.dc && <TableCell>{row.dc}</TableCell>}
                  {visibleColumns.ref && <TableCell>{row.ref}</TableCell>}
                  {visibleColumns.customer && <TableCell>{row.customer}</TableCell>}

                  {visibleColumns.status && (
                    <TableCell>
                      <Badge
                        className={`px-2 py-1 text-xs font-medium rounded-sm border ${
                          row.status === "Delivered"
                            ? "border-green-500 bg-green-50 text-green-700"
                            : row.status === "Pending"
                            ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                            : row.status === "Cancelled"
                            ? "border-red-500 bg-red-50 text-red-700"
                            : row.status === "Processing"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 bg-gray-50 text-gray-700"
                        }`}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                  )}

                  {visibleColumns.invoiceStatus && (
                    <TableCell>
                      <Badge
                        className={`px-2 py-1 text-xs font-medium rounded-sm border ${
                          row.invoiceStatus === "Invoiced"
                            ? "border-green-500 bg-green-50 text-green-700"
                            : row.invoiceStatus === "Pending"
                            ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                            : row.invoiceStatus === "Overdue"
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-300 bg-gray-50 text-gray-700"
                        }`}
                      >
                        {row.invoiceStatus}
                      </Badge>
                    </TableCell>
                  )}

                  {visibleColumns.amount && (
                    <TableCell className="text-right">
                      {row.amount.toFixed(2)}
                    </TableCell>
                  )}
                </TableRow>
              ));
            })()}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-3 px-2">
        <div className="text-sm text-muted-foreground">
          {selectedIds.size} of {data.length} row(s) selected.
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Rows per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <IconChevronLeft />
            </Button>
            <div className="text-sm">
              Page {page} of {Math.max(1, Math.ceil(filtered.length / rowsPerPage))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil(filtered.length / rowsPerPage)}
            >
              <IconChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
     <TableDataDeleteAlert loading={deleteLoading} handleDelete={handleDelete} open={openAlert} setOpen={setOpenAlert} />
     </>
  );
}

export default DeliveryChallanList;
