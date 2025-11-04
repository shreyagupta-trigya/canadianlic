import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import Loader from '../../components/Loader';
import Stepper from "@/components/ui/stepper";
import LeadInformation from './leadAdvisorFormComponents/LeadInformation';
import FamilyTree from './leadAdvisorFormComponents/FamilyTree';
import AddressInformation from './leadAdvisorFormComponents/AddressInformation';
import Facebook from './leadAdvisorFormComponents/Facebook';
import ReferralInformation from './leadAdvisorFormComponents/ReferralInformation';
import LeadManagementInformation from './leadAdvisorFormComponents/LeadManagementInformation';
import FestivalForm from './leadAdvisorFormComponents/FestivalForm';
import ServiceRequestDetails from './leadAdvisorFormComponents/ServiceRequestDetails';

const LeadAdvisorForm = () => {
  const steps = [
    { title: "Lead Info" },
    { title: "Family Tree" },
    { title: "Address Details" },
    { title: "Referral Info" },
    { title: "Facebook" },
    { title: "Festival" },
    { title: "Lead Management" },
    { title: "Service Request Details" },
  ];

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [users, setUsers] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [location, setLocation] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [referral, setReferral] = useState([]);
  const [apiData, setApiData] = useState({
    LeadInformation: {},
    FamilyTree: {},
    ReferralInformation: {},
    ServiceRequestDetails: {},
    FestivalForm: {},
    AddressInformation: {},
    Facebook: {},
    LeadManagementInformation: {},
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchInitialData = async (leadId) => {
    try {
      console.log("Fetching data for lead:", leadId);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}lead/api/v1/get-related-data/${leadId}`);
      const leadDetails = response.data?.leadDetails;
      setApiData({
        LeadInformation: leadDetails?.leads || {},
        FamilyTree: {
          ...leadDetails?.familyTree,
          dependentChildrenData: leadDetails.dependentChildrenData,
          dependentParentsData: leadDetails.dependentParentsData,
          siblingData: leadDetails.siblingData,
          emergencyContactData: leadDetails.emergencyContactData,
        },
        FestivalForm: {
          religion: leadDetails?.leads.religion,
          celebratedFestivals: leadDetails?.leads.celebratedFestivals,
          festivalsData: leadDetails?.festivalsData,
        },
        LeadManagementInformation: {
          LeadData: leadDetails?.LeadData,
        },
        ServiceRequestDetails: leadDetails?.leadService || {},
        AddressInformation: {
          street: leadDetails?.leadInformations.street,
          city: leadDetails?.leadInformations.city,
          state: leadDetails?.leadInformations.state,
          zipCode: leadDetails?.leadInformations.zipCode,
          country: leadDetails?.leadInformations.country,
        },
        Facebook: leadDetails?.leadInformations || {},
        ReferralInformation: {
          year: leadDetails?.leadInformations?.year,
          productCategoryReferred: leadDetails?.leadInformations?.productCategoryReferred,
          referralClient: leadDetails?.leadInformations?.referralClient,
          referralOtherThanClient: leadDetails?.leadInformations?.referralOtherThanClient,
          referralSource: leadDetails?.leadInformations?.referralSource,
        },
      });
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}lead/api/v1/get-users`);
      return response.data?.users || [];
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}lead/api/v1/get-locations`);
      return response.data?.locations || [];
    } catch (error) {
      console.error("Error fetching locations:", error);
      return [];
    }
  };

  const fetchAdvisors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}lead/api/v1/get-advisors`);
      return response.data?.advisors || [];
    } catch (error) {
      console.error("Error fetching advisors:", error);
      return [];
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}lead/api/v1/get-contacts`);
      return response.data?.contacts || [];
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  };

  const fetchReferral = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}canadianlicapi/utils/api/v2/get-referral`);
      return response.data?.referral || [];
    } catch (error) {
      console.error("Error fetching referral:", error);
      return [];
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleNext = (componentName, data) => {
    setApiData(prev => ({ ...prev, [componentName]: data }));
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };



  const handlePrevious = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting final data...", apiData);
    try {
      if (id) {
        await axios.post(`${process.env.REACT_APP_API_URL}lead/api/v1/updateNewLead/${id}`, {
          ...apiData,
          module: "advisor",
        });
        toast.success("Lead Advisor Updated Successfully");
        setTimeout(() => {
          navigate("/leads-list");
        }, 3000);
      } else {
        await axios.put(`${process.env.REACT_APP_API_URL}lead/api/v1/createNewLead`, {
          ...apiData,
          module: "advisor",
        });
        toast.success("Lead Advisor Created Successfully");
        setTimeout(() => {
          navigate("/leads-list");
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message || "Please fill all the required fields");
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsDataLoaded(true);
      setUsers(await fetchUsers());
      setAdvisors(await fetchAdvisors());
      setLocation(await fetchLocations());
      setContacts(await fetchContacts());
      setReferral(await fetchReferral());
      if (id) {
        await fetchInitialData(id);
      }
      setIsDataLoaded(false);
    };
    loadData();
  }, [id]);

  return (
    <>
      {/* <Loader loading={isDataLoaded} /> */}
      {!isDataLoaded && (
        <div className="min-h-screen relative">
          <div className="sticky w-full top-0 z-30 bg-background py-4 border-b border-muted">
            <div className="flex justify-between mx-6">
              <div className="w-1/2">
                <span className="text-lg font-semibold md:text-2xl">
                  {id ? "Update Lead Advisor" : "Create Lead Advisor"}
                </span>
              </div>
              <div className="w-1/2 flex justify-end gap-5">
                <button
                  onClick={() => navigate(-1)}
                  className="text-sm px-3 py-1 md:text-base md:px-5 md:py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
                  className="text-sm px-3 py-1 md:text-base md:px-5 md:py-2 bg-blue-500 text-white rounded"
                >
                  {currentStep === steps.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
          <div className="mx-6 mt-1">
            <div className="mb-6">
              <Stepper steps={steps} currentStep={currentStep} onStepClick={goToStep} />
            </div>
            <div className="mb-6">
              {currentStep === 0 && (
                <LeadInformation
                  onNext={(data) => handleNext('LeadInformation', data)}
                  LeadInformation={apiData.LeadInformation}
                  owners={users}
                  adviosers={advisors}
                  location={location}
                />
              )}
              {currentStep === 1 && (
                <FamilyTree
                  onNext={(data) => handleNext('FamilyTree', data)}
                  onPrevious={handlePrevious}
                  FamilyTree={apiData.FamilyTree}
                />
              )}
              {currentStep === 2 && (
                <AddressInformation
                  onNext={(data) => handleNext('AddressInformation', data)}
                  onPrevious={handlePrevious}
                  AddressInformation={apiData.AddressInformation}
                />
              )}
              {currentStep === 3 && (
                <ReferralInformation
                  onNext={(data) => handleNext('ReferralInformation', data)}
                  onPrevious={handlePrevious}
                  ReferralInformation={apiData.ReferralInformation}
                  contacts={contacts}
                  referral={referral}
                  leadSource={apiData.LeadInformation?.insuranceLeadSource}
                />
              )}
              {currentStep === 4 && (
                <Facebook
                  onNext={(data) => handleNext('Facebook', data)}
                  onPrevious={handlePrevious}
                  Facebook={apiData.Facebook}
                />
              )}
              {currentStep === 5 && (
                <FestivalForm
                  onNext={(data) => handleNext('FestivalForm', data)}
                  onPrevious={handlePrevious}
                  FestivalForm={apiData.FestivalForm}
                />
              )}
              {currentStep === 6 && (
                <LeadManagementInformation
                  onNext={(data) => handleNext('LeadManagementInformation', data)}
                  onPrevious={handlePrevious}
                  LeadManagementInformation={apiData.LeadManagementInformation}
                />
              )}
              {currentStep === 7 && (
                <ServiceRequestDetails
                  onNext={(data) => handleNext('ServiceRequestDetails', data)}
                  onPrevious={handlePrevious}
                  ServiceRequestDetails={apiData.ServiceRequestDetails}
                  id={id}
                />
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              {currentStep === steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadAdvisorForm;
