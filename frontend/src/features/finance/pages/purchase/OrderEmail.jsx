import React, { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { FileText, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.core.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

// Sample contact list
const contacts = [
  { name: "Jon Ream", email: "jon.ream@anixter.com" },
  { name: "Jamie", email: "jamie@ionlighting.com" },
  { name: "Paul", email: "pk@ionlighting.com" },
  { name: "Neyshla Gonzalez", email: "nysa@ionlighting.com" },
];

// Reusable pill input field
function EmailField({ label, selected, onSelect, onRemove }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (person) => {
    if (!selected.some((s) => s.email === person.email)) {
      onSelect(person);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-2">
      <div className="text-muted-foreground w-full sm:w-[80px] py-1 text-sm flex-shrink-0">
        {label}
      </div>
      <div className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              className="flex flex-wrap items-center cursor-pointer min-h-10 w-full border rounded-md px-3 py-2 focus:outline-none"
              onClick={() => setOpen(true)}
            >
              {selected.length === 0 && (
                <span className="text-muted-foreground text-sm">
                  Add {label.toLowerCase()}...
                </span>
              )}
              {selected.map((person) => (
                <Badge
                  key={person.email}
                  className="mr-1 mb-1 px-2 py-1 bg-gray-300 hover:bg-gray-200 text-black flex items-center gap-1 text-xs"
                >
                  <span className="max-w-[120px] sm:max-w-none truncate">
                    {person.name} &lt;{person.email}&gt;
                  </span>
                  <Button
                    className="ml-1 p-0 h-4 w-4 bg-transparent hover:bg-transparent cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(person.email);
                    }}
                  >
                    <X className="h-3 w-3 bg-transparent text-black cursor-pointer hover:text-red-500" />
                  </Button>
                </Badge>
              ))}
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-full sm:w-[400px] lg:w-[600px] xl:w-[800px]">
            <Command>
              <CommandInput placeholder="Search contacts..." />
              <CommandList>
                <CommandGroup heading="Contacts">
                  {contacts.map((person) => (
                    <CommandItem
                      key={person.email}
                      onSelect={() => handleSelect(person)}
                      className="cursor-pointer flex flex-col items-start py-2 px-3"
                    >
                      <span className="text-sm sm:text-base">{person.name}</span>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {person.email}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default function OrderEmail(props) {
  const [toList, setToList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [bccList, setBccList] = useState([]);
  const navigate = useNavigate();
  const [showAttachment, setShowAttachment] = useState(true);
  const SizeStyle = Quill.import("attributors/style/size");
  SizeStyle.whitelist = ["12px", "14px", "16px", "18px", "24px", "32px"];
  Quill.register(SizeStyle, true);
  const [value, setValue] = useState(`
   
Dear THOMAS LUMBER, </br>

The purchase order (PO-25-4673) is attached with this email.</br>

An overview of the purchase order is available below:  </br>

----------------------------------------------------------------------------------------</br>

Purchase Order # : PO-25-4673</br>

----------------------------------------------------------------------------------------</br>
 Order Date      :  21 Jul 2025</br>
 Amount           :   $60.37(in USD)</br>
----------------------------------------------------------------------------------------</br>

Please go through it and confirm the order. We look forward to working with you again</br>


Regards,</br>

jamie</br>
Seven Ocean Distributor</br>



     `);

  // Effect to update state when props change
  useEffect(() => {
    if (props.scopeOfWork?.length > 0) {
      setValue(props.scopeOfWork);
    }
  }, [props.scopeOfWork]);

  // Second effect to log changes (after state updates)
  useEffect(() => {
    console.log("Updated value:", value);
  }, [value]);

  // Handle input changes from ReactQuill
  const handleInputChange = (content) => {
    setValue(content);
    console.log("User changed data:", content);

    // Send update to parent
    if (props.getData) {
      props.getData(content, "scopeOfWork");
    }
  };

  const modules = {
    toolbar: [
      [{ bold: true }, { italic: true }, { underline: true }, { strike: true }],
      [{ size: ["12px", "14px", "16px", "18px", "24px", "32px"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
    ],
  };

  const handleSelect = (setter) => (person) =>
    setter((prev) => [...prev, person]);

  const handleRemove = (setter) => (email) =>
    setter((prev) => prev.filter((p) => p.email !== email));

  return (
    <div className="w-full max-w-4xl border rounded-md p-3 sm:p-4 lg:p-6 shadow-sm text-sm mx-auto">
      {/* Email Header Fields */}
      <div className="space-y-3 sm:space-y-4">
        {/* From Field */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-2">
          <div className="text-muted-foreground w-full sm:w-[80px] py-1 text-sm flex-shrink-0">
            From
          </div>
          <div className="w-full text-sm sm:text-base">
            jamie &lt;jamie@ionlighting.com&gt;
          </div>
        </div>

        {/* Email Fields */}
        <EmailField
          label="Send To"
          selected={toList}
          onSelect={handleSelect(setToList)}
          onRemove={handleRemove(setToList)}
        />
        <EmailField
          label="Cc"
          selected={ccList}
          onSelect={handleSelect(setCcList)}
          onRemove={handleRemove(setCcList)}
        />
        <EmailField
          label="Bcc"
          selected={bccList}
          onSelect={handleSelect(setBccList)}
          onRemove={handleRemove(setBccList)}
        />

        {/* Subject Field */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-2">
          <div className="text-muted-foreground w-full sm:w-[80px] py-1 text-sm flex-shrink-0">
            Subject
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full border outline-none hover:outline-none rounded-md px-3 py-2 text-sm sm:text-base"
              placeholder="Enter subject"
              defaultValue="Purchase Order from seven Ocean Distributor (Purchase Order #: PO-25-4671)"
            />
          </div>
        </div>
      </div>

      {/* Email Editor */}
      <div className="border rounded shadow min-h-100  bg-white dark:bg-background my-4 sm:my-5 sm:ml-0 lg:ml-20 p-2 sm:p-3">
        <ReactQuill
          value={value}
          onChange={handleInputChange}
          modules={modules}
          className="h-79 md:h-82 lg:h-80 dark:bg-background "
          theme="snow"
        />
      </div>

      {/* Attachments Section */}
      <div className="space-y-3 sm:space-y-4">
        {/* PDF Attachment */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-blue-50 dark:bg-background
        border rounded-md gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="attach-po"
              defaultChecked
              onCheckedChange={(checked) => setShowAttachment(Boolean(checked))}
            />
            <Label htmlFor="attach-po" className="text-sm sm:text-base font-medium">
              Attach Purchase Order PDF
            </Label>
          </div>
          {showAttachment && (
            <div className="flex items-center border border-gray-300 bg-white dark:bg-gray-400 dark:text-white px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm text-gray-700 w-full sm:w-auto justify-between sm:justify-start">
              <FileText className="text-red-500 w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">PO-25-4673</span>
            </div>
          )}
        </div>

        {/* File Upload */}
        <div>
          <input id="file-upload" type="file" className="hidden" multiple />
          <label
            htmlFor="file-upload"
            className="border border-dashed border-gray-300 hover:border-blue-400 p-3 rounded-md inline-flex items-center text-blue-600 cursor-pointer text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
          >
            <Paperclip className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Add Attachments</span>
          </label>
        </div>

        {/* Selected Files Preview (if any) */}
        <div className="flex flex-wrap gap-2">
          {/* You can add file preview badges here if needed */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 shadow-t min-h-16 w-full border-t mt-6 sm:mt-8 p-4 sm:p-5">
        <Button className="bg-gray-600 border hover:shadow cursor-pointer text-white w-full sm:w-auto">
          Send Email
        </Button>
        <Button
          onClick={() => navigate(-1)}
          className="bg-white text-black border hover:bg-gray-50 hover:shadow cursor-pointer w-full sm:w-auto"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}