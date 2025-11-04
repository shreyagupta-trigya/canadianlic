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

// Reusable pill input field - Fully Responsive
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
      <div className="text-muted-foreground w-full sm:w-20 lg:w-24 py-1 text-xs sm:text-sm flex-shrink-0">
        {label}
      </div>
      <div className="w-full flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              className="flex flex-wrap items-center cursor-pointer min-h-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none hover:border-gray-400 transition-colors bg-white dark:bg-background dark:text-white "
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
                  variant="secondary"
                  className="mr-1 mb-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-background dark:bg-gray-400 dark:text-white flex items-center gap-1 text-xs max-w-[140px] sm:max-w-[160px] truncate transition-colors"
                >
                  <span className="truncate">
                    {person.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent hover:text-red-500 min-w-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(person.email);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="p-0 w-[90vw] sm:w-96 lg:w-[500px] xl:w-[600px] max-w-full border shadow-lg" 
            align="start"
          >
            <Command className="border-0">
              <CommandInput 
                placeholder="Search contacts..." 
                className="h-12 text-sm border-b rounded-none"
              />
              <CommandList className="max-h-60">
                <CommandGroup heading="Contacts" className="text-sm">
                  {contacts.map((person) => (
                    <CommandItem
                      key={person.email}
                      onSelect={() => handleSelect(person)}
                      className="cursor-pointer flex flex-col items-start py-3 px-4 text-sm hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{person.name}</span>
                      <span className="text-muted-foreground text-xs mt-0.5">
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

const MaterialRequistionEmail = (props) => {
  const [toList, setToList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [bccList, setBccList] = useState([]);
  const [showAttachment, setShowAttachment] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState([]);
  
  // Initialize Quill size styles
  const SizeStyle = Quill.import("attributors/style/size");
  SizeStyle.whitelist = ["12px", "14px", "16px", "18px", "24px", "32px"];
  Quill.register(SizeStyle, true);
  
  const [value, setValue] = useState(`
Dear WINTER PARK CONSTRUCTION, <br />
<br />
Thanks for your interest in our services. Please find our sales order attached with this mail.<br />
<br />
An overview of the sales order is available below for your reference:  <br />
<br />
----------------------------------------------------------------------------------------<br />
Material Requistion # : SO-22-2037<br />
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

  const navigate = useNavigate();

  useEffect(() => {
    if (props.scopeOfWork?.length > 0) {
      setValue(props.scopeOfWork);
    }
  }, [props.scopeOfWork]);

  useEffect(() => {
    console.log("Updated value:", value);
  }, [value]);

  const handleInputChange = (content) => {
    setValue(content);
    console.log("User changed data:", content);
    if (props.getData) {
      props.getData(content, "scopeOfWork");
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
    e.target.value = ''; // Reset input
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
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
    <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm">
      {/* Email Header */}
      <div className="space-y-4 sm:space-y-6">
        {/* From Field */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
          <div className="text-muted-foreground w-full sm:w-20 lg:w-24 py-1 text-sm font-medium flex-shrink-0">
            From
          </div>
          <div className="text-gray-900 text-sm bg-gray-50 dark:bg-gray-400 rounded-lg px-3 py-2 w-full">
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
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
          <div className="text-muted-foreground w-full sm:w-20 lg:w-24 py-1 text-sm font-medium flex-shrink-0">
            Subject
          </div>
          <div className="w-full flex-1">
            <input
              type="text"
              className="w-full border border-gray-300 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg px-3 py-2 text-sm placeholder-gray-400 bg-white dark:bg-background dark:text-white transition-colors"
              placeholder="Enter subject"
              defaultValue="Material Requisition from Seven Ocean Distributor (Material Requisition #: SO-22-2037)"
            />
          </div>
        </div>
      </div>

      {/* Email Editor */}
      <div className="border border-gray-300 min-h-100 rounded-xl shadow-sm bg-white dark:bg-background my-4 sm:my-6 lg:my-8 p-3 sm:p-4">
        <ReactQuill
          value={value}
          onChange={handleInputChange}
          modules={modules}
          className=" h-78 md:h-80 lg:h-80 text-sm"
          theme="snow"
          style={{ 
            border: 'none',
            fontFamily: 'inherit'
          }}
        />
      </div>

      {/* Attachments Section */}
      <div className="space-y-4 sm:space-y-6">
        {/* Optional Attachment Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-blue-50 dark:bg-gray-400  rounded-xl gap-3 sm:gap-0">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="attach-mr"
              defaultChecked
              onCheckedChange={(checked) => setShowAttachment(Boolean(checked))}
              className="h-5 w-5 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="attach-mr" className="text-sm sm:text-base font-medium text-gray-900">
              Attach Material Requisition PDF
            </Label>
          </div>
          {showAttachment && (
            <div className="flex items-center border border-gray-300 bg-white px-3 py-2 rounded-lg text-sm text-gray-700">
              <FileText className="text-red-500 w-4 h-4 mr-2 flex-shrink-0" />
              <span className="font-medium">SO-22-2037</span>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="space-y-3">
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            multiple 
            onChange={handleFileUpload}
          />
          
          <label
            htmlFor="file-upload"
            className="border-2 border-dashed border-gray-300 p-4 sm:p-6 rounded-xl inline-flex flex-col sm:flex-row items-center justify-center text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-700 dark:hover:bg-gray-400  cursor-pointer transition-all duration-200 text-sm w-full text-center gap-2"
          >
            <Paperclip className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Click to attach files</span>
            <span className="text-xs text-gray-500">or drag and drop</span>
          </label>
          
          {/* File List Preview */}
          {attachedFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">Attached files:</p>
              <div className="flex flex-wrap gap-2">
                {attachedFiles.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm group hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
                    <span className="truncate max-w-[120px] sm:max-w-[150px] lg:max-w-[200px] text-gray-700">
                      {file.name}
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-2 text-gray-400 hover:text-red-500 flex-shrink-0 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-xs text-gray-500 text-center sm:text-left">
            Maximum 10 files, 10MB each • Supported formats: PDF, DOC, DOCX, JPG, PNG
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 w-full border-t border-gray-200 mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8">
        <Button 
          onClick={() => navigate(-1)}
          variant="outline"
          className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 cursor-pointer transition-colors w-full sm:w-auto order-2 sm:order-1 text-sm py-2.5 h-auto font-medium"
        >
          Cancel
        </Button>
        <div className="flex-1"></div>
        <Button 
          className="bg-gray-900 hover:bg-gray-800 text-white border-0 hover:shadow-lg cursor-pointer transition-all duration-200 w-full sm:w-auto order-1 sm:order-2 text-sm py-2.5 h-auto font-medium shadow-sm"
        >
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default MaterialRequistionEmail;