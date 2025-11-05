import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LeadManagementInformation from "../advisor/leadAdvisorFormComponents/LeadManagementInformation";
import FestivalForm from "../advisor/leadAdvisorFormComponents/FestivalForm";
import ServiceRequestDetails from "../advisor/leadAdvisorFormComponents/ServiceRequestDetails";

const LeadAdvisorForm = ({ formData, setFormData, isDisabled }) => {
  return (
    <Accordion type="multiple" className="w-full" defaultValue={["lead-management-information"]}>
      <AccordionItem value="lead-management-information" className="mb-1">
        <AccordionTrigger className="text-xl">Lead Management Information</AccordionTrigger>
        <AccordionContent>
          <LeadManagementInformation
            LeadManagementInformation={formData}
            onNext={() => {}}
            onPrevious={() => {}}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="festival-form" className="mb-1">
        <AccordionTrigger className="text-xl">Festival Form</AccordionTrigger>
        <AccordionContent>
          <FestivalForm
            FestivalForm={formData}
            onNext={() => {}}
            onPrevious={() => {}}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="service-request-details" className="mb-1">
        <AccordionTrigger className="text-xl">Service Request Details</AccordionTrigger>
        <AccordionContent>
          <ServiceRequestDetails
            ServiceRequestDetails={formData}
            onNext={() => {}}
            onPrevious={() => {}}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LeadAdvisorForm;
