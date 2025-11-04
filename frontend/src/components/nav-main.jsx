"use client";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

// Recursive render for subitems
function RenderSidebarItems({ items, level = 1, currentPath }) {
  return items.map((item) => {
    const hasChildren = Array.isArray(item.items) && item.items.length > 0;
    const isActive =
      currentPath === item.url ||
      currentPath?.startsWith(item.url + "/") || // handles nested routes like /crm/deals/create
      (hasChildren &&
        item.items.some(
          (child) =>
            currentPath === child.url ||
            currentPath.startsWith(child.url + "/") || // nested inside child
            (child.items &&
              child.items.some(
                (grandChild) =>
                  currentPath === grandChild.url ||
                  currentPath.startsWith(grandChild.url + "/")
              ))
        ));
    if (hasChildren) {
      return (
        <Collapsible key={item.title} asChild>
          <div className="group/collapsible">
            <SidebarMenuSubItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuSubButton>
                  {item.icon && <item.icon className="mr-2" />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuSubButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <RenderSidebarItems items={item.items} level={level + 1} />
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuSubItem>
          </div>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuSubItem key={item.title}>
        <SidebarMenuSubButton isActive={isActive} asChild>
          <Link to={item.url} className="flex items-center w-full">
            {item.icon && <item.icon className="mr-2" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  });
}

export function NavMain({ items, currentPath }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren =
            Array.isArray(item.items) && item.items.length > 0;

          // Check if current path matches this item or any of its children
          const isActive =
            currentPath === item.url ||
            currentPath.startsWith(item.url + "/") || // handles nested routes like /crm/deals/create
            (hasChildren &&
              item.items.some(
                (child) =>
                  currentPath === child.url ||
                  currentPath.startsWith(child.url + "/") || // nested inside child
                  (child.items &&
                    child.items.some(
                      (grandChild) =>
                        currentPath === grandChild.url ||
                        currentPath.startsWith(grandChild.url + "/")
                    ))
              ));

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <Collapsible
                  defaultOpen={isActive}
                  asChild
                  className="group/collapsible"
                >
                  <div className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        {item.icon && <item.icon className="mr-2 " />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <RenderSidebarItems
                          items={item.items}
                          level={2}
                          currentPath={currentPath}
                        />
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={currentPath === item.url}
                >
                  <Link to={item.url} className="flex items-center w-full">
                    {item.icon && <item.icon className="mr-2" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
