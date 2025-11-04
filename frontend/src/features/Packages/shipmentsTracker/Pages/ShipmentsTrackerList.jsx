import React, { useMemo, useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import data from "../Sample/data.json"
import { MoreHorizontal, Eye, ChevronDown, Search, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function ShipmentsTrackerList() {
  const [sortKey, setSortKey] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")

  const navigate = useNavigate()
  const sortedData = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      if (typeof valA === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA)
      } else {
        return sortDirection === "asc" ? valA - valB : valB - valA
      }
    })
  }, [sortKey, sortDirection])

  const renderHeaderMenu = (label, key) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between text-sm font-medium">
          {label}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem >Search </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortKey(key); setSortDirection("asc") }}>
          Sort by Ascending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setSortKey(key); setSortDirection("desc") }}>
          Sort by Descending
        </DropdownMenuItem>
        <DropdownMenuItem > Group by Ascending</DropdownMenuItem>
        <DropdownMenuItem > Group by Descending</DropdownMenuItem>
        <DropdownMenuItem >Hide Column</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  const actions = (label, key) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between text-sm font-medium">
          {label}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-45"} align="start">
        <DropdownMenuItem >Search </DropdownMenuItem>
        <DropdownMenuItem >Hide Column</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <>
      <div className="flex items-center justify-between border-b bg-white px-4 py-2">
        {/* Left Section: Title and Actions */}
        <div className="flex items-center gap-4 ">
          <h2 className="text-xl mb-2 text-black">
            Shipment Tracker<span className="text-red-500 ml-0.5">*</span>
          </h2>
          <div className="flex items-center border  rounded overflow-hidden">
            <Button variant="outline" size="xl" className="rounded-none border-r p-2 ">
              Save Changes
            </Button>
            <Button variant="outline" size="xl" className="rounded-none p-2">
              Remove Changes
            </Button>
          </div>
        </div>

      {/* Right Section: Search + Add + More */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Search className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => navigate("/shipment-tracker/shipment-tracker-form")}
         size="icon" className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white">
          <Plus
        
           className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
    <Table>
      <TableHeader>
        <TableRow className={"border"}>
          <TableHead className=" w-10 border-r p-1">
            <Eye />
          </TableHead>
          <TableHead className=" border-r p-1 ">
            <Checkbox className={"m-2"} />
          </TableHead>
          <TableHead  className="w-24 border-r p-2  ">Send Mail</TableHead>
          <TableHead className="w-24 border-r p-1">{renderHeaderMenu("ION SO", "ionSo")}</TableHead>
          <TableHead className="w-24 border-r p-1">{renderHeaderMenu("Job Name", "jobName")}</TableHead>
          <TableHead className="w-24 border-r p-1">{renderHeaderMenu("Deal Name", "dealName")}</TableHead>
          <TableHead className="w-24 border-r p-1">{renderHeaderMenu("Customer", "customerStatus")}</TableHead>
          <TableHead className="text-right border-r p-1">
            {renderHeaderMenu("PO Amount", "poAmount")}
          </TableHead>
          <TableHead className="text-right border-r p-1">
            {renderHeaderMenu("Invoiced Amount", "invoicedAmount")}
          </TableHead>
          <TableHead className="text-right border-r p-1">
            {renderHeaderMenu("Balance Open", "balanceOpen")}
          </TableHead>
          <TableHead className="text-right border-r p-1">
            {renderHeaderMenu("Id", "id")}
          </TableHead>
          <TableHead className="text-right border-r p-1">
            {actions("Actions", "actions")}
          </TableHead>


        </TableRow>
      </TableHeader>
      <TableBody className={"border "}>
        {sortedData.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="border-r p-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell className="  border-r p-1">
              <Checkbox className={"m-2"} />
            </TableCell>
            <TableCell className="border-r  p-2">
              <Button className="cursor-pointer" onClick={()=>navigate("/shipment-tracker/shipment-tracker-mail")} variant="outline" size="sm">
                Send Mail
              </Button>
            </TableCell>
            <TableCell onClick={()=>navigate("/shipment-tracker/shipment-tracker-detail")} className="border-r p-2">{row.ionSo}</TableCell>
            <TableCell onClick={()=>navigate("/shipment-tracker/shipment-tracker-detail")} className="border-r p-2">{row.jobName}</TableCell>
            <TableCell onClick={()=>navigate("/shipment-tracker/shipment-tracker-detail")} className="text-blue-600 hover:underline cursor-pointer border-r p-2">
              {row.dealName || "-"}
            </TableCell>
            <TableCell onClick={()=>navigate("/shipment-tracker/shipment-tracker-detail")} className="border-r p-2">{row.customerStatus}</TableCell>
            <TableCell onClick={()=>navigate("/shipment-tracker/shipment-tracker-detail")} className="text-right border-r p-2">
              ${row.poAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </TableCell>
            <TableCell onClick={()=>navigate("/shipment-tracker/shipment-tracker-detail")} className="text-right border-r p-2">
              ${row.invoicedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </TableCell>
            <TableCell onClick={()=>navigate("/shipment-tracker/shipment-tracker-detail")} className="text-right border-r p-2">
              ${row.invoicedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </TableCell>
            <TableCell onClick={()=>navigate("/shipment-tracker/shipment-tracker-detail")} className="border-r p-2 text-center">{row.id}</TableCell>
            <TableCell className="border-r p-2 text-center"><div className="flex gap-2">
              <Button variant="outline" size="sm">Print PDF</Button>
              <Button variant="outline" size="sm">Send Mail</Button>
            </div>
            </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}