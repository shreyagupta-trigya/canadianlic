import { Outlet, useNavigate } from "react-router-dom"
import ThemeToggle1 from "@/components/theme/ThemeToggle1"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Home, Settings } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { PortalAppSidebar } from "@/components/portal-app-sidebar"

const PortalLayout = () => {
    const navigate = useNavigate()

  return (
    <SidebarProvider>
            <PortalAppSidebar />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
                    <div className="flex justify-center items-center gap-6" >
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <p>Portal</p>
                    </div>
                    <div className="flex justify-center items-center gap-6" >
                        <ThemeToggle1 />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" onClick={() => navigate("/")}>
                                    <Home />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Main Modules</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                </header>
                <main className="p-1 flex-1 ">
                    <div className="flex-grow">
                        <SidebarProvider
                            style={
                                {
                                    "--sidebar-width": "calc(var(--spacing) * 72)",
                                    "--header-height": "calc(var(--spacing) * 12)",
                                }
                            }
                        >
                            <SidebarInset>
                                <div className="flex flex-1 flex-col">
                                    <div className="@container/main flex flex-1 flex-col gap-2 p-0">
                                        <div className="flex flex-col gap-4 py-1 md:gap-6 md:py-1">
                                            {/* This is where your route page content will render */}
                                            <Outlet />
                                        </div>
                                    </div>
                                </div>
                            </SidebarInset>
                        </SidebarProvider>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
  )
}

export default PortalLayout