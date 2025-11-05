import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LeadInformation from "./leadFormComponents/LeadInformation";
import DescriptionInfo from "./leadFormComponents/DescriptionInfo";
import FamilyTree from "./leadFormComponents/FamilyTree";
import AddressInformation from "./leadFormComponents/AddressInformation";
import UMTDetails from "./leadFormComponents/UMTDetails";
import FestivalForm from "./leadFormComponents/FestivalForm";
import ServiceRequestDetails from "./leadFormComponents/ServiceRequestDetails";

const LeadClientForm = ({ formData, setFormData, isDisabled }) => {
  return (
    <Accordion type="multiple" className="w-full" defaultValue={["lead-information"]}>
      <AccordionItem value="lead-information" className="mb-1">
        <AccordionTrigger className="text-xl">Lead Information</AccordionTrigger>
        <AccordionContent>
          <LeadInformation formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="description-info" className="mb-1">
        <AccordionTrigger className="text-xl">Description Info</AccordionTrigger>
        <AccordionContent>
          <DescriptionInfo formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="family-tree" className="mb-1">
        <AccordionTrigger className="text-xl">Family Tree</AccordionTrigger>
        <AccordionContent>
          <FamilyTree formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="address-information" className="mb-1">
        <AccordionTrigger className="text-xl">Address Information</AccordionTrigger>
        <AccordionContent>
          <AddressInformation formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="umt-details" className="mb-1">
        <AccordionTrigger className="text-xl">UMT Details</AccordionTrigger>
        <AccordionContent>
          <UMTDetails formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="festival-form" className="mb-1">
        <AccordionTrigger className="text-xl">Festival Form</AccordionTrigger>
        <AccordionContent>
          <FestivalForm formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="service-request-details" className="mb-1">
        <AccordionTrigger className="text-xl">Service Request Details</AccordionTrigger>
        <AccordionContent>
          <ServiceRequestDetails formData={formData} setFormData={setFormData} isDisabled={isDisabled} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LeadClientForm;
