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
    <tr className="align-top">
      <td className="text-muted-foreground w-[80px] py-2 pr-4 text-sm">
        {label}
      </td>
      <td className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              className="flex flex-wrap items-center cursor-pointer min-h-10 w-full border rounded-md px-2 py-1  focus:outline-none"
              onClick={() => setOpen(true)}
            >
              {selected.map((person) => (
                <Badge
                  key={person.email}
                  className="mr-1 mb-1 px-2 py-0 bg-gray-300 hover:bg-gray-200 text-blacks  flex items-center gap-1"
                >
                  <span>
                    {person.name} &lt;{person.email}&gt;
                  </span>
                  <Button
                    className="ml-1 py-0 bg-transparent hover:bg-transparent cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent popover toggle
                      onRemove(person.email);
                    }}
                  >
                    <X className="h-2 w-3 bg-transparent  text-black cursor-pointer hover:text-red-500" />
                  </Button>
                </Badge>
              ))}
              <span className=" cursor-pointer text-muted-foreground text-sm"></span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[800px]">
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
                      <span>{person.name}</span>
                      <span className="text-muted-foreground text-sm">
                        {person.email}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}

const CreditNoteMail = (props) => {
  const [toList, setToList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [bccList, setBccList] = useState([]);
  const [showAttachment, setShowAttachment] = useState(true);
  const SizeStyle = Quill.import("attributors/style/size");
  SizeStyle.whitelist = ["12px", "14px", "16px", "18px", "24px", "32px"];
  Quill.register(SizeStyle, true);
  const [value, setValue] = useState(`
        
Dear Quest, Inc, <br />

This message is to let you know that the following items have been shipped to you by Ion Electrical Distributor. The details of the shipment have been enclosed with this mail for your reference.<br />
Tracking#<br />
Carrier: OUR TRUCK<br />
<br />
Thanks and Regards,<br />
Ion Electrical Distributor<br />


      `);

  // Effect to update state when props change
  const navigate = useNavigate();
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
    <div>
      <div className="w-full h-10 bg-white  my-2 text-2xl py-7 px-4 flex items-center justify-between">
        <h1>Email Credit Note to AIREKO ENERGY SOLUTION US LLC</h1>
      </div>
      <div className="w-full max-w-4xl border rounded-md p-4 m-2 bg-white shadow-sm text-sm">
        <table className="w-full table-fixed border-separate border-spacing-y-1">
          <tbody>
            <tr className="align-top">
              <td className="text-muted-foreground w-[80px] py-2 pr-4 text-sm">
                From
              </td>
              <td className="text-muted-foreground  py-2 pr-4 text-sm">jamie &lt;jamie@ionlighting.com&gt;</td>
            </tr>

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

            <tr className="align-top">
              <td className="text-muted-foreground w-[80px] py-2 pr-4 text-sm">
                Subject
              </td>
              <td className="w-full">
                <input
                  type="text"
                  className="w-full  border outline-none hover:outline-none rounded-md px-3 py-2"
                  placeholder="Enter subject"
                  defaultValue="Credit Note - ION-CN-25-1118 from Ion Electrical Distributor"
                />
              </td>
            </tr>
          </tbody>
        </table>
      

          <div className=" border rounded shadow min-h-75 bg-white my-5  p-2 ">
            <ReactQuill
              value={value}
              onChange={handleInputChange}
              modules={modules}
              className="  p-2  rounded   h-60 "
            />
          </div>
    
        <div className="space-y-3">
          {/* Top Section */}
          <div className="flex items-center justify-between   rounded-md">
            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="attach-po"
                defaultChecked
                onCheckedChange={(checked) =>
                  setShowAttachment(Boolean(checked))
                }
              />
              <Label htmlFor="attach-po" className="text-base font-medium">
                Attach Purchase Order PDF
              </Label>
            </div> */}
            {showAttachment && (
              <div className="flex items-center border border-gray-300 bg-white px-3 py-1 rounded-md text-sm text-gray-700">
                <FileText className="text-red-500 w-10 h-6 mr-2" />
                PO-25-4673
              </div>
            )}
          </div>

          {/* Attachments Section */}
          <div>
            <input id="file-upload" type="file" className="hidden" />

            <label
              htmlFor="file-upload"
              className="border border-dashed border-gray-300 p-3 rounded-md inline-flex items-center text-blue-600 cursor-pointer text-sm"
            >
              <Paperclip className="w-10 h-4 mr-2" />
              Attachments
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-3  shadow-t min-h-10 w-full border-t mt-8 p-5">
        <Button className="bg-gray-600 border  hover:shadow cursor-pointer">Send</Button>
        <Button onClick={()=>navigate(-1) }className="bg-white text-black border hover:bg-transparent hover:shadow cursor-pointer">Cancel</Button>
      </div>
    </div>
  );
};

export default CreditNoteMail;

