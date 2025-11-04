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

export default function ShipmentsTrackerEmail(props) {
  const [toList, setToList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [bccList, setBccList] = useState([]);
  const [showAttachment, setShowAttachment] = useState(true);
  const SizeStyle = Quill.import("attributors/style/size");
  SizeStyle.whitelist = ["12px", "14px", "16px", "18px", "24px", "32px"];
  Quill.register(SizeStyle, true);
  const [value, setValue] = useState(`
   
Order Status Update </br>

pk@ionlighting.com</br>

AIREKO ENERGY SOLUTION US LLC</br>

There has been a change to your purchase order(s).</br>
Please see below for details regarding the changed items or click the PDF links below your order(s) to review your order status.</br>

If you have any questions, please feel free to contact the customer service representative, directly beneath the PO/Ref number.</br>

Thank you for your business!</br>

Sicerely,</br>
Ion Lighting</br>


Code</br>
	Description</br>

ACD</br>
	Agency Calculated Date, showing the potential date an item might ship. This will be updated after the manufacturer confirms the order and provides the agency with a scheduled ship date.

SCH</br>
	Scheduled Ship Date provided by the manufacturer.

ACT</br>
	Actual date the items shipped from the manufacturer.

ACK</br>
	Order has been received by the agency and has been processed to the manufacturer.

HLD</br>
	Item is on hold.

REL</br>
	Item has been released.

PAR</br>
	Item has been partially released.

CAN</br>
	Item has been canceled.




AIREKO ENERGY SOLUTION US LLC</br>
PO/Ref#:NEED PO</br>



Your CSR for this PO is AIREKO ENERGY SOLUTION US LLC</br>

invoices@aireko.com</br>
Elite Lighting</br>
Ship to:</br>
null</br>


Quantity</br>
	Type</br>
	Catalog</br>
	Date</br>
	Code
	Shipping Information
	Status

2
	A
	2X2 LED CENTER BASKET==>
	
	
	
	

1
	A-EM
	2X2 LED CENTER BASKET W/ BATTERY==>
	
	
	
	

7
	B
	LCR615RD9FSE020==>6" ROUND ALL PURPOSE 1610LM LED MODULE, 5CCT, UNV, DIMMING
	
	
	
	

7
	B
	DOWNLIGHT: 6" Mounting Frame==>6" Mounting Frame for Downlight SKU: HL6RSMF
	
	
	
	

3
	B-EM
	LCR615RD9FSE040==>6" LED RECESSED DOWNLIGHT W/ BATTERY
	
	
	
	

3
	B-EM
	DOWNLIGHT: 6" Mounting Frame==>6" Mounting Frame for Downlight SKU: HL6RSMF
	
	
	
	

1
	X
	EXIT SIGN==>
	
	
	
	

5
	LVDS
	LVD-101-W==>Enerlites single load low voltage dimmer switch is used to control various 0-10V dimmable LED panel lights. Must be used with LV-CAT5
	
	
	
	

2
	PP
	DRIVER: Power Pack Low Voltage 120/230/277VAC 1HP==>Power Pack Low Voltage 120/230/277VAC 1HP SKU: MPP-24-W
	
	
	
	

2
	EM RELAY
	UL924 Emergency Lighting Automatic Load Control Relay, 20 Amp SPST, Universal 120-277 Vac Coil Input, Dry Contact Fire Alarm Interface==>UL924 Emergency Lighting Automatic Load Control Relay, 20 Amp SPST, Universal 120-277 Vac Coil Input, Dry Contact Fire Alarm Interface SKU: ESRN-1
	
	
	
	

3
	OCC
	SENSOR: Stickered Ultrasonic and PIR Dual Tech Occupancy 360 Degree Field of View, 1,600 Sq Ft Coverage, Low Voltage==>MDC-50L-W Ultrasonic and PIR Dual Tech Occupancy 360 Degree Field of View, 1,600 Sq Ft Coverage, Low Voltage
	
	
	
	

1
	TIMER
	SPRING-WOUND TIMER==>
	
	
	
	



Print PDF Summary of this PO




     `);

  // Effect to update state when props change
  const  navigate =useNavigate();
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
    <>
    <div className="w-full max-w-4xl border ml-17  rounded-md p-4 bg-white shadow-sm text-sm">
      <h1 className="text-2xl pb-5">Send mail Job Tracker</h1>
      <table className="w-full table-fixed border-separate border-spacing-y-1">
        <tbody>
          <EmailField
            label="To"
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

          <tr className="align-top">
            <td className="text-muted-foreground w-[80px] py-2 pr-4 text-sm">
              Subject
            </td>
            <td className="w-full">
              <input
                type="text"
                className="w-full  border outline-none hover:outline-none rounded-md px-3 py-2"
                placeholder="Enter subject"
                defaultValue="PO- NEED PO / AIREKO ENERGY SOLUTION US LLC"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className=" border rounded shadow min-h-100 bg-white my-5  p-2 ">
        <ReactQuill
          value={value}
          onChange={handleInputChange}
          modules={modules}
          className="  p-2  rounded   h-80 "
        />
      </div>
      {/* <div className="space-y-3">
       
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="attach-po"
              defaultChecked
              onCheckedChange={(checked) => setShowAttachment(Boolean(checked))}
            />
            <Label htmlFor="attach-po" className="text-base font-medium">
              Attach Purchase Order PDF
            </Label>
          </div>
          {showAttachment && (
            <div className="flex items-center border border-gray-300 bg-white px-3 py-1 rounded-md text-sm text-gray-700">
              <FileText className="text-red-500 w-4 h-4 mr-2" />
              PO-25-4673
            </div>
          )}
        </div>

        
        <div>
          <input id="file-upload" type="file" className="hidden" />

          <label
            htmlFor="file-upload"
            className="border border-dashed border-gray-300 p-3 rounded-md inline-flex items-center text-blue-600 cursor-pointer text-sm"
          >
            <Paperclip className="w-4 h-4 mr-2" />
            Attachments
          </label>
        </div>
      </div> */}




    </div>
     <div className="flex gap-3  shadow-t min-h-10 w-full border-t mt-8 p-5">
        <Button className="bg-gray-600 border  hover:shadow cursor-pointer">Send</Button>
        <Button onClick={()=>navigate(-1) }className="bg-white text-black border hover:bg-transparent hover:shadow cursor-pointer">Cancel</Button>
      </div>
    </>
  );
}
