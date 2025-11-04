import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UsersDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state || {
    employeeName: "John Doe",
    owner: "Jane Smith",
    email: "john.doe@example.com",
    employeeStatus: "Active",
    dateOfBirth: "1990-04-15",
    otherContactDetail: "Alternate Email: john.alt@example.com",
    startDate: "2023-01-10",
    phoneNumber: "+91 9876543210",
    rateHour: "25",
    nationality: "New Zealand",
    permissions: "Manager",
    department: "HR",
    street: "123 Queen Street",
    city: "Auckland",
    state: "Auckland Region",
    PinCode: "1010",
    country: "New Zealand",
    bank: "ANZ Bank",
    branch: "Downtown",
    account: "1234567890",
  };

  return (
    <div className="p-6 space-y-6 bg-[#fffdfa]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Employee Details
        </h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {/* Employee Information */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Employee Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DetailItem label="Employee Name" value={user.employeeName} />
          <DetailItem label="Owner" value={user.owner} />
          <DetailItem label="Email" value={user.email} />
          <DetailItem label="Employee Status" value={user.employeeStatus} />
          <DetailItem label="Date of Birth" value={user.dateOfBirth} />
          <DetailItem
            label="Other Contact Detail"
            value={user.otherContactDetail}
          />
          <DetailItem label="Start Date" value={user.startDate} />
          <DetailItem label="Phone Number" value={user.phoneNumber} />
          
          <DetailItem label="Nationality" value={user.nationality} />
          <DetailItem label="Permission" value={user.permissions} />
          <DetailItem label="Department" value={user.department} />
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DetailItem label="Street" value={user.street} />
          <DetailItem label="City" value={user.city} />
          <DetailItem label="State" value={user.state} />
          <DetailItem label="Pincode" value={user.PinCode} />
          <DetailItem label="Country" value={user.country} />
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DetailItem label="Bank" value={user.bank} />
          <DetailItem label="Branch" value={user.branch} />
          <DetailItem label="Account Number" value={user.account} />
        </CardContent>
      </Card>

      <Separator />
    </div>
  );
}

const DetailItem = ({ label, value }) => (
  <div className="flex gap-2 text-gray-700">
    <span className="text-gray-600 w-40">{label}:</span>
    <span>{value || "—"}</span>
  </div>
);

export default UsersDetail;
