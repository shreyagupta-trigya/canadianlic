import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/login/sign-up.vue";
import Signin from "../views/login/sign-in.vue";
import user from "../views/users/User.vue";
import UserList from "../views/users/UserList.vue";
import CompanySetting from "../views/setting/CompanySetting.vue";
import OfferingsForm from "../views/Offerings/offeringForm.vue";
import OfferingList from "../views/Offerings/offeringList.vue";
import OfferingDetailsView from "../views/Offerings/offeringDetailsView.vue";
import AddRefferal from "../views/referrals/AddRefferal.vue";
import RefferalList from "../views/referrals/RefferalList.vue";
import ContactForm from '../views/contact/ContactForm';
import ContactList from "../views/contact/ContactList.vue";
import AdvisorList from '../views/advisor/AdvisorsList.vue'
import Advisor from '../views/advisor/Advisor.vue'
import Canvas from "../views/advisor/Canvas.vue"
import OtpVarification from "../views/login/OtpVarification.vue";
import resetUserPassword from "../views/login/resetUserPassword.vue";
import ContactViews from "../views/contact/ContactViews.vue";
import Ticket from "../views/Tickets/Ticket.vue"
import InsurancePartnerList from "../views/InsurancePartner/InsurancePartnerList.vue";
import InsuranceForm from "../views/InsurancePartner/InsuranceForm.vue";
import ApprovedReferral from "../views/referrals/ApprovedReferral.vue";
import LocationList from "../views/Locations/LocationList.vue";
import Location from "../views/Locations/Locations.vue";
import Policyform from "../views/Policies/Policy/Policyform.vue";
import Policylist from "../views/Policies/Policy/Policylist.vue";
import PolicyDetailsView from "../views/Policies/Policy/PolicyDetailsview.vue";
import investmentForm from "../views/Policies/investment/investmentForm.vue";
import InvestmentDetailView from "../views/Policies/investment/InvestmentDetailView.vue";

import contactViewNew from "../views/contact/contactViewNew.vue";
import PartnerDetailsView from "../views/InsurancePartner/PartnerDetailsView.vue";
import RefferalsDetailview from "../views/referrals/RefferalsDetailview.vue";
import LocationsDetailView from "../views/Locations/LocationsDetailView.vue";
import UserProfile from "../views/users/UserProfile";
import UserRole from "../views/users/UserRole.vue";
import UserRoleList from "../views/users/UserRoleList.vue";
import userPermission from "../views/users/userPermission.vue";
import LeadsList from "../views/leads/LeadsList.vue";
import LeadForm from "../views/leads/LeadForm.vue";
import LeadsDetails from "../views/leads/LeadsDetailView.vue";
import DealsList from "../views/deals/DealsList.vue";
import DealsForm from "../views/deals/DealsForm.vue";
import DealsDetails from "../views/deals/DealsDetails.vue";
import VendorList from "../views/vendors/VendorList.vue";
import VendorForm from "../views/vendors/VendorForm.vue";
import VendorDetails from "../views/vendors/VendorDetails.vue";
import CredentialForm from "../views/advisorCredentials/CredentialForm.vue";
import CredentialsDetails from "../views/advisorCredentials/CredentialsDetails.vue";
import CredentialsList from "../views/advisorCredentials/CredentialsList.vue";
import PartnersContactsdetails from "../views/partnerContacts/PartnersContactsdetails.vue";
import PartnersContactsList from "../views/partnerContacts/PartnersContactsList.vue";
import PartnerContactForm from "../views/partnerContacts/PartnerContactForm.vue";
import Setting from "../views/setting/Setting.vue";
import PersonalSettings from "../views/setting/PersonalSetting.vue";
import LeadAdvisorForm from "../views/leads/leadAdvisorForm/LeadAdvisorForm.vue";
import LifeCriticalInsuranceForm from "../views/deals/LifeCriticalInsurance/LifeCriticalInsuranceForm.vue";
import RrspForm from "../views/deals/Rrsp/RrspForm.vue";
import SuperVisaInsuranceForm from "../views/deals/superVisa/SuperVisaInsuranceForm.vue";
import RefReg from "../views/referrals/RefReg.vue";
import sms from "../views/utils/SMS.vue"
import WhatsApp from "../views/utils/Whatsapp.vue"
// UAT File Paths
import demo from "../views/demo/demo.vue";
// UAT File Paths

import LeadConvertDeal from "../views/leads/LeadConvertDeal.vue";
import ReligousList from "../views/religions/ReligousList.vue";
import ReligousForm from "../views/religions/ReligousForm.vue";
import RPABot from "../views/bot/RPABot.vue";
import RPABotForm from "../views/bot/RPABotForm.vue";

const routes = [
  {
    path: "/sms",
    component: sms, 
    name:'SMS',
  },
  {
    path: "/whatsapp",
    component: WhatsApp, 
    name:'WhatsApp',
  },
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/personal-setting",
    component: PersonalSettings,
    name: 'personal Settings',
    props: true
  },
  {
    path: "/setting",
    component: Setting,
    name: 'Settings',
    props: true
  },
  {
    path: "/partner-contact-form",
    component: PartnerContactForm,
    name: 'Partner Details View',
    props: true
  },
  {
    path: "/partners-contacts-details",
    component: PartnersContactsdetails,
    name: 'Partner Contacts detail',
    props: true
  },
  {
    path: "/partners-contacts-list",
    component: PartnersContactsList,
    name: 'Contacts List',
    props: true
  },
  {
    path: "/credential-form",
    component: CredentialForm,
    name: 'Avisor Credential Form',
    props: true
  },
  {
    path: "/credentials-details",
    component: CredentialsDetails,
    name: 'Advisor Credential Details',
    props: true
  },
  {
    path: "/credential-list",
    component: CredentialsList,
    name: 'Credentials List',
    props: true
  },
  {
    path: "/Vendor-datails",
    component: VendorDetails,
    name: 'Vendor Details',
    props: true
  },
  {
    path: "/vendors-form",
    component: VendorForm,
    name: 'Vendor Form',
    props: true
  },
  {
    path: "/Vendors-list",
    component: VendorList,
    name: 'Vendors List',
    props: true
  },
  {
    path: "/deals-datails/:id?",
    component: DealsDetails,
    name: 'Deal Details',
    props: true
  },
  {
    path: "/life-insurance/:id?",
    component: LifeCriticalInsuranceForm,
    name: 'Life / Critical Insurance',
    props: true
  },
  {
    path: "/Rrsp-form/:id?",
    component: RrspForm,
    name: 'RRSP/RESP/TFSA',
    props: true
  },
  {
    path: "/Supervisa-form/:id?",
    component: SuperVisaInsuranceForm,
    name: 'Supervisa / Visitor Insurance Form',
    props: true
  },
  {
    path: "/deals-form/:id?",
    component: DealsForm,
    name: 'Deal Form',
    props: true
  },
  {
    path: "/deals-list",
    component: DealsList,
    name: 'Deals List',
    props: true
  },
  {
    path: "/leads-details/:id?",
    component: LeadsDetails,
    name: 'Lead Details',
    props: true
  },
  {
    path: "/leads-form/:id?",
    component: LeadForm,
    name: 'Lead Form',
    props: true
  },
  {
    path: "/leads-advisor-form/:id?",
    component: LeadAdvisorForm,
    name: 'Lead Advisor Form',
    props: true
  },
  {
  path: "/leads-list/:type",
  name: "Leads",
  component: LeadsList,
  props: true // this will pass 'type' as prop
},


  {
    path: "/lead-convert-deal/:id?",
    component: LeadConvertDeal,
    name: 'Leads to Deal',
    props: true
  },
  
  {
    path: "/investmentform/:id?",
    component: investmentForm,
    name: 'New Investment',
    props: true
  },
  {
    path: "/investment-details/:id?",
    component: InvestmentDetailView,
    props: true
  },

  {
    path: "/UserProfile/:id?",
    component: UserProfile,
    name: 'User Profile',
    props: true
  },
  {
    path: "/offering-details/:id?",
    component: OfferingDetailsView,
    name: 'Offering Details',
    props: true
  },
  {
    path: "/policies-details/:id?",
    component: PolicyDetailsView,
    name: 'Policy',
    props: true
  },
  {
    path: "/Locationsdetailsview/:id?",
    component: LocationsDetailView,
    name: 'Location details',
    props: true
  },
  {
    path: "/Refferalsdetailsview",
    component: RefferalsDetailview,
    name: 'Refferals',
    props: true
  },
  {
    path: "/Partnerdetailsview/:id?",
    component: PartnerDetailsView,
    name: 'Partner',
    props: true
  },
  {
    path: "/policyformins/:id?",
    component: Policyform,
    name: "New Policy",
    props: true
  },
  {
    path: "/policylistins",
    component: Policylist,
    name: "Policies",
    props: true
  },

  {
    path: "/insurancepartnerlist",
    component: InsurancePartnerList,
    name: 'Partners',
    props: true
  },
  {
    path: "/insurancepartnerform/:id?",
    component: InsuranceForm,
    name: 'Insurance',
    props: true
  },
  {
    path: "/locationlist",
    component: LocationList,
    name: "Locations",
    props: true
  },
  {
    path: "/religionslist",
    component: ReligousList,
    name: "Religions",
    props: true
  },
  {
    path: "/religionsform",
    component: ReligousForm,
    name: "Create Religion",
    props: true
  },
  {
    path: "/locationform/:id?",
    component: Location,
    name: 'Location',
    props: true
  },
  {
    path: "/contactview-new/:id?",
    name: "Contact DEMO",
    component: contactViewNew,
    props: true,
  },
  {
    path: "/contactview/:id?",
    name: "Contact Details",
    component: ContactViews,
    props: true,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/contact/:id?",
    name: "Contact",
    component: ContactForm,
    props: true
  },
  {
    path: "/contactlist",
    name: "Contacts",
    component: ContactList,
    props: true

  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/Refferalsdetailsview/:id?",
    component: RefferalsDetailview,
    name: 'Refferal Information',
    props: true
  },
  {
    path: "/refferal/:id?",
    name: "Refferal",
    component: AddRefferal,
    props: true,
  },
  {
    path: "/ref-reg",
    component: RefReg,
    name: 'Refferal Receivable',
    props: true
  },
  {
    path: "/Refferalsdetailsview",
    component: RefferalsDetailview,
    props: true
  },
  {
    path: "/refferallist",
    name: "Referrals",
    component: RefferalList,
  },
  {
    path: "/userslist",
    name: "Users",
    component: UserList,
    props: true
  },
    {
    path: "/companySetting",
    name: "Company Settings",
    component: CompanySetting,
    props: true
  },
    {
    path: "/rpabot",
    name: "RPA Bot",
    component: RPABot,
    props: true
  },
    {
    path: "/rpabotform",
    name: "New RPA Bot",
    component: RPABotForm,
    props: true
  },
  {
    path: "/offering-list",
    name: "Offerings",
    component: OfferingList,
    props: true,
  },
  {
    path: "/products/:id?",
    name: "Offering",
    component: OfferingsForm,
    props: true
  },
  {
    path: "/verify-otp",
    name: "User Verification",
    component: OtpVarification,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    component: resetUserPassword,
  },
  {
    path: "/advisorslist",
    component: AdvisorList,
    name: 'Advisors'
  },
  {
    path: "/advisor/:id?",
    component: Advisor,
    name: 'Advisor Form',
    props: true

  },
  {
    path: "/detailView/:id?",
    name: 'Advisor',
    component: Canvas,
    props: true
  },
  {
    path: "/user/:id?",
    name: "User",
    component: user,
    props: true,
  },
  {
    path: "/ticket",
    name: "Ticket",
    component: Ticket,
    props: true,
  },
  {
    path: "/ApprovedReferral/:id?",
    name: "ApprovedReferral",
    component: ApprovedReferral,
    props: true,
  },
  {
    path: "/user-role/:id?",
    name: "User Role",
    component: UserRole,
    props: true,
  },
  {
    path: "/users-role-list",
    name: "UserRole",
    component: UserRoleList,
    pops: true,
  },
  {
    path: "/users-permission",
    name: "Roles",
    component: userPermission,
    pops: true,
  },
  {
    path: "/demo/:id?",
    name: "Demo",
    component: demo,
    pops: true
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
