import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  Handshake,
  Package,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";


// Sidebar data
const data = {
  user: {
    name: "Trigya Innovations",
    email: "info@trigya.co",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Canadian LIC",
      logo: Command,
      // plan: "Enterprise",
    },
    // {
    //   name: "Ad Mixture - 0803",
    //   logo: AudioWaveform,
    //   plan: "Business",
    // },
    // {
    //   name: "Oil Field - 0804",
    //   logo: Package,
    //   plan: "Standard",
    // },
    // {
    //   name: "Contrution - 0805",
    //   logo: Frame,
    //   plan: "Basic",
    // },
  ],
  navMain: [
    // {
    //   title: "Home",
    //   url: "/",
    //   icon: House,
    // },
    {
      title: "Sales",
      url: "/crm",
      icon: Handshake,
      isActive: true,
      items: [
        {
          title: "Leads",
          // url: "/crm/leads",
          items: [
            {
              title: "Client",
              url: "/crm/leads",
            },
            {
              title: "Advisor",
              url: "/crm/advisor",
            }
          ],

        },
        
         {
          title: "Deals",
          url: "/crm/deals",
        },
        
        {
          title: "Contacts",
          // url: "/crm/leads",
          items: [
            {
              title: "Client",
              url: "/crm/contacts",
            },
            {
              title: "Advisor",
              url: "/crm/advisor",
            }
          ],

        },
         {
          title: "Customer Service",
          url: "/crm/customerService",
        },
         {
          title: "Policy",
          url: "/crm/policy",
        },
         {
          title: "Offerings",
          url: "/crm/offerings",
        },
        {
          title: "Partner's contact",
          url: "/crm/partner-contact",
        },
    //       {
    //       title: "Accounts",
    //       url: "/crm/accounts",
    //     },
    //     {
    //       title: "Contacts",
    //       url: "/crm/contacts",
    //     },
    //     {
    //       title: "Offerings",
    //       url: "/crm/offerings",
    //     },
      
       
    //     {
    //       title: "Quote",
    //       url: "/crm/quotes",
    //     },
    //     {
    //       title: "Delivery Notes",
    //        url: "/crm/deliveryChallan",
    //     },
    //      {
    //        title: "CRM Tasks",
    //        url:"/crm/list",    
    //        isActive: true,
    // }, 
      ],
    },
    // {
    //   title: "Inventory",
    //   url: "/inventory",
    //   icon: ShoppingCart,

    //   items: [
    //     {
    //       title: "Items",
    //       url: "/inventory/items",
    //     },
    //     {
    //       title: "Stock Transfer",
    //       url: "/inventory/stocks",
    //     },
    //     {
    //       title: "Warehouse",
    //       url: "/inventory/warehouse/warehouseList",
    //     },
    //     // {
    //     //   title: "",
    //     //   url: "/finance/inventory/create",
    //     // },
    //   ],
    // },
    // {
    //   title:"Job Work",
    //   url:"/jobWork/jobWorkList",
    //   icon: BsPersonWorkspace,
    //   isActive: true,
    // },
    // {
    //   title: "Purchases",
    //   icon: BadgeDollarSign,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Vendors",
    //       url: "/vendors/vendors-list",
    //     },
    //     {
    //       title: "Material Requisition (RFQ)",
    //       url: "/material-requisition/list",
    //     },
    //     {
    //       title: "Purchase Orders",
    //       url: "/purchase/purchase-order",
    //     },
    //     {
    //       title: "Purchase Receive",
    //       url: "/purchase-recieve/purchase-recieve-list",
    //     },
    //     {
    //       title: "Bills",
    //       url: "/bills/bills-list",
    //     },

    //     {
    //       title: "Vendor Credits",
    //       url: "/bills/bills-list",
    //     },
    //   ],

    //   // {
    //   //   title: "Invoice",
    //   //   items: [
    //   //     {
    //   //       title: "Invoices",
    //   //       url: "finance/invoice/invoices",
    //   //     },
    //   //     {
    //   //       title: "Credit Notes",
    //   //       url: "/finance/credit/credit-note",
    //   //     },
    //   //     {
    //   //       title: "Payments",
    //   //       url: "#",
    //   //     },
    //   //   ],
    //   // },
    // },
    // {
    //   title: "Production",
    //   icon: Package,
    //   isActive: true,
    //   items: [],
    // },
    //   {
    //     title: "Projects Tracker",
    //     url: "/projects-tracker",
    //     icon: BookOpen,
    //   },
    //   {
    //     title: "Shipments Tracker",
    //     url: "/shipment-tracker/shipment-tracker-list",
    //     icon: Settings2,
    //   },
    // ],
    // projects: [
    //   {
    //     name: "Design Engineering",
    //     url: "#",
    //     icon: Frame,
    //   },
    //   {
    //     name: "Sales & Marketing",
    //     url: "#",
    //     icon: PieChart,
    //   },
    //   {
    //     name: "Travel",
    //     url: "#",
    //     icon: Map,
    //   },
  ],
};

export function AppSidebar({ ...props }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} currentPath={currentPath} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
