// src/components/Loader.jsx
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // from shadcn setup

export default function Loader({ className }) {
  return (
    <div className={cn("flex justify-center items-center h-[70vh]", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}
