// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { ChevronDown } from "lucide-react";
// import data from "./sample/data.json";
// import { useNavigate } from "react-router-dom";

// const ListView = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl ml-2 font-semibold">Active Vendors</h2>
//         <Button
//           variant="default"
//           onClick={() => navigate("/finance/vendors/create")}
//         >
//           + New
//         </Button>
//       </div>

//       <div className="border ">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-muted">
//               <TableHead>
//                 <Checkbox />
//               </TableHead>
//               <TableHead className="text-xs p-3 font-medium uppercase">
//                 Name
//               </TableHead>
//               <TableHead className="text-xs p-2 font-medium uppercase">
//                 Vendor Number
//               </TableHead>
//               <TableHead className="text-xs p-2 font-medium uppercase">
//                 Company Name
//               </TableHead>
//               <TableHead className="text-xs p-5 font-medium uppercase">
//                 Email
//               </TableHead>
//               <TableHead className="text-xs p-5 font-medium uppercase">
//                 Work Phone
//               </TableHead>
//               <TableHead className="text-xs p-5 font-medium uppercase">
//                 Payables
//               </TableHead>
//               <TableHead className="text-xs p-5 font-medium uppercase">
//                 Unused Credits
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {data.map((vendor, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   <Checkbox />
//                 </TableCell>
//                 <TableCell className="text-sm text-blue-600 hover:underline cursor-pointer">
//                   {vendor.name}
//                 </TableCell>
//                 <TableCell className="text-sm p-5">
//                   {vendor.vendorNumber}
//                 </TableCell>
//                 <TableCell className="text-sm p-5">
//                   {vendor.companyName}
//                 </TableCell>
//                 <TableCell className="text-sm p-5">{vendor.email}</TableCell>
//                 <TableCell className="text-sm p-5">{vendor.phone}</TableCell>
//                 <TableCell className="text-sm p-5">{vendor.payables}</TableCell>
//                 <TableCell className="text-sm p-5">{vendor.credits}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default ListView;
