import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import AllActivityList from "./AllTaskMaster";
export default function ActivityMasterList() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="allActivity" className="w-full">
        <div className="overflow-x-auto scrollbar-hide">
          <TabsList className="flex min-w-max sm:min-w-0 justify-start sm:justify-center gap-0 sm:gap-0">
            <TabsTrigger value="allActivity" className="whitespace-nowrap text-xs sm:text-sm">
             All Tasks
            </TabsTrigger>
            <TabsTrigger value="leadTaskActivity" className="whitespace-nowrap text-xs sm:text-sm">
              Lead Tasks
            </TabsTrigger>
            <TabsTrigger value="accounTasktActivity" className="whitespace-nowrap text-xs sm:text-sm">
              Account Tasks
            </TabsTrigger>
            <TabsTrigger value="contactTaskActivity" className="whitespace-nowrap text-xs sm:text-sm">
              Contact Tasks
            </TabsTrigger>
            <TabsTrigger value="opportunityTaskActivity" className="whitespace-nowrap text-xs sm:text-sm">
              Opportunity Tasks
            </TabsTrigger>
            <TabsTrigger value="quoteTaskActivity" className="whitespace-nowrap text-xs sm:text-sm">
              Quote Tasks
            </TabsTrigger>
            <TabsTrigger value="deliveryChallanTaskActivity" className="whitespace-nowrap text-xs sm:text-sm">
              Delivery Note Tasks
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="allActivity"
          className="w-full px-2 sm:px-4"
          style={{ border: "none" }}>
          <AllActivityList />
        </TabsContent>
      </Tabs>
    </div>
  );
}