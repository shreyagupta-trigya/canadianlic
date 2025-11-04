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
import { FileText, Paperclip, X, ChevronDown } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (person) => {
    if (!selected.some((s) => s.email === person.email)) {
      onSelect(person);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-0 lg:gap-4 py-0">
      <div className="text-muted-foreground w-full lg:w-[80px] py-1 text-sm font-medium">
        {label}
      </div>
      <div className="flex-1 min-w-0">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              className="flex flex-wrap items-center cursor-pointer min-h-10 w-full border rounded-md px-3 py-2 focus:outline-none bg-white hover:border-gray-400 transition-colors"
              onClick={() => setOpen(true)}
            >
              {selected.length === 0 ? (
                <span className="text-muted-foreground text-sm">
                  Add {label.toLowerCase()}...
                </span>
              ) : (
                selected.map((person) => (
                  <Badge
                    key={person.email}
                    className="mr-1 mb-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-black flex items-center gap-1 text-xs"
                  >
                    <span className="max-w-[120px] lg:max-w-none truncate">
                      {person.name} &lt;{person.email}&gt;
                    </span>
                    <Button
                      className="ml-1 p-0 h-3 w-3 bg-transparent hover:bg-transparent cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(person.email);
                      }}
                    >
                      <X className="h-2 w-2 text-black cursor-pointer hover:text-red-500" />
                    </Button>
                  </Badge>
                ))
              )}
              <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="p-0 w-[90vw] lg:w-[800px] max-w-full" 
            align={isMobile ? "center" : "start"}
          >
            <Command>
              <CommandInput placeholder="Search contacts..." className="h-12" />
              <CommandList className="max-h-[350px]">
                <CommandGroup heading="Contacts">
                  {contacts.map((person) => (
                    <CommandItem
                      key={person.email}
                      onSelect={() => handleSelect(person)}
                      className="cursor-pointer flex flex-col items-start py-3 px-4 hover:bg-gray-50"
                    >
                      <span className="font-medium">{person.name}</span>
                      <span className="text-muted-foreground text-sm truncate w-full">
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

const SalesOrderEmail = (props) => {
  const [toList, setToList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [bccList, setBccList] = useState([]);
  const [showAttachment, setShowAttachment] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Initialize Quill size styles
  useEffect(() => {
    const SizeStyle = Quill.import("attributors/style/size");
    SizeStyle.whitelist = ["12px", "14px", "16px", "18px", "24px", "32px"];
    Quill.register(SizeStyle, true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [value, setValue] = useState(`
Dear WINTER PARK CONSTRUCTION, <br />

Thanks for your interest in our services. Please find our sales order attached with this mail.<br />

An overview of the sales order is available below for your reference:  <br />

----------------------------------------------------------------------------------------<br />
Sales Order # : SO-22-2037<br />
<br />
----------------------------------------------------------------------------------------<br />
 Order Date      :  27 Jan 2022<br />
 Amount           :   $120,497.58<br />
----------------------------------------------------------------------------------------<br />
<br />
Assuring you of our best services at all times.<br />
<br />
<br />
Regards,<br />
<br />
jamie<br />
Seven Ocean Distributor<br />
  `);

  // Effect to update state when props change
  useEffect(() => {
    if (props.scopeOfWork?.length > 0) {
      setValue(props.scopeOfWork);
    }
  }, [props.scopeOfWork]);

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
    <div className="w-full max-w-4xl border rounded-lg p-4 lg:p-6 bg-white shadow-sm text-sm">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between mb-4 pb-4 border-b lg:hidden">
          <h1 className="text-lg font-semibold">Send Email</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-gray-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Email Fields - Stacked on mobile */}
      <div className="space-y-1 lg:space-y-1">
        {/* From Field */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-0 lg:gap-4 py-0">
          <div className="text-muted-foreground w-full lg:w-[80px] py-1 text-sm font-medium">
            From
          </div>
          <div className="flex-1 text-gray-700">
            jamie &lt;jamie@ionlighting.com&gt;
          </div>
        </div>

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

        <div className="flex flex-col lg:flex-row lg:items-start gap-0 lg:gap-4 py-0">
          <div className="text-muted-foreground w-full lg:w-[80px] py-1 text-sm font-medium">
            Subject
          </div>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              className="w-full border outline-none hover:outline-none rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Enter subject"
              defaultValue="Sales Order from Seven Ocean Distributor (Sales Order #: SO-22-2037)"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg shadow-sm min-h-75 bg-white my-4 lg:my-5 lg:ml-20 p-3 lg:p-4">
        <ReactQuill
          value={value}
          onChange={handleInputChange}
          modules={modules}
          className="h-48 lg:h-60 bg-white"
          theme="snow"
        />
      </div>

      <div className="space-y-1 lg:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:p-2 bg-blue-50 rounded-lg gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="attach-po"
              defaultChecked
              onCheckedChange={(checked) => setShowAttachment(Boolean(checked))}
              className="h-5 w-5"
            />
            <Label htmlFor="attach-po" className="text-sm lg:text-base font-medium cursor-pointer">
              Attach Purchase Order PDF
            </Label>
          </div>
          {showAttachment && (
            <div className="flex items-center border border-gray-300 bg-white px-3 py-2 rounded-md text-sm text-gray-700 min-w-0">
              <FileText className="text-red-500 w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">PO-25-4673</span>
            </div>
          )}
        </div>

        <div>
          <input id="file-upload" type="file" className="hidden" multiple />
          <label
            htmlFor="file-upload"
            className="border border-dashed border-gray-300 p-3 lg:p-2 rounded-lg inline-flex items-center justify-center text-blue-600 cursor-pointer text-sm hover:bg-blue-50 transition-colors w-full lg:w-auto"
          >
            <Paperclip className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Add Attachments</span>
          </label>
        </div>
      </div>

      <div className={`flex flex-col-reverse lg:flex-row gap-3 shadow-t min-h-10 w-full border-t mt-6 lg:mt-5 p-4 lg:px-5 ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-white border-t z-50' : ''}`}>
        {isMobile && <div className="h-16"></div>} {/* Spacer for mobile fixed positioning */}
        <div className={`flex gap-3 w-full ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-white p-4 border-t' : ''}`}>
          <Button 
            className="bg-gray-600 border hover:shadow cursor-pointer flex-1 lg:flex-none text-sm lg:text-base"
            onClick={() => {/* Send email logic */}}
          >
            Send
          </Button>
          <Button 
            onClick={() => navigate(-1)}
            className="bg-white text-black border hover:bg-gray-50 hover:shadow cursor-pointer flex-1 lg:flex-none text-sm lg:text-base"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderEmail;