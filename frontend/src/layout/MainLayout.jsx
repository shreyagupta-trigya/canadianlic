import { Outlet, useNavigate } from "react-router-dom"

import ThemeToggle1 from "@/components/theme/ThemeToggle1"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { IconLoader } from "@tabler/icons-react"
import { AppSidebar } from "@/components/app-sidebar"
// Breadcrumbs import is kept, but unused for now

export default function MainLayout() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (open) {
            const runAsync = async () => {
                // simulate async task
                await new Promise((res) => setTimeout(res, 3000))
                setOpen(false)
                navigate("/portal")
            }

            runAsync()
        }
    }, [open, navigate])
    return (
        <SidebarProvider>
            {/* <div className="font-sans"> */}
            <AppSidebar />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
                    <div className="flex justify-center items-center gap-6" >
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                    </div>
                    <div className="flex justify-center items-center gap-6" >
                        <ThemeToggle1 />
                        <AlertPermissionCheck open={open} setOpen={setOpen} />

                    </div>

                </header>
                <main className="p-1 flex-1 ">
                    <div className="flex-grow">
                        {/* <SidebarProvider
                            style={
                                {
                                    "--sidebar-width": "calc(var(--spacing) * 72)",
                                    "--header-height": "calc(var(--spacing) * 12)",
                                }
                            }
                        > */}
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
                        {/* </SidebarProvider> */}
                    </div>
                </main>
            </SidebarInset>
            {/* </div> */}
        </SidebarProvider>
    );
}

function AlertPermissionCheck({ open, setOpen }) {

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">
                            <Settings />
                        </Button>
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Portal</p>
                </TooltipContent>
            </Tooltip>

           <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <IconLoader className="animate-spin mr-2 inline" />
            Verifying permissions...
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please wait while we validate your access to the portal.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
        </AlertDialog>
    )
}

function AlertDialogDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
