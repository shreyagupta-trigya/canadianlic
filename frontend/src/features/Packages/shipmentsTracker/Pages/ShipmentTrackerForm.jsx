import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2 } from "lucide-react"
import { FormField } from "@/components/custom/CustomFormComponents"
import FormPageLayout from "@/layout/FormPageLayout"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { CardTitle } from "@/components/ui/card"

export default function ShipmentTrackerForm() {
  const navigate = useNavigate()
  const [itemRows, setItemRows] = useState([{}]);
  const [poRows, setPoRows] = useState([{}]);

  const addItemRow = () => setItemRows([...itemRows, {}]);
  const addPoRow = () => setPoRows([...poRows, {}]);
  const removeItemRow = (index) => setItemRows(itemRows.filter((_, i) => i !== index));
  const removePoRow = (index) => setPoRows(poRows.filter((_, i) => i !== index));
  const [selectedPO, setSelectedPO] = useState("");
  const onCancel = () => {
    navigate(-1);
  };
  const handleSubmit = () => {

    window.alert("success");
  };
  return (
    <>
  <CardTitle className="text-2xl font-normal w-full flex justify-between  dark:bg-black bg-white   px-5 py-2 ">
        {" "}
        <div> Shipment Tracker</div>
        <button
          className="text-black cursor-pointer text-xl font-bold"
          onClick={onCancel}
        >
          ✕
        </button>
      </CardTitle>
      <div className="p-6">



        <div className="flex w-full my-3 justify-between">
          <FormField label="ION SO">
            <Input
              className="w-[100%]"

              type="text"
              id=""
              placeholder=""
            />
          </FormField>

          <FormField label="Customer PO">
            <Input className="w-[100%]" type="text" id="" placeholder="" />
          </FormField>
        </div>

        <div className="flex w-full my-5 justify-between">
          <FormField label="Job Number">
            <Input className="w-[100%]" type="text" id="" placeholder="" />
          </FormField>

          <FormField label="PO Amount">
            <Input className="w-[100%]" type="text" id="" placeholder="" />
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Job Name">
            <Input className="w-[100%]" type="text" id="" placeholder="" />
          </FormField>

          <FormField label="Invoiced Amount">
            <Input className="w-[100%]" type="text" id="" placeholder="" />
          </FormField>
        </div>
        <div className="flex w-full my-5 justify-between">
          <FormField label="Customer Email">
            <Input className="w-[100%]" type="text" id="" placeholder="" />
          </FormField>

          <FormField label="Balance Open">
            <Input className="w-[100%]" type="text" id="" placeholder="" />
          </FormField>
        </div>

        <FormField
          className=" w-[100%]"
          label="Deal Name"
        >
          <Select
            value={selectedPO}
            onValueChange={(value) => setSelectedPO(value)}
          >
            <SelectTrigger className="w-full  bg-white">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SO001">Blue Origin Parking Garage</SelectItem>
              <SelectItem value="SO002">AHU Wilkinson</SelectItem>
              <SelectItem value="SO003">ASH ALTER EGO RESTAURANT</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        {/* Item Details */}
        <div className="mt-6">
          <h3 className="text-md font-medium mb-2">Item Details</h3>

          {/* Scrollable container */}
          <div className="overflow-x-auto">
            <table className="min-w-[200rem] text-md font-semibold">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th></th>
                  <th className="p-2 w-50 font-normal">Fixture Type</th>
                  <th className="p-2 w-60 font-normal">Description</th>
                  <th className="p-2 w-50 font-normal">SKU</th>
                  <th className="p-2 w-50 font-normal">QTY Ordered</th>
                  <th className="p-2 w-50 font-normal">Qty Received</th>
                  <th className="p-2 w-50 font-normal">Qty Backorders</th>
                  <th className="p-2 w-50 font-normal">Ship Qty</th>
                  <th className="p-2 w-50 font-normal">Ship Date</th>
                  <th className="p-2 w-50 font-normal">Carrier</th>
                  <th className="p-2 w-50 font-normal">Tracking No</th>
                  <th className="p-2 w-50 font-normal">PO NO</th>
                  <th className="p-2 w-50 font-normal">PO Line Item ID</th>
                  <th className="p-2 w-50 font-normal">PO URL</th>
                  <th className="p-2 w-50 font-normal">Code</th>
                  <th className="p-2 w-50 font-normal">Shipment Status</th>
                  <th className="p-2 w-50 font-normal">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {itemRows.map((_, i) => (
                  <tr key={i} className="border-b ">
                    <td className="p-2">
                      <Button variant="ghost" size="sm" onClick={() => removeItemRow(i)}>
                        ✕
                      </Button>
                    </td>
                    <td className="p-2"><Input placeholder="" /></td>
                    <td className="p-2"><Textarea row={5} placeholder="" /></td>
                    <td className="p-2"><Input placeholder="" /></td>
                    <td className="p-2"><Input placeholder="#######" /></td>
                    <td className="p-2"><Input placeholder="#####" /></td>
                    <td className="p-2"><Input placeholder="######" /></td>
                    <td className="p-2"><Input placeholder="####.##" /></td>
                    <td className="p-2"><Input type="date" placeholder="dd-mm-yyyy" /></td>
                    <td className="p-2"><Input placeholder="" /></td>
                    <td className="p-2"><Input placeholder="Tracking No" /></td>
                    <td className="p-2"><Input placeholder="PO NO" /></td>
                    <td className="p-2"><Input placeholder="Line Item ID" /></td>
                    <td className="p-2"><Input placeholder="URL" /></td>
                    <td className="p-2"><Input placeholder="Code" /></td>
                    <td className="p-2"><Input placeholder="Shipment Status" /></td>
                    <td className="p-2"><Input placeholder="Order Status" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant="link" className="mt- text-blue-500" onClick={addItemRow}>
            + Add New
          </Button>

        </div>


        {/* PO Updates */}
       <div className="mt-6">
          <h3 className="text-md font-medium mb-2">PO Updates</h3>
        <div className="overflow-x-auto">
          <table className="min-w-[100rem] text-md font-semibold">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th></th>
                <th className="p-2  w-50 font-normal">SO Number</th>
                <th className="p-2 w-60 font-normal">Item</th>
                <th className="p-2 w-50 font-normal">SKU</th>
                <th className="p-2 w-50 font-normal">Total Qty</th>
                <th className="p-2 w-50 font-normal">PO Vendor</th>
                <th className="p-2 w-50 font-normal">PO No#</th>
                <th className="p-2 w-50 font-normal">Purchased Qty</th>
                <th className="p-2 w-50 font-normal">PO URL</th>
                
              </tr>
            </thead>
            <tbody>
              {itemRows.map((_, i) => (
                <tr key={i} className="border-b ">
                  <td className="p-2">
                    <Button variant="ghost" size="sm" onClick={() => removeItemRow(i)}>
                      ✕
                    </Button>
                  </td>
                  <td className="p-2"><Input placeholder="" /></td>
                  <td className="p-2"><Input placeholder="" /></td>
                  <td className="p-2"><Input placeholder="" /></td>
                  <td className="p-2"><Input placeholder="" /></td>
                  <td className="p-2"><Input placeholder="#####" /></td>
                  <td className="p-2"><Input placeholder="" /></td>
                  <td className="p-2"><Input placeholder="####.##" /></td>
                  <td className="p-2"><Input placeholder="https://" /></td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <Button variant="link" className="mt-2 text-blue-500" onClick={addItemRow}>
            + Add New
          </Button>
        </div>
      </div>
     <div className="flex gap-3 border-t pt-4 px-20">
            
    
            <Button className="text-white bg-gray-500">
              Submit 
            </Button>
    
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
    </>
  )
}
