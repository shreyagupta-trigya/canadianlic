import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import KanbanView from "../../../components/KanbanView";
import PackageCard from "../PackageCard/PackageCard";
import { RiKanbanView2 } from "react-icons/ri";
import { List } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPackages } from "@/redux/slices/sales/PackageSlice";
import { useDispatch,useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import TableSkeleton from "@/components/custom/TableSkeleton";

const columns = [
  {
    id: "not_shipped",
    label: "Packages, Not Shipped",
    color: "bg-blue-100",
  },
  {
    id: "shipped",
    label: "Shipped Packages",
    color: "bg-yellow-100",
  },
  {
    id: "delivered",
    label: "Delivered Packages",
    color: "bg-green-100",
  },
];

const PackageView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: packageData, loading, error, fetched } = useSelector((state) => state.packages.all) ;
  console.log("package data",packageData);
  const [view, setview] = useState(true);

      useEffect(() => {
          if (!fetched) {
              dispatch(fetchPackages());
          }
      }, [fetched, dispatch]);
  

if(loading){
  return <TableSkeleton/>
}


  return (
    <div className="px-6 py-2 bg-background min-h-screen text-foreground">
      {/* Header with title and button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Packages</h1>
        <div className=" rounded flex gap-10">
          <div>
            <Button
              variant="outline"
              className={"rounded-none border-r-0"}
              size="sm"
              onClick={() => setview(true)}
              // setview={true}
            >
              <List />
            </Button>
            <Button
              variant="outline"
              className={"rounded-none border-l-0"}
              size="sm"
              onClick={() => setview(false)}
            >
              <RiKanbanView2 />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/packages/create")}
          >
            <IconPlus className="mr-2" />
            <span className="hidden lg:inline">New</span>
          </Button>
        </div>
      </div>
      {view && (
        <div className="">
          <div className="border ">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-xs p-3 font-medium uppercase">
                    PACKAGE DATE
                  </TableHead>
                  <TableHead className="text-xs p-2 pl-5 font-medium uppercase">
                    PACKAGE#
                  </TableHead>
                  <TableHead className="text-xs p-2 font-medium uppercase">
                    CARRIER
                  </TableHead>
                  <TableHead className="text-xs p-5 font-medium uppercase">
                    TRACKING#
                  </TableHead>
                  <TableHead className="text-xs p-5 font-medium uppercase">
                    SALES ORDER
                  </TableHead>
                  <TableHead className="text-xs p-5 font-medium uppercase">
                    STATUS
                  </TableHead>
                  <TableHead className="text-xs p-5 font-medium uppercase">
                    SHIPMENT DATE
                  </TableHead>
                  <TableHead className="text-xs p-5 font-medium uppercase">
                    CUSTOMER NAME
                  </TableHead>
                  <TableHead className="text-xs p-5 font-medium uppercase">
                    QUANTITY
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
{packageData.flatMap((pkg) =>
  pkg.items.map((item, index) => (
    <TableRow key={item.ROWID || index}>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="text-sm">{pkg.packageDate}</TableCell>
      <TableCell
        onClick={() => navigate(`/packages/package-detail/${item.ROWID}`)}
        className="text-sm p-5 text-blue-600 hover:underline cursor-pointer"
      >
        {item.packageId}
      </TableCell>
      <TableCell className="text-sm p-5">
        {pkg.companyName || "-"}
      </TableCell>
      <TableCell className="text-sm p-5">
        {pkg.email || "-"}
      </TableCell>
      <TableCell className="text-sm p-5">
        {pkg.salesOrder}
      </TableCell>
      <TableCell className="text-sm p-5">
        {pkg.status || "-"}
      </TableCell>
      <TableCell className="text-sm p-5">
        {pkg.shipmentDate || "-"}
      </TableCell>
      <TableCell className="text-sm p-5">
        {pkg.customerName}
      </TableCell>
      <TableCell className="text-sm p-5">
        {item.quantityToPack}
      </TableCell>
    </TableRow>
  ))
)}


              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {!view && (
        <div>
          {/* Kanban Board */}
          <KanbanView
            data={packageData}
            columns={columns}
            renderCard={({
              item,
              selected,
              onSelect,
              dragListeners,
              dragAttributes,
            }) => (
              <PackageCard
                item={item}
                selected={selected}
                onSelect={onSelect}
                dragListeners={dragListeners}
                dragAttributes={dragAttributes}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PackageView;
