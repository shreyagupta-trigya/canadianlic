import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { useEffect } from "react"

export default function Page() {
    useEffect(() => {
        // Simulate an authentication check
        console.log("Page mounted, authentication check can be done here");

    }, []);
    return (
        <>
            <SectionCards />
            <div className="px-1 lg:px-6">
                <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
        </>

    )
}
