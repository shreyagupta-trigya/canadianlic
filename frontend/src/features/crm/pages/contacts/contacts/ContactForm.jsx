import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// import Swal from 'sweetalert2';

// Components
import Loader from '@/components/Loader';
import ContactInfoForm from './contactForm/ContactInfoForm';
import ServiceForm from './contactForm/ServiceForm';
import PotentialForm from './contactForm/PotentialForm';
import FamilyTreeForm from './contactForm/FamilyTreeForm';
import FestivalForm from './contactForm/FestivalForm';
import LeadInfoForm from './contactForm/LeadInfoForm';
import FacebookForm from './contactForm/FacebookForm';
import AddressForm from './contactForm/AddressForm';
import LeadHistoryForm from './contactForm/LeadHistoryForm';
import LeadMgtForm from './contactForm/LeadMgtForm';

// Constants
// const { putUrl } = require('@/boot/axios');

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [leads, setLeads] = useState([]);
  
  const [apiData, setApiData] = useState({
    service: {},
    contactInfo: {},
    potential: {},
    familyTree: {},
    festival: {},
    leadinfo: {},
    facebook: {},
    leadMgt: {},
    address: {},
    leadHistory: {},
    layout: "Client",
    referralLeadId: location.search ? new URLSearchParams(location.search).get('leadId') : null
  });

  const steps = [
    { title: "Contact Info" },
    { title: "Service" },
    { title: "Potential" },
    { title: "Family Tree" },
    { title: "Festivals" },
    { title: "Lead Info" },
    { title: "Facebook" },
    { title: "Address Info" },
    { title: "Conversion History" },
    { title: "Lead Mgt" },
  ];

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsDataLoaded(true);
      
      try {
        const [usersData, contactsData, locationData, leadsData] = await Promise.all([
          fetchUsers(),
          fetchContacts(),
          fetchLocations(),
          fetchLeads()
        ]);

        setUsers(usersData);
        setContacts(contactsData);
        setLocationData(locationData);
        setLeads(leadsData);

        if (id) {
          await fetchContactData(id);
        }
        
        setIsDataLoaded(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsDataLoaded(false);
      }
    };

    fetchInitialData();
  }, [id]);

  // API functions
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-users`);
      return response.data?.users || [];
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-lead-data`);
      return response.data?.leads || [];
    } catch (error) {
      console.error("Error fetching leads:", error);
      return [];
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-contacts`);
      return response.data?.contacts || [];
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-locations`);
      return response.data?.locations || [];
    } catch (error) {
      console.error("Error fetching locations:", error);
      return [];
    }
  };

  const fetchContactData = async (contactId) => {
    try {
      const response = await axios.get(
        `${putUrl}canadianlicapi/contact/client/api/v2/get-contact/${contactId}`
      );
      
      const contactData = response.data?.contactDetails;
      
      setApiData(prevData => ({
        ...prevData,
        contactInfo: { ...contactData?.contacts },
        service: { ...contactData?.contactSubDetails },
        potential: { ...contactData?.contactSubDetails },
        festival: { 
          ...contactData?.contactSubDetails, 
          festivalsData: [...(contactData.festivals || [])] 
        },
        familyTree: {
          ...contactData?.familyTree,
          siblingData: [...(contactData.contactsSiblings || [])],
          dependentChildrenData: [...(contactData.dependentChildren || [])],
          dependentParentsData: [...(contactData.dependentParents || [])],
          emergencyContactData: [...(contactData.contactEmergencyDetails || [])],
        },
        leadinfo: { ...contactData?.leadInformations },
        facebook: { ...contactData?.leadInformations },
        address: { ...contactData?.contactSubDetails },
        leadMgt: { LeadMgtData: [...(contactData?.leadConversionHistory || [])] },
        leadHistory: { leadConversionHistoryData: [...(contactData?.contactConversionHistory || [])] }
      }));
      
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  // Step navigation
  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleNext = (componentName, data) => {
    setApiData(prevData => ({
      ...prevData,
      [componentName]: data
    }));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsDataLoaded(true);
      
      if (id) {
        // Update existing contact
        await axios.post(
          `${putUrl}canadianlicapi/contact/client/api/v2/update-contact/${id}`, 
          apiData
        );
        
        await Swal.fire({
          title: "<strong>Contact Updated Successfully</strong>",
          icon: "success",
          timer: 1000,
        });
      } else {
        // Create new contact
        await axios.put(
          `${putUrl}canadianlicapi/contact/client/api/v2/create-contact`, 
          apiData
        );
        
        await Swal.fire({
          timer: 2000,
          title: "<strong>Contact Created Successfully</strong>",
          icon: "success",
        });
      }
      
      setIsDataLoaded(false);
      setTimeout(() => {
        navigate("/contactlist");
      }, 2000);
      
    } catch (error) {
      setIsDataLoaded(false);
      console.error("Error submitting data:", error);
      
      Swal.fire({
        title: error.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  if (isDataLoaded) {
    return <Loader loading={true} />;
  }

  return (
    <div className="container-fluid ps-0 pe-2">
      {/* Stepper */}
      <div className="row">
        <div className="col-12">
          <div className="multisteps-form">
            <div className="row">
              <div className="col-12 mx-auto mb-2">
                <div className="card">
                  <div className="card-body">
                    <div className="multisteps-form__progress">
                      {steps.map((step, index) => (
                        <button
                          key={index}
                          className={`multisteps-form__progress-btn ${
                            index <= currentStep ? 'js-active' : ''
                          }`}
                          onClick={() => goToStep(index)}
                          type="button"
                        >
                          {step.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Steps */}
      {currentStep === 0 && (
        <ContactInfoForm
          ContactInfo={apiData.contactInfo}
          onNext={(data) => handleNext('contactInfo', data)}
          owners={users}
          contacts={contacts}
          leads={leads}
          location={locationData}
        />
      )}

      {currentStep === 1 && (
        <ServiceForm
          Service={apiData.service}
          onNext={(data) => handleNext('service', data)}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 2 && (
        <PotentialForm
          Potential={apiData.potential}
          onNext={(data) => handleNext('potential', data)}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 3 && (
        <FamilyTreeForm
          FamilyTree={apiData.familyTree}
          onNext={(data) => handleNext('familyTree', data)}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 4 && (
        <FestivalForm
          Festival={apiData.festival}
          onNext={(data) => handleNext('festival', data)}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 5 && (
        <LeadInfoForm
          Leadinfo={apiData.leadinfo}
          onNext={(data) => handleNext('leadinfo', data)}
          onPrevious={handlePrevious}
          location={locationData}
        />
      )}

      {currentStep === 6 && (
        <FacebookForm
          Facebook={apiData.facebook}
          onNext={(data) => handleNext('facebook', data)}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 7 && (
        <AddressForm
          address={apiData.address}
          onNext={(data) => handleNext('address', data)}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 8 && (
        <LeadHistoryForm
          leadHistory={apiData.leadHistory}
          onNext={(data) => handleNext('leadHistory', data)}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 9 && (
        <LeadMgtForm
          leadMgt={apiData.leadMgt}
          onNext={(data) => handleNext('leadMgt', data)}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ContactForm;