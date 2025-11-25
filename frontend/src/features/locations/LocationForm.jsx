import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import FormPageLayout from "@/layout/FormPageLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Loader from "@/components/Loader";
import Rolling from "./Rolling";
import AnnualPerformance from "./AnnualPerformance";
import Swal from "sweetalert2";

const stepTitles = ["Location Info", "Address Info"];

const initialFormData = {
  locationOwner: "",
  locationName: "",
  phone: "",
  fax: "",
  website: "",
  rating: "",
  description: "",
  currency: "CAD",
  parentLocation: "",
  employees: "",
  discountFactor: "",
  exchangeRate: "",
  phoneBurnerFollowUpDate: "",
  phoneBurnerLastCallOutcome: "",
  phoneBurnerLastCallTime: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  shipmentStreet: "",
  shipmentCity: "",
  shipmentState: "",
  shipmentPostalCode: "",
  shipmentCountry: "",
  averageMonthlyRevenue: "",
  advisorAnnualRevenueYield: "",
  clientAverageAnnualYield: "",
  totalRollingRevenue: "",
  advisorAverageMonthlyYield: "",
  clientAverageMonthlyYield: "",
};

const LocationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [insurancePartnerOwnerOptions, setInsurancePartnerOwnerOptions] =
    useState([]);
  const [locationListingOptions, setLocationListingOptions] = useState([]);

  // Data fetch
  const getAllUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/contact/api/v1/getusers");
      const data = await response.json();
      setInsurancePartnerOwnerOptions(data.map((item) => item.userData));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  const getAllLocations = useCallback(async () => {
    try {
      const response = await fetch("/api/locations/api/v1/getlocation");
      const data = await response.json();
      setLocationListingOptions(data.map((item) => item.locations));
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  }, []);

  const getSingleLocation = useCallback(async () => {
    if (!id) return;
    try {
      const response = await fetch(
        `/api/locations/api/v1/getsinglelocation/${id}`
      );
      const data = await response.json();
      if (data[0]?.locations) {
        setFormData((prev) => ({ ...prev, ...data[0].locations }));
      }
    } catch (error) {
      console.error("Failed to fetch single location:", error);
    }
  }, [id]);

  useEffect(() => {
    getAllUsers();
    getAllLocations();
    getSingleLocation();
  }, [getAllUsers, getAllLocations, getSingleLocation]);

  // Validation
  const validateStep = () => {
    let stepErrors = {};
    if (currentStep === 0) {
      if (!formData.locationOwner)
        stepErrors.locationOwner = "Location Owner is required";
      if (!formData.locationName)
        stepErrors.locationName = "Location Name is required";
      if (!formData.parentLocation)
        stepErrors.parentLocation = "Parent Location is required";
      if (!formData.area) stepErrors.area = "Area is required";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateAll = () => validateStep();

  const goToStep = (step) => {
    if (step === 0 || validateStep()) setCurrentStep(step);
    else Swal.fire("Complete current step before proceeding", "", "error");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Submission
  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (!validateAll()) {
      Swal.fire("Please fill required fields.", "", "error");
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await fetch(`/api/locations/api/v1/updatelocation/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        Swal.fire("Location updated successfully!", "", "success");
      } else {
        await fetch("/api/locations/api/v1/createlocation", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        Swal.fire("Location created successfully!", "", "success");
      }
      navigate("/locations");
    } catch {
      Swal.fire("Failed to submit location.", "", "error");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => navigate(-1);

  return (
    <FormPageLayout
      title={
        <span className="text-lg font-semibold md:text-2xl">
          {id ? "Update Location" : "Create Location"}
        </span>
      }
      onCancel={onCancel}
      onSubmit={currentStep === 0 ? () => setCurrentStep(1) : handleSubmit}
      loading={loading}
      submitButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
      cancelButtonClass="text-sm px-3 py-1 md:text-base md:px-5 md:py-2"
    >
      {/* Stepper */}
      <div className="flex items-center justify-center mb-8">
        {stepTitles.map((step, i) => (
          <React.Fragment key={i}>
            <div
              className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => goToStep(i)}
            >
              <div
                className={`w-4 h-4 rounded-full text-white font-semibold transition-all duration-300 ${
                  i === currentStep
                    ? "bg-blue-500 shadow-lg"
                    : i < currentStep
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
              <span
                className={`text-sm transition-colors m-0 p-0 duration-300 ${
                  i === currentStep
                    ? "text-blue-500 font-medium"
                    : i < currentStep
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
            {i < stepTitles.length - 1 && (
              <div
                className={`h-[2px] flex-1 mb-5 transition-colors duration-300 ${
                  i < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Location Info */}
      {currentStep === 0 && (
        <form
          className="rounded-2xl border px-6 py-5 flex flex-col space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentStep(1);
          }}
        >
          <div className="text-lg font-semibold mb-4">Location Information</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">
                Location Owner <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.locationOwner}
                onValueChange={(v) => handleChange("locationOwner", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Location Owner" />
                </SelectTrigger>
                <SelectContent>
                  {insurancePartnerOwnerOptions.map((owner) => (
                    <SelectItem
                      key={owner.ROWID}
                      value={owner.ROWID ? String(owner.ROWID) : ""}
                    >
                      {owner.firstName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.locationOwner && (
                <p className="text-red-500 text-sm">{errors.locationOwner}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Location Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.locationName}
                onChange={(e) => handleChange("locationName", e.target.value)}
                placeholder="Enter Location Name"
                className={errors.locationName ? "border-red-500" : ""}
              />
              {errors.locationName && (
                <p className="text-red-500 text-sm">{errors.locationName}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter Phone"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Currency</label>
              <Input
                value={formData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                placeholder="Enter Currency"
                disabled
                className="bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fax</label>
              <Input
                value={formData.fax}
                onChange={(e) => handleChange("fax", e.target.value)}
                placeholder="Enter Fax"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Rating</label>
              <Select
                value={formData.rating}
                onValueChange={(v) => handleChange("rating", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Needs Improvement">
                    Needs Improvement
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Parent Location <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.parentLocation}
                onValueChange={(v) => handleChange("parentLocation", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Parent Location" />
                </SelectTrigger>
                <SelectContent>
                  {locationListingOptions.map((loc) => (
                    <SelectItem
                      key={loc.ROWID}
                      value={loc.ROWID ? String(loc.ROWID) : ""}
                    >
                      {loc.locationName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.parentLocation && (
                <p className="text-red-500 text-sm">{errors.parentLocation}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Website</label>
              <Input
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="Enter Website"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Location Discount Factor %
              </label>
              <Input
                value={formData.discountFactor}
                onChange={(e) => handleChange("discountFactor", e.target.value)}
                placeholder="Enter Discount Factor (%)"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Employee</label>
              <Input
                value={formData.employees}
                onChange={(e) => handleChange("employees", e.target.value)}
                placeholder="Enter Employee Count"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Exchange Rate</label>
              <Input
                type="number"
                value={formData.exchangeRate || ""}
                onChange={(e) => handleChange("exchangeRate", e.target.value)}
                placeholder="Enter Exchange Rate"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                PhoneBurner Follow Up Date
              </label>
              <Input
                type="date"
                value={formData.phoneBurnerFollowUpDate}
                onChange={(e) =>
                  handleChange("phoneBurnerFollowUpDate", e.target.value)
                }
                placeholder="dd-mm-yyyy"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                PhoneBurner Last Call Outcome
              </label>
              <Input
                value={formData.phoneBurnerLastCallOutcome}
                onChange={(e) =>
                  handleChange("phoneBurnerLastCallOutcome", e.target.value)
                }
                placeholder="Enter Last Call Outcome"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                PhoneBurner Last Call Time
              </label>
              <Input
                type="datetime-local"
                value={formData.phoneBurnerLastCallTime}
                onChange={(e) =>
                  handleChange("phoneBurnerLastCallTime", e.target.value)
                }
                placeholder="dd-mm-yyyy --:-- --"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter Description"
              />
            </div>
          </div>
          <div className="mt-6">
            <Rolling getRolling={(data) => console.log("Rolling data", data)} />
          </div>

          {/* 4 Disabled Fields Under Rolling */}
          <div className="flex justify-end mt-6">
            <div className="border rounded p-6 w-full max-w-2xl">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 items-center">
                <label className="font-medium ">
                  Average Monthly Revenue (CA$)
                </label>
                <Input
                  type="text"
                  value={formData.averageMonthlyRevenue}
                  disabled
                  className="bg-gray-100 rounded px-4 py-2 w-full"
                />

                <label className="font-medium ">
                  Advisor Average Annual Yield (CA$)
                </label>
                <Input
                  type="text"
                  value={formData.advisorAnnualRevenueYield}
                  disabled
                  className="bg-gray-100 rounded px-4 py-2 w-full"
                />

                <label className="font-medium ">
                  Client Average Annual Yield (CA$)
                </label>
                <Input
                  type="text"
                  value={formData.clientAverageAnnualYield}
                  disabled
                  className="bg-gray-100 rounded px-4 py-2 w-full"
                />

                <label className="font-medium ">
                  Total Rolling Revenue (CA$)
                </label>
                <Input
                  type="text"
                  value={formData.totalRollingRevenue}
                  disabled
                  className="bg-gray-100 rounded px-4 py-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Annual Performance Tracker Table */}
          <div className="mt-6">
            <AnnualPerformance
              getAnnualPerformance={(data) =>
                console.log("Annual Performance data", data)
              }
            />
          </div>

          {/* 2 Disabled Fields Under Annual Table */}
          <div className="flex justify-end mt-6">
            <div className="border rounded p-6 w-full max-w-2xl">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 items-center">
                <label className="block mb-1 font-semibold">
                  Client Average Monthly Yield (CA$)
                </label>
                <Input
                  value={formData.clientAverageMonthlyYield}
                  disabled
                  className="bg-gray-100 rounded px-4 py-2 w-full"
                />
                <label className="block mb-1 font-semibold">
                  Advisor Average Monthly Yield (CA$)
                </label>
                <Input
                  value={formData.advisorAverageMonthlyYield}
                  disabled
                  className="bg-gray-100 rounded px-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Step 2: Address Info */}
      {currentStep === 1 && (
        <form
          className="rounded-2xl border px-6 py-5 flex flex-col space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="text-lg font-semibold mb-4">Address Information</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Billing Address (Left) */}
            <div>
              <div className="mb-2 font-semibold text-center text-gray-700">
                Billing Address
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Billing Street
                  </label>
                  <Input
                    value={formData.street}
                    onChange={(e) => handleChange("street", e.target.value)}
                    placeholder="Billing Street"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Billing City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Billing City"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Billing State
                  </label>
                  <Input
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    placeholder="Billing State"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Billing Postal Code
                  </label>
                  <Input
                    value={formData.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    placeholder="Billing Postal Code"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Billing Country
                  </label>
                  <Input
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="Billing Country"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address (Right) */}
            <div>
              <div className="mb-2 font-semibold text-center text-gray-700">
                Shipping Address
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Shipping Street
                  </label>
                  <Input
                    value={formData.shipmentStreet}
                    onChange={(e) =>
                      handleChange("shipmentStreet", e.target.value)
                    }
                    placeholder="Shipping Street"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Shipping City
                  </label>
                  <Input
                    value={formData.shipmentCity}
                    onChange={(e) =>
                      handleChange("shipmentCity", e.target.value)
                    }
                    placeholder="Shipping City"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Shipping State
                  </label>
                  <Input
                    value={formData.shipmentState}
                    onChange={(e) =>
                      handleChange("shipmentState", e.target.value)
                    }
                    placeholder="Shipping State"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Shipping Postal Code
                  </label>
                  <Input
                    value={formData.shipmentPostalCode}
                    onChange={(e) =>
                      handleChange("shipmentPostalCode", e.target.value)
                    }
                    placeholder="Shipping Postal Code"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Shipping Country
                  </label>
                  <Input
                    value={formData.shipmentCountry}
                    onChange={(e) =>
                      handleChange("shipmentCountry", e.target.value)
                    }
                    placeholder="Shipping Country"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description/Bio at the bottom */}
          <div className="mt-2">
            <div className="text-lg font-semibold mb-4">
              Description Information
            </div>
            <label className="block mb-1 font-medium">Bio</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter additional information"
              rows={3}
              className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring"
            />
          </div>
        </form>
      )}
    </FormPageLayout>
  );
};

export default LocationForm;
