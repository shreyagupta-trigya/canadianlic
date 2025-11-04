import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([""]);
  return (
    <>
       <div className="w-full flex items-center justify-between px-6 py-4 border-b">
         <h1 className="sm:text-md md:text-2xl font-semibold">New Category</h1>
     
         <div className="flex gap-4">
             <Button
                 type="button"
                 variant="outline"
                 onClick={() => navigate(-1)}
             >
                 Back
             </Button>
             
             <Button 
                 type="submit" 
                 variant="primary"
             >
                 Submit
             </Button>
         </div>
     </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-10">
        <div className ="col-span-1 space-y-3">
        <Label>Category Name</Label>
        <Input
          value={formData}
          onChange={(e) => {
            setFormData(e.target.value);
          }}
          placeholder="Enter Category Name"
          className="w-full text-sm sm:text-base"
        />
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
