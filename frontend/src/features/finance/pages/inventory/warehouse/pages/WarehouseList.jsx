// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Settings, Warehouse, Star } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useNavigate } from "react-router-dom";

// function WarehouseList() {
//     const navigate=useNavigate();
//   // Example warehouse data
//   const warehouses = [
//     {
//       id: 1,
//       name: "Ion Lighting Stock Warehouse",
//       address: "11483 Rocket Blvd\n#2A,\nOrlando, Florida\nU.S.A, 32824",
//       primary: true,
//     },
//     {
//       id: 2,
//       name: "West Coast Warehouse",
//       address: "245 Ocean View Rd\nSan Diego, California\nU.S.A, 92101",
//       primary: false,
//     },
//     {
//       id: 3,
//       name: "East Coast Warehouse",
//       address: "99 Atlantic Ave\nNew York, NY\nU.S.A, 10001",
//       primary: false,
//     },
//   ];

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="sticky top-0 z-10 bg-white shadow-sm border-b flex items-center justify-between px-4 py-2">
//         <div className="flex flex-row gap-2">
//           <Warehouse />
//           <h1 className="text-xl font-semibold">Warehouses</h1>
//         </div>
//         <div className="flex flex-row gap-2 items-stretch">
//           <div className="bg-gray-50 rounded-sm px-3 py-2 flex items-center">
//             Set up user-level restrictions on warehouses{" "}
//             <span className="text-blue-600 ml-1 cursor-pointer">
//               Enable Restrictions
//             </span>
//           </div>
//           <Button
//             variant="default"
//             className="bg-orange-400 hover:bg-orange-400 text-white h-auto" onClick={()=>navigate("/finance/inventory/warehouse/create")}
//           >
//             + New Warehouse
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="bg-gray-50 border-2 rounded-md"
//               >
//                 <Settings size={20} className="text-gray-600" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="p-1">
//               <DropdownMenuItem className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2 cursor-pointer">
//                 Disable Multiwarehouse
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
// <ScrollArea className="flex-1 p-4">
//   <div className="flex flex-wrap gap-[20px]">
//     {warehouses.map((wh) => (
//       <Card key={wh.id} className="shadow-md w-[37%]">
//         <CardHeader className="flex flex-row justify-between items-start">
//           <div>
//             <CardTitle className="text-gray-800 mb-2">{wh.name}</CardTitle>
//             {wh.primary && (
//               <span className="inline-flex items-center text-orange-500 text-sm font-medium relative border border-orange-500 px-2 py-1 rounded-tr-md rounded-br-md before:content-[''] before:absolute before:-right-2 before:top-0 before:border-t-[12px] before:border-b-[12px] before:border-l-[12px] before:border-t-transparent before:border-b-transparent before:border-l-orange-500">
//                 <Star size={14} className="mr-1 fill-orange-500" />
//                 Organization's Primary
//               </span>
//             )}
//           </div>
//           <div className="flex flex-row items-center gap-2">
//             <Button
//               size="sm"
//               className="bg-orange-500 hover:bg-orange-600 text-white"
//             >
//               Edit
//             </Button>
//             <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Button
//       variant="outline"
//       size="sm"
//       className="bg-gray-50 border-2 rounded-md flex items-center gap-0"
//     >
//       <Settings size={18} className="text-gray-600" />
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-3 h-3 text-gray-600"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path
//           fillRule="evenodd"
//           d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent align="start" className="p-1">
//     <DropdownMenuItem className="bg-white hover:bg-blue-600 text-black hover:text-white rounded-md px-3 py-2 cursor-pointer mb-2">
//       Mark as Inactive
//     </DropdownMenuItem>
//     <DropdownMenuItem className="bg-white hover:bg-blue-600 text-black hover:text-white rounded-md px-3 py-2 cursor-pointer mb-2">
//       Delete
//     </DropdownMenuItem>
//     <DropdownMenuItem className="bg-white hover:bg-blue-600 text-black hover:text-white rounded-md px-3 py-2 cursor-pointer mb-2">
//       Enable Bin Location
//     </DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-gray-600 whitespace-pre-line ">
//             {wh.address}
//           </p>
//         </CardContent>
//       </Card>
//     ))}
//   </div>
// </ScrollArea>
//     </div>
//   );
// }
// export default WarehouseList;
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, Warehouse, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

function WarehouseList() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // Your delete logic here
    console.log("Item deleted");
    setOpen(false);
  };

  // Example warehouse data
  const warehouses = [
    {
      id: 1,
      name: "CRM  Stock Warehouse",
      address: "13034 Mubarak Al-kabir +965 Kuwait",
      primary: true,
    },
    {
      id: 2,
      name: "Precurement   Warehouse",
      address: "P.O.Box: 24609; 13107 Safat Kuwait City +965 Kuwait",
      primary: false,
    },
    {
      id: 3,
      name: "Sales  Warehouse",
      address: "22074 Al-farwaniya +965 Kuwait",

      primary: false,
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Sticky Header Row */}
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b flex items-center justify-between px-4 py-2">
        <div className="flex flex-row gap-2">
          <Warehouse />
          <h1 className="text-xl font-semibold">Warehouses</h1>
        </div>
        <div className="flex flex-row gap-2 items-stretch">
          {/* Info Box */}
          <div className="bg-gray-50 rounded-sm px-3 py-2 flex items-center">
            Set up user-level restrictions on warehouses{" "}
            <span className="text-blue-600 ml-1 cursor-pointer">
              Enable Restrictions
            </span>
          </div>

          {/* Orange Button */}
          <Button
            variant="default"
            className="bg-orange-400 hover:bg-orange-400 text-white h-auto"
            onClick={() => navigate("/inventory/warehouse/create")}
          >
            + New Warehouse
          </Button>

          {/* Settings Box */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-50 border-2 rounded-md"
              >
                <Settings size={20} className="text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-1">
              <DropdownMenuItem className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2 cursor-pointer">
                Disable Multiwarehouse
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Dialog open={open} onOpenChange={setOpen}>
          
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  this item.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className={"cursor-pointer "} variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {warehouses.map((wh) => (
            <Card key={wh.id} className="shadow-md">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-gray-800 mb-2">
                    {wh.name}
                  </CardTitle>
                  {wh.primary && (
                    <span className="inline-flex items-center text-orange-500 text-sm font-medium relative border border-orange-500 px-2 py-1 rounded-tr-md rounded-br-md before:content-[''] before:absolute before:-right-2 before:top-0 before:border-t-[12px] before:border-b-[12px] before:border-l-[12px] before:border-t-transparent before:border-b-transparent before:border-l-orange-500">
                      <Star size={14} className="mr-1 fill-orange-500" />
                      Organization's Primary
                    </span>
                  )}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                    onClick={() =>
                      navigate("/inventory/warehouse/create")
                    }
                  >
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-50 border-2 rounded-md flex items-center gap-0"
                      >
                        {/* Settings Icon */}
                        <Settings size={18} className="text-gray-600" />

                        {/* Dropdown Arrow */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="p-1">
                       <DropdownMenuItem className="bg-white hover:bg-blue-600 text-black hover:text-white rounded-md px-3 py-2 cursor-pointer mb-2">
                       Mark as Default
                      </DropdownMenuItem>
                      <DropdownMenuItem className="bg-white hover:bg-blue-600 text-black hover:text-white rounded-md px-3 py-2 cursor-pointer mb-2">
                        Mark as Inactive
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setOpen(true)} className="bg-white hover:bg-blue-600 text-black hover:text-white rounded-md px-3 py-2 cursor-pointer mb-2">
                        Delete
                        
                      </DropdownMenuItem>
                     
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 whitespace-pre-line ">
                  {wh.address}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default WarehouseList;
