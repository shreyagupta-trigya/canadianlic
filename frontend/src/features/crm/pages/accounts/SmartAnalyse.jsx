import React from "react";
import { FormSubHeading } from "@/components/custom/CustomFormComponents";
import { Card } from "@/components/ui/card";
import { Table, Trash2 } from "lucide-react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditableField, EditableSelectField } from "@/components/custom/GeneralCustomComponents";
function SmartAnalyse({
  isDisabled,
  formData,
  handleChange,
  accountType,
  segment,
  contactRole,
}) {
  return (
    <TabsContent value="smartAnalysis" className="flex flex-col px-2 lg:px-2">
      <div className="aspect-video w-full flex-1 rounded-lg">
        <Card className="shadow-background gap-4 mt-5 px-5 py-4">
          <FormSubHeading className="text-primary">
            Account Information
          </FormSubHeading>
          <div className="lg:flex gap-3.5">
            <div className="lg:w-1/2 flex">
              <div className="w-1/3 lg:w-1/4 flex flex-col items-start pr-2">
                <span className="mb-2 h-9 text-sm flex items-center text-muted-foreground">
                  Account Name
                </span>
                <span className="mb-2 h-9 text-sm flex items-center text-muted-foreground">
                  Customer Type
                </span>
                <span className="mb-2 h-9 text-sm flex items-center text-muted-foreground">
                  Segment
                </span>
                <span className="mb-2 h-9 text-sm flex items-center text-muted-foreground">
                  Email
                </span>
              </div>
              <div className="lg:w-2/4 pl-4 flex flex-col">
                <EditableField
                  value={formData.companyName}
                  name="companyName"
                  onChange={handleChange}
                />
                <EditableSelectField
                  readOnly={isDisabled}
                  onChange={handleChange}
                  value={formData?.companyType}
                  options={accountType}
                  name="accountType"
                />
                <EditableSelectField
                  options={segment}
                  name="segment"
                  onChange={handleChange}
                  value={formData?.segment}
                />
                <EditableField
                  type="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="lg:w-1/2 flex">
              <div className="w-1/3 lg:w-1/4 flex flex-col items-start pr-2">
                <span className="mb-2 h-9 text-sm flex items-center text-muted-foreground">
                  Account Number
                </span>
                <span className="mb-2 h-9 text-sm flex items-center text-muted-foreground">
                  Potential Revenue
                </span>
                <span className="mb-2 h-9 text-sm flex items-center text-muted-foreground">
                  Primary Contact
                </span>
                <span className="mb-2 h-9 text-sm flex items-center text-muted-foreground">
                  Phone
                </span>
              </div>

              <div className="lg:w-2/4 pl-4 flex flex-col">
                <EditableField
                  readOnly={isDisabled}
                  name="accountNumber"
                  type="number"
                  value={formData?.accountNumber}
                  onChange={handleChange}
                />
                <EditableField
                  name="potentialRevenue"
                  type="number"
                />
                <EditableField
                  name="primaryContact"
                  type="text"
                  value={formData?.primaryContact}
                  onChange={handleChange}
                />
                <EditableField
                  readOnly={isDisabled}
                  name="phone"
                  value={formData?.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="shadow-background gap-4 mt-5 px-5 py-4">
          <FormSubHeading className="text-primary">
            Key Stockholder
          </FormSubHeading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Buying Influence</TableHead>
                <TableHead>Relationship Strength</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <EditableSelectField
                    name="contact_1"
                    options={contactRole}
                    value={formData?.contact_1}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    type="text"
                    name="jobTitle_1"
                    value={formData?.jobTitle_1}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <EditableSelectField
                    name="buyingInfluence_1"
                    value={formData?.buyingInfluence_1}
                    onChange={handleChange}
                    options={[
                      { value: "high", label: "High" },
                      { value: "medium", label: "Medium" },
                      { value: "low", label: "Low" },
                    ]}
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    type="text"
                    name="relationshipStrength_1"
                    value={formData?.relationshipStrength_1}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <Trash2 className="text-red-500 cursor-pointer" size={18} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </TabsContent>
  );
}
export default SmartAnalyse