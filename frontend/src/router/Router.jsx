// router/Router.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layout/MainLayout";
import CRMLayout from "@/features/crm/layouts/CRMLayout";
import DealsLayout from "@/features/crm/pages/deals/layout/DealsLayout";
import LeadLayout from "@/features/crm/pages/leads/layout/LeadLayout";
import AccountLayout from "@/features/crm/pages/accounts/layout/AccountLayout";
import CustomerServiceLayout from "@/features/crm/pages/customerService/layout/CustomerServiceLayout";
import AdvisorsListNew from "@/features/crm/pages/advisor/AdvisorsListNew";
import LeadAdvisorForm from "@/features/crm/pages/advisor/LeadAdvisorForm";
import AdvisorDetailsView from "@/features/crm/pages/advisor/AdvisorDetailsView";
import ActivityMasterLayout from "@/features/activityMaster/layouts/ActivityMasterLayout";
import ActivityMasterList from "@/features/activityMaster/pages/activityMasters/layout/ActivityMasterList";
import DeliveryChallanActivityForm from "@/features/crm/pages/deliveryChallan/relatedList/deliveryChallanActivity/DeliveryChallanActivityForm";
import QuoteActivityForm from "@/features/crm/pages/quotes/relatedList/quoteActivity/QuoteActivityForm";
import DealActivityForm from "@/features/crm/pages/deals/relatedList/dealActivity/DealActivityForm";
import FinanceLayout from "@/features/finance/layouts/FinanceLayout";
import InventoryLayout from "@/features/finance/pages/inventory/layouts/inventoryLayout";
import SalesLayout from "@/features/finance/pages/sales/layout/SalesLayout";
import BillsLayout from "@/features/finance/pages/bills/layouts/BillsLayout";
import PurchaseLayout from "@/features/finance/pages/purchase/layout/PurchaseLayout";
import InvoiceLayout from "@/features/finance/pages/invoice/layout/InvoiceLayout";
import ShipmentLayout from "@/features/finance/pages/sales/shipments/Layout/ShipmentLayout";
import PackageLayout from "@/features/Packages/Layout/PackageLayout";
import LeadActivityForm from "@/features/crm/pages/leads/relatedList/leadActivity/LeadActivityForm";
import PurchaseRecieveLayout from "@/features/finance/pages/purchase/purchaseReceive/layout/PurchaseRecieveLayout";
import VendorLayout from "@/features/finance/pages/vendors/layouts/VendorLayout";
import RecurringBillsLayout from "@/features/finance/pages/bills/pages/recurringbills/layout/RecurringBillsLayout";
const Home = lazy(() => import("@/features/home/pages/Home"));
const LoginPage = lazy(() => import("@/features/login/LoginPage"));
const Leads = lazy(() => import("@/features/crm/pages/leads/LeadsListView"));
const LeadsForm = lazy(() => import("@/features/crm/pages/leads/LeadsForm"));
const LeadsDetailsView = lazy(() =>
  import("@/features/crm/pages/leads/LeadsDetailsView")
);
import ShipmentListView from "@/features/finance/pages/sales/shipments/ShipmentListView";
import ShipmentForm from "@/features/finance/pages/sales/shipments/ShipmentForm";
import ShipmentDetail from "@/features/finance/pages/sales/shipments/ShipmentDetail";

//Contacts

// ACCOUNT MODULE
const Accounts = lazy(() =>
  import("@/features/crm/pages/accounts/AccountsListView")
);
const AccountsForm = lazy(() =>
  import("@/features/crm/pages/accounts/AccountForm")
);
const AccountsDetailsView = lazy(() =>
  import("@/features/crm/pages/accounts/AccountsDetailsView")
);

//purchase recieve
const PurchaseReciveList = lazy(() =>
  import("@/features/finance/pages/purchase/purchaseReceive/PurchaseReciveList")
);
const PurchaseRecieveForm = lazy(() =>
  import(
    "@/features/finance/pages/purchase/purchaseReceive/PurchaseRecieveForm"
  )
);
const PurchaseReceiveDetail = lazy(() =>
  import(
    "@/features/finance/pages/purchase/purchaseReceive/PurchaseReceiveDetail"
  )
);
//VENDORS
const VendorsList = lazy(() =>
  import("@/features/finance/pages/vendors/VendorsList")
);

const VendorForm = lazy(() =>
  import("@/features/finance/pages/vendors/VendorForm")
);
//DEAL MODULE
const Deals = lazy(() => import("@/features/crm/pages/deals/DealsListView"));
const DealsForm = lazy(() => import("@/features/crm/pages/deals/DealsForm"));
const DealsDetailsView = lazy(() =>
  import("@/features/crm/pages/deals/DealsDetailsView")
);

// SALES MODULE
const Sales = lazy(() =>
  import("@/features/finance/pages/sales/sales order/SalesOrder")
);

const SalesForm = lazy(() =>
  import("@/features/finance/pages/sales/sales order/SalesForm")
);
const SalesDetailView = lazy(() =>
  import("@/features/finance/pages/sales/sales order/SalesDetailView")
);

//BILLS MODULE
const BillsList = lazy(() =>
  import("@/features/finance/pages/bills/pages/BillsList")
);
const BillsForm = lazy(() =>
  import("@/features/finance/pages/bills/pages/BillsForm")
);
const BillDetail = lazy(() =>
  import("@/features/finance/pages/bills/BillsDetail")
);

// INVOICE MODULE
const InvoiceListView = lazy(() =>
  import("@/features/finance/pages/invoice/invoices/InvoiceListView")
);
const InvoiceForm = lazy(() =>
  import("@/features/finance/pages/invoice/invoices/InvoiceForm")
);
const InvoiceDetailView = lazy(() =>
  import("@/features/finance/pages/invoice/invoices/InvoiceDetailView")
);

//Item MODULE
const ItemList = lazy(() =>
  import("@/features/finance/pages/inventory/pages/ItemList")
);
const ItemsForm = lazy(() =>
  import("@/features/finance/pages/inventory/pages/ItemsForm")
);
//PURCHAGE MODULE
const PurchaseOrder = lazy(() =>
  import("@/features/finance/pages/purchase/PurchaseOrder")
);
const PurchaseDetailView = lazy(() =>
  import("@/features/finance/pages/purchase/PurchaseDetailView")
);
const PurchaseForm = lazy(() =>
  import("@/features/finance/pages/purchase/PurchaseForm")
);

// Package Module

import PackageView from "@/features/Packages/Pages/PackageView";
import PackageForm from "@/features/Packages/Pages/PackageForm";
import SalesReturn from "@/features/finance/pages/sales/sales returns/SalesReturn";
import SalesReturnDetail from "@/features/finance/pages/sales/sales returns/SalesReturnDetail";
import ProjectsTrackerLayout from "@/features/projectsTracker/layout/ProjectsTrackerLayout";
import PortalLayout from "@/layout/PortalLayout";
import PortalPermissionRoute from "@/components/permissionRoutes/PortalPermissionRoute";
import LoginProtectedRoute from "@/components/LoginProtectedRoute";
import NotFound from "@/pages/NotFound";
import SurtaxLayout from "@/features/portal/surtaxModule/layout/SurtaxLayout";
import ManageUsersLayout from "@/features/portal/manageUsers/layout/manageUsersLayout";
import OrderEmail from "@/features/finance/pages/purchase/OrderEmail";
import PackageDetailView from "@/features/Packages/Pages/PackageDetailView";
import SalesOrderEmail from "@/features/finance/pages/sales/sales order/SalesOrderEmail";
import ShipmentEmail from "@/features/finance/pages/sales/shipments/ShipmentEmail";
import ShipmentsTrackerLayout from "@/features/Packages/shipmentsTracker/Layout/ShipmentsTrackerLayout";
import ShipmentsTrackerList from "@/features/Packages/shipmentsTracker/Pages/ShipmentsTrackerList";
import ShipmentsTrackerForm from "@/features/Packages/shipmentsTracker/Pages/ShipmentTrackerForm";
import ShipmentsTrackerEmail from "@/features/Packages/shipmentsTracker/Pages/ShipmentsTrackerEmail";
import CreditNotes from "@/features/finance/pages/invoice/credit notes/CreditNotes";
import CreditLayout from "@/features/finance/pages/invoice/credit notes/Layout/CreditLayout";
import CreditForm from "@/features/finance/pages/invoice/credit notes/CreditForm";
import CreditDetail from "@/features/finance/pages/invoice/credit notes/CreditDetail";
import CreditNoteMail from "@/features/finance/pages/invoice/credit notes/CreditNoteMail";
import ShipmentsTrackerDetail from "@/features/Packages/shipmentsTracker/Pages/ShipmentsTrackerDetail";
import ItemListDetail from "@/features/finance/pages/inventory/pages/ItemListDetail";
import MaterialRequisitionLayout from "@/features/finance/pages/Material Requisition/Layout/materialRequisitionLayout";
import MaterialRequisitionList from "@/features/finance/pages/Material Requisition/Pages/materialRequisitionLIst";
import MaterialRequisitionForm from "@/features/finance/pages/Material Requisition/Pages/MaterialRequisitionForm";
import MaterialRequisitionDetailView from "@/features/finance/pages/Material Requisition/Pages/MaterialRequisitionDetailView";
import QuoteLayout from "@/features/crm/pages/quotes/Layout/QuoteLayout";
import QuoteForm from "@/features/crm/pages/quotes/QuoteForm";
import QuoteDetail from "@/features/crm/pages/quotes/QuoteDetail";
import QuoteList from "@/features/crm/pages/quotes/QuoteList";
import PurchaseOrderDetailView from "@/features/finance/pages/purchase/PurchaseDetailView";
import OrganizationLayout from "@/features/portal/organization/layout/OrganizationLayout";
import Profile from "@/features/portal/organization/pages/OrganizationProfile";
import OrganizationProfile from "@/features/portal/organization/pages/OrganizationProfile";
// import unitLayout from "@/features/portal/Masters/Unit/layout/unitLayout";
import UnitLayout from "@/features/portal/Masters/Unit/layout/unitLayout";
import UnitList from "@/features/portal/Masters/Unit/pages/UnitList";
import UnitForm from "@/features/portal/Masters/Unit/pages/UnitForm";
import BrandsLayout from "@/features/portal/Masters/Brands/layout/BrandsLayout";
import BrandsList from "@/features/portal/Masters/Brands/pages/BrandsList";
import BrandsForm from "@/features/portal/Masters/Brands/pages/BrandsForm";
import QuoteEmail from "@/features/crm/pages/quotes/QuoteEmail";
import StockTransferLayout from "@/features/finance/pages/inventory/stockTransfer/layout/StockTransferLayout";
import StockTransferList from "@/features/finance/pages/inventory/stockTransfer/pages/StockTransferList";
import WarehouseLayouts from "@/features/finance/pages/inventory/warehouse/layouts/WarehouseLayouts";
import WarehouseList from "@/features/finance/pages/inventory/warehouse/pages/WarehouseList";
import WarehouseForm from "@/features/finance/pages/inventory/warehouse/pages/WarehouseForm";
import StockTransferForm from "@/features/finance/pages/inventory/stockTransfer/pages/StockTransferForm";
import MaterialRequistionEmail from "@/features/finance/pages/Material Requisition/Pages/MaterialRequistionEmail";
import StockTransferDetail from "@/features/finance/pages/inventory/stockTransfer/pages/StockTransferDetail";
import DeliveryChallan from "@/features/crm/pages/deliveryChallan/layout/DeliveryChallan";
import DeliveryChallanList from "@/features/crm/pages/deliveryChallan/DeliveryChallanList";
import DeliveryChallanForm from "@/features/crm/pages/deliveryChallan/DeliveryChallanForm";
import DeliveryChallanDetail from "@/features/crm/pages/deliveryChallan/sample/DeliveryChallanDetail";
import PurchaseOrderForm from "@/features/finance/pages/purchase/PurchaseOrderForm";
import AccountActivityForm from "@/features/crm/pages/accounts/relatedList/accountActivity/AccountActivityForm";
import CategoryLayout from "@/features/portal/Masters/Category/Layout/CategoryLayout";
import CategoryList from "@/features/portal/Masters/Category/pages/CategoryList";
import CategoryForm from "@/features/portal/Masters/Category/pages/CategoryForm";
import CurrencyLayout from "@/features/portal/Masters/Currency/Layout/CurrencyLayout";
import CurrencyList from "@/features/portal/Masters/Currency/pages/CurrencyList";
import CurrencyForm from "@/features/portal/Masters/Currency/pages/CurrencyForm";
import DeliveryTermLayout from "@/features/portal/Masters/Delivery term/Layout/DeliveryTermLayout";
import DeliveryTermList from "@/features/portal/Masters/Delivery term/pages/DeliveryTermList";
import DeliveryTermForm from "@/features/portal/Masters/Delivery term/pages/DeliveryTermForm";
import UsersForm from "@/features/portal/manageUsers/users/pages/UsersForm";
import InstantPo from "@/features/finance/pages/purchase/InstantPo";
import JobWorkLayout from "@/features/jobWork/layouts/JobWorkLayout";
import { JobWorkList } from "@/features/jobWork/pages/JobWorkList";
import JobWorkForm from "@/features/jobWork/pages/JobWorkForm";
import JobWorkDetail from "@/features/jobWork/pages/JobWorkDetail";
import UsersDetail from "@/features/portal/manageUsers/users/pages/UsersDetail";
import CustomerServiceForm from "@/features/crm/pages/customerService/CustomerServiceForm";
import ContactsListView from "@/features/crm/pages/contacts/contacts/ContactsListView";
import ContactClientForm from "@/features/crm/pages/contacts/contacts/contactForm/ContactClientForm";
import ContactDetailView from "@/features/crm/pages/contacts/contacts/ContactDetailView";
import ContactLayout from "@/features/crm/pages/contacts/contacts/layout/ContactLayout";
import ContactActivityForm from "@/features/crm/pages/contacts/contacts/relatedList/contactActivity/ContactActivityForm";

// import PurchaseDetailView from "@/features/finance/pages/purchase/PurchaseDetailView";

//Recurring
const RecurringBillsList = lazy(() =>
  import(
    "@/features/finance/pages/bills/pages/recurringbills/pages/RecurringBillsList"
  )
);
const RecurringBillForm = lazy(() =>
  import(
    "@/features/finance/pages/bills/pages/recurringbills/pages/RecurringBillForm"
  )
);
//Project Tracker
const ProjectsTracker = lazy(() =>
  import("@/features/projectsTracker/pages/ProjectsTracker")
);
const ProjectsTasks = lazy(() =>
  import("@/features/projectsTracker/pages/ProjectTasks")
);
const TaskDetails = lazy(() =>
  import("@/features/projectsTracker/pages/TaskDetails")
);

//Portal
//Dashbaord
const PortalDashboard = lazy(() =>
  import("@/features/portal/dashboard/PortalDashboard")
);

//Surtax
const SurtaxListView = lazy(() =>
  import("@/features/portal/surtaxModule/pages/SurtaxListView")
);
const SurtaxForm = lazy(() =>
  import("@/features/portal/surtaxModule/pages/SurtaxForm")
);

//Manage Users
const UsersListView = lazy(() =>
  import("@/features/portal/manageUsers/users/pages/UsersListView")
);
const RolesListView = lazy(() =>
  import("@/features/portal/manageUsers/roles/pages/RolesListView")
);
const RolesForm = lazy(() =>
  import("@/features/portal/manageUsers/roles/pages/RolesForm")
);
import OfferingLayout from "@/features/crm/pages/offerings/layout/OfferingLayout";
import PartnerContactLayout from "@/features/crm/pages/PartnerContacts/layout/PartnerContactLayout";
import PartnerContactList from "@/features/crm/pages/PartnerContacts/PartnerContactList";
import PartnerContactForm from "@/features/crm/pages/PartnerContacts/PartnerContactForm";
import PartnerContactDetails from "@/features/crm/pages/PartnerContacts/PartnerContactDetails";

// OFFERINGS MODULE
const OfferingForm = lazy(() =>
  import("@/features/crm/pages/offerings/OfferingForm")
);
const OfferingListView = lazy(() =>
  import("@/features/crm/pages/offerings/OfferingListView")
);
const OfferingDetailsView = lazy(() =>
  import("@/features/crm/pages/offerings/OfferingDetailsView")
);

// CUSTOMER SERVICE MODULE
const CustomerServiceListView = lazy(() =>
  import("@/features/crm/pages/customerService/CustomerServiceListView")
);
const CustomerServiceDetailView = lazy(() =>
  import("@/features/crm/pages/customerService/CustomerServiceDetailView")
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* <Route
          path="/sign-in"
          element={
            <LoginProtectedRoute>
              <LoginPage />
             </LoginProtectedRoute>
          }
        /> */}
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <MainLayout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="crm" element={<CRMLayout />}>
            <Route index element={<Navigate to="leads" replace />} />
            <Route path="leads" element={<LeadLayout />}>
              <Route path="" element={<Leads />} />
              <Route path="create" element={<LeadsForm />} />
              <Route path="details/:id" element={<LeadsDetailsView />} />
              <Route path="update" element={<LeadsForm />} />
              <Route path="activity" element={<LeadActivityForm />} />
            </Route>
            {/* <Route path="contacts" element={<Contacts />} /> */}
            <Route path="contacts" element={<ContactLayout />}>
              <Route path="" element={<ContactsListView />} />
              <Route path="create" element={<ContactClientForm />} />
              {/* <Route path="update" element={<ContactsForm />} /> */}
              <Route path="details" element={<ContactDetailView />} />
              <Route path=" activity" element={<ContactActivityForm />} />
            </Route>
            {/* <Route path="accounts" element={<Accounts />} /> */}
            <Route path="accounts" element={<AccountLayout />}>
              <Route path="" element={<Accounts />} />
              <Route path="create" element={<AccountsForm />} />
              <Route path="update/:id" element={<AccountsForm />} />
              <Route path="details/:id" element={<AccountsDetailsView />} />
              <Route path="activity" element={<AccountActivityForm />} />
            </Route>
            <Route path="deals" element={<DealsLayout />}>
              <Route path="" element={<Deals />} />
              <Route path="create" element={<DealsForm />} />
              <Route path="update" element={<DealsForm />} />
              <Route path="details/:id" element={<DealsDetailsView />} />
              <Route path="activity" element={<DealActivityForm />} />
            </Route>
            <Route path="quotes" element={<QuoteLayout />}>
              <Route path="" element={<QuoteList />} />
              <Route path="create" element={<QuoteForm />} />
              <Route path="detail" element={<QuoteDetail />} />
              <Route path="email" element={<QuoteEmail />} />
              <Route path="details/:id" element={<DealsDetailsView />} />
              <Route path="activity" element={<QuoteActivityForm />} />
            </Route>
            <Route path="deliveryChallan" element={<DeliveryChallan />}>
              <Route path="" element={<DeliveryChallanList />} />
              <Route path="create" element={<DeliveryChallanForm />} />
              <Route path="detail" element={<DeliveryChallanDetail />} />
              <Route
                path="activity"
                element={<DeliveryChallanActivityForm />}
              />
            </Route>
            <Route path="offerings" element={<OfferingLayout />}>
              <Route path="" element={<OfferingListView />} />
              <Route path="create" element={<OfferingForm />} />
              <Route path="details/:id" element={<OfferingDetailsView />} />
              <Route path="update/:id" element={<OfferingForm />} />
            </Route>
            <Route path="partner-contact" element={<PartnerContactLayout />}>
              <Route path="" element={<PartnerContactList />} />
              <Route path="create" element={<PartnerContactForm />} />
              <Route path="details/:id" element={<PartnerContactDetails />} />
            </Route>
            <Route path="advisor">
              <Route path="" element={<AdvisorsListNew />} />
              <Route path="advisor-leads-form" element={<LeadAdvisorForm />} />
              <Route path="details/:id" element={<AdvisorDetailsView />} />
            </Route>
            <Route path="customerService" element={<CustomerServiceLayout />}>
              <Route path="" element={<CustomerServiceListView />} />
              <Route path="create" element={<CustomerServiceForm />} />
              <Route
                path="details/:id"
                element={<CustomerServiceDetailView />}
              />
            </Route>
            <Route path="list" element={<ActivityMasterList />} />
          </Route>

          <Route path="jobWork" element={<JobWorkLayout />}>
            <Route path="jobWorkList" element={<JobWorkList />} />
            <Route path="create" element={<JobWorkForm />} />
            <Route path="detail" element={<JobWorkDetail />} />
          </Route>

          {/* <Route path="activity" element={<ActivityMasterLayout />}> */}
          {/* <Route index element={<Navigate to="activityMaster" replace />} /> */}
          {/* <Route path="activityMaster" element={<ActivityMaster/>}> */}

          {/* <Route path="activityForm" element={<AllActivityForm />} /> */}
          {/* </Route> */}
          {/* </Route> */}
          <Route path="inventory" element={<InventoryLayout />}>
            <Route path="items" element={<ItemList />} />
            <Route path="create" element={<ItemsForm />} />
            <Route path="detail/:id" element={<ItemListDetail />} />
            <Route path="stocks" element={<StockTransferLayout />}>
              <Route path="" element={<StockTransferList />} />
              <Route path="create" element={<StockTransferForm />} />
              <Route path="detail" element={<StockTransferDetail />} />
            </Route>
            <Route path="warehouse" element={<WarehouseLayouts />}>
              <Route path="warehouseList" element={<WarehouseList />} />
              <Route path="create" element={<WarehouseForm />} />
            </Route>
          </Route>
          <Route path="" element={<FinanceLayout />}>
            <Route path="vendors" element={<VendorLayout />}>
              <Route path="vendors-list" element={<VendorsList />} />
              <Route path="create" element={<VendorForm />} />
            </Route>
            <Route
              path="material-requisition"
              element={<MaterialRequisitionLayout />}
            >
              <Route path="list" element={<MaterialRequisitionList />} />
              <Route path="form" element={<MaterialRequisitionForm />} />
              <Route path="email" element={<MaterialRequistionEmail />} />
              <Route
                path="detail"
                element={<MaterialRequisitionDetailView />}
              />
            </Route>
            <Route path="purchase" element={<PurchaseLayout />}>
              <Route path="purchase-order" element={<PurchaseOrder />} />
              <Route path="order-email" element={<OrderEmail />} />
              <Route path="instant-po" element={<InstantPo />} />

              <Route
                path="purchase-detail"
                element={<PurchaseOrderDetailView />}
              />
              <Route path="create" element={<PurchaseOrderForm />} />
              <Route path="edit" element={<PurchaseForm />} />
            </Route>
            <Route path="purchase-recieve" element={<PurchaseRecieveLayout />}>
              <Route
                path="purchase-recieve-list"
                element={<PurchaseReciveList />}
              />
              <Route
                path="purchase-receive-detail"
                element={<PurchaseReceiveDetail />}
              />
              <Route path="create" element={<PurchaseRecieveForm />} />
            </Route>
            <Route path="sales" element={<SalesLayout />}>
              <Route path="sales-order" element={<Sales />} />
              <Route
                path="sales-order-detail/:id"
                element={<SalesDetailView />}
              />
              <Route path="sales-order-email" element={<SalesOrderEmail />} />
              <Route path="create-sale" element={<SalesForm />} />

              <Route path="shipments" element={<ShipmentLayout />}>
                <Route path="shipment-list" element={<ShipmentListView />} />
                <Route path="detail" element={<ShipmentDetail />} />
                <Route path="email" element={<ShipmentEmail />} />
                <Route path="create" element={<ShipmentForm />} />
                <Route path="update" element={<ShipmentForm />} />
              </Route>

              <Route path="sales-return" element={<ShipmentLayout />}>
                <Route path="" element={<SalesReturn />} />
                <Route path="detail" element={<SalesReturnDetail />} />
              </Route>
            </Route>
            <Route path="invoice" element={<InvoiceLayout />}>
              <Route path="invoices" element={<InvoiceListView />} />
              <Route path="detail/:id" element={<InvoiceDetailView />} />
              <Route path="create" element={<InvoiceForm />} />
            </Route>
            <Route path="credit" element={<CreditLayout />}>
              <Route path="credit-note" element={<CreditNotes />} />
              <Route path="credit-note-form" element={<CreditForm />} />
              <Route path="credit-note-detail" element={<CreditDetail />} />
              <Route path="mail" element={<CreditNoteMail />} />
            </Route>

            <Route path="bills" element={<BillsLayout />}>
              <Route path="bills-list" element={<BillsList />} />
              <Route path="bills-detail" element={<BillDetail />} />
              <Route path="bills-form" element={<BillsForm />} />
            </Route>
            <Route path="recurring-bills" element={<RecurringBillsLayout />}>
              <Route path="recurring-list" element={<RecurringBillsList />} />
              <Route path="recurring-form" element={<RecurringBillForm />} />
            </Route>
          </Route>
          <Route path="Shipments-tracker" element={<ShipmentLayout />}></Route>
          <Route path="packages" element={<PackageLayout />}>
            <Route path="package-list" element={<PackageView />} />
            <Route path="package-detail/:id" element={<PackageDetailView />} />
            <Route path="create" element={<PackageForm />} />
          </Route>
          <Route path="projects-tracker" element={<ProjectsTrackerLayout />}>
            <Route path="" element={<ProjectsTracker />} />
            <Route path="tasks/:id" element={<ProjectsTasks />} />
            <Route path="tasks/:id/:id" element={<TaskDetails />} />
          </Route>
          <Route path="shipment-tracker" element={<ShipmentsTrackerLayout />}>
            <Route
              path="shipment-tracker-list"
              element={<ShipmentsTrackerList />}
            />

            <Route
              path="shipment-tracker-form"
              element={<ShipmentsTrackerForm />}
            />
            <Route
              path="shipment-tracker-detail"
              element={<ShipmentsTrackerDetail />}
            />
            <Route
              path="shipment-tracker-mail"
              element={<ShipmentsTrackerEmail />}
            />
          </Route>
        </Route>
        {/* Admin Portal */}
        <Route
          path="/portal"
          element={
            <ProtectedRoute>
              {/* <PortalPermissionRoute requiredPermission="access_admin_portal"> */}
              <PortalLayout />
              {/* </PortalPermissionRoute> */}
            </ProtectedRoute>
          }
        >
          <Route index element={<PortalDashboard />} />
          <Route path="surtax" element={<SurtaxLayout />}>
            <Route path="" element={<SurtaxListView />} />
            <Route path="create" element={<SurtaxForm />} />
          </Route>
          <Route path="manage-users" element={<ManageUsersLayout />}>
            <Route path="" element={<UsersListView />} />
            <Route path="userform" element={<UsersForm />} />
            <Route path="userdetail" element={<UsersDetail />} />
            <Route path="roles" element={<RolesListView />} />
            <Route path="roles/create" element={<RolesForm />} />
            <Route path="roles/update" element={<RolesForm />} />
          </Route>
          <Route path="organization" element={<OrganizationLayout />}>
            <Route path="profile" element={<OrganizationProfile />} />
            <Route path="roles" element={<RolesListView />} />
            <Route path="roles/create" element={<RolesForm />} />
            <Route path="roles/update" element={<RolesForm />} />
          </Route>

          <Route path="unit" element={<UnitLayout />}>
            <Route path="" element={<UnitList />} />
            <Route path="form" element={<UnitForm />} />
          </Route>
          <Route path="brand" element={<BrandsLayout />}>
            <Route path="" element={<BrandsList />} />
            <Route path="form" element={<BrandsForm />} />
          </Route>
          <Route path="currency" element={<CurrencyLayout />}>
            <Route path="" element={<CurrencyList />} />
            <Route path="form" element={<CurrencyForm />} />
          </Route>
          <Route path="category" element={<CategoryLayout />}>
            <Route path="" element={<CategoryList />} />
            <Route path="form" element={<CategoryForm />} />
          </Route>
          <Route path="Deliveryterm" element={<DeliveryTermLayout />}>
            <Route path="" element={<DeliveryTermList />} />
            <Route path="form" element={<DeliveryTermForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
