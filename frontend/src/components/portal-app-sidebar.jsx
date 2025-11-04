import * as React from "react";
import {
  House,
  Handshake,
  MarsStrokeIcon,
  Command,
  AudioWaveform,
  Package,
  Frame,
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

const data = {
  user: {
    name: "Trigya Innovations",
    email: "info@trigya.co",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Ditergent - 0802",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Ad Mixture - 0803",
      logo: AudioWaveform,
      plan: "Business",
    },
    {
      name: "Oil Field - 0804",
      logo: Package,
      plan: "Standard",
    },
    {
      name: "Contrution - 0805",
      logo: Frame,
      plan: "Basic",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/portal",
      icon: House,
    },
    {
      title: "Manage Users",
      url: "/portal/manage-users",
      icon: Handshake,
      isActive: true,
      items: [
        { title: "Users", url: "/portal/manage-users" },
        { title: "Roles", url: "/portal/manage-users/roles" },
      ],
    },
    {
      title: "Organization",
      url: "/portal/organization/profile",
      icon: Handshake,
      isActive: true,
      items: [{ title: "Profile", url: "/portal/organization/profile" }],
    },
    {
      title: "Masters",
      url: "/portal/unit",
      icon: MarsStrokeIcon,
      isActive: true,
      items: [
        {
          title: "Units",
          url: "/portal/unit",
        },
        {
          title: "Brands",
          url: "/portal/brand",
        },
        {
          title: "Currency",
          url: "/portal/currency",
        },
        {
          title: "Category",
          url: "/portal/category",
        },
        {
          title:"Delivery Term",
          url:"/portal/Deliveryterm",
        }
      ],
    },
  ],
};

export function PortalAppSidebar({ ...props }) {
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
