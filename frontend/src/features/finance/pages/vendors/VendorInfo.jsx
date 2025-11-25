// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// const VendorInfo = ({ vendorInfo, owners, contacts, onNext }) => {
//   const [formData, setFormData] = useState({ ...vendorInfo });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     setFormData({ ...vendorInfo });
//   }, [vendorInfo]);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.vendorName || formData.vendorName.trim() === "") {
//       newErrors.vendorName = "Vendor Name is required";
//     }
//     if (!formData.exchangeRate) {
//       newErrors.exchangeRate = "Exchange Rate is required";
//     }
//     if (!formData.currency || formData.currency.trim() === "") {
//       newErrors.currency = "Currency is required";
//     }
//     // Additional validation can be added here
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validate()) {
//       onNext(formData);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <h5 className="text-lg font-semibold">Vendor Information</h5>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div>
//           <label className="block mb-1">
//             Vendor Name <span className="text-red-500">*</span>
//           </label>
//           <Input
//             type="text"
//             value={formData.vendorName || ""}
//             onChange={(e) => handleChange("vendorName", e.target.value)}
//             className={errors.vendorName ? "border-red-500" : ""}
//             required
//           />
//           {errors.vendorName && (
//             <p className="text-xs text-red-500">{errors.vendorName}</p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Vendor Type</label>
//           <Input
//             type="text"
//             value={formData.vendorType || ""}
//             onChange={(e) => handleChange("vendorType", e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Email</label>
//           <Input
//             type="email"
//             value={formData.email || ""}
//             onChange={(e) => handleChange("email", e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Phone</label>
//           <Input
//             type="tel"
//             value={formData.phone || ""}
//             onChange={(e) => handleChange("phone", e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Fax</label>
//           <Input
//             type="text"
//             value={formData.fax || ""}
//             onChange={(e) => handleChange("fax", e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Website</label>
//           <Input
//             type="text"
//             value={formData.website || ""}
//             onChange={(e) => handleChange("website", e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Vendor Owner</label>
//           <Select
//             value={formData.vendorOwner || ""}
//             onValueChange={(value) => handleChange("vendorOwner", value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select vendor owner" />
//             </SelectTrigger>
//             <SelectContent>
//               {owners.map((owner) => (
//                 <SelectItem key={owner.ROWID} value={owner.ROWID}>
//                   {owner.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <label className="block mb-1">Referred By - Client</label>
//           <Select
//             value={formData.referredBy || ""}
//             onValueChange={(value) => handleChange("referredBy", value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select referring client" />
//             </SelectTrigger>
//             <SelectContent>
//               {contacts.map((contact) => (
//                 <SelectItem key={contact.ROWID} value={contact.ROWID}>
//                   {contact.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <label className="block mb-1">
//             Exchange Rate <span className="text-red-500">*</span>
//           </label>
//           <Input
//             type="number"
//             value={formData.exchangeRate || ""}
//             onChange={(e) => handleChange("exchangeRate", e.target.value)}
//             className={errors.exchangeRate ? "border-red-500" : ""}
//             required
//           />
//           {errors.exchangeRate && (
//             <p className="text-xs text-red-500">{errors.exchangeRate}</p>
//           )}
//         </div>
//         <div>
//           <label className="block mb-1">Contact</label>
//           <Select
//             value={formData.contact || ""}
//             onValueChange={(value) => handleChange("contact", value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select contact" />
//             </SelectTrigger>
//             <SelectContent>
//               {contacts.map((contact) => (
//                 <SelectItem key={contact.ROWID} value={contact.ROWID}>
//                   {contact.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <label className="block mb-1">
//             Currency <span className="text-red-500">*</span>
//           </label>
//           <Input
//             type="text"
//             value={formData.currency || ""}
//             onChange={(e) => handleChange("currency", e.target.value)}
//             className={errors.currency ? "border-red-500" : ""}
//             required
//           />
//           {errors.currency && (
//             <p className="text-xs text-red-500">{errors.currency}</p>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-center mt-4 gap-4">
//         <Button onClick={handleNext} className="bg-gray-800 text-white">
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VendorInfo;

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const VendorInfo = ({
  vendorInfo = {},        // Default empty object if undefined
  owners = [],            // Default to empty array if undefined
  contacts = [],          // Default to empty array if undefined
  onNext,
}) => {
  const [formData, setFormData] = useState({ ...vendorInfo });
  const [errors, setErrors] = useState({});

useEffect(() => {
  // Only update formData if vendorInfo has actually changed fields
  setFormData((prev) => {
    if (JSON.stringify(prev) !== JSON.stringify(vendorInfo)) {
      return { ...vendorInfo };
    }
    return prev;
  });
}, [vendorInfo]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.vendorName || formData.vendorName.trim() === "") {
      newErrors.vendorName = "Vendor Name is required";
    }
    if (!formData.exchangeRate) {
      newErrors.exchangeRate = "Exchange Rate is required";
    }
    if (!formData.currency || formData.currency.trim() === "") {
      newErrors.currency = "Currency is required";
    }
    // Additional validation as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h5 className="text-lg font-semibold">Vendor Information</h5>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">
            Vendor Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.vendorName || ""}
            onChange={(e) => handleChange("vendorName", e.target.value)}
            className={errors.vendorName ? "border-red-500" : ""}
            required
          />
          {errors.vendorName && (
            <p className="text-xs text-red-500">{errors.vendorName}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Vendor Type</label>
          <Input
            type="text"
            value={formData.vendorType || ""}
            onChange={(e) => handleChange("vendorType", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <Input
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <Input
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Fax</label>
          <Input
            type="text"
            value={formData.fax || ""}
            onChange={(e) => handleChange("fax", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Website</label>
          <Input
            type="text"
            value={formData.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Vendor Owner</label>
          <Select
            value={formData.vendorOwner || ""}
            onValueChange={(value) => handleChange("vendorOwner", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select vendor owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.map((owner) => (
                <SelectItem key={owner.ROWID} value={owner.ROWID}>
                  {owner.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1">Referred By - Client</label>
          <Select
            value={formData.referredBy || ""}
            onValueChange={(value) => handleChange("referredBy", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select referring client" />
            </SelectTrigger>
            <SelectContent>
              {contacts.map((contact) => (
                <SelectItem key={contact.ROWID} value={contact.ROWID}>
                  {contact.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1">
            Exchange Rate <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            value={formData.exchangeRate || ""}
            onChange={(e) => handleChange("exchangeRate", e.target.value)}
            className={errors.exchangeRate ? "border-red-500" : ""}
            required
          />
          {errors.exchangeRate && (
            <p className="text-xs text-red-500">{errors.exchangeRate}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Contact</label>
          <Select
            value={formData.contact || ""}
            onValueChange={(value) => handleChange("contact", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select contact" />
            </SelectTrigger>
            <SelectContent>
              {contacts.map((contact) => (
                <SelectItem key={contact.ROWID} value={contact.ROWID}>
                  {contact.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1">
            Currency <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.currency || ""}
            onChange={(e) => handleChange("currency", e.target.value)}
            className={errors.currency ? "border-red-500" : ""}
            required
          />
          {errors.currency && (
            <p className="text-xs text-red-500">{errors.currency}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <Button onClick={handleNext} className="bg-gray-800 text-white">
          Next
        </Button>
      </div>
    </div>
  );
};

export default VendorInfo;

