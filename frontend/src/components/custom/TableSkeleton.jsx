import { Skeleton } from "@/components/ui/skeleton"

export default function TableSkeleton() {
  return (
    <div className="p-4 space-y-4">
        <div className="flex justify-end" >
            <Skeleton  className="h-10 w-50  bg-slate-300" />
        </div>
      {/* Table Header Skeleton */}
      <div className="grid grid-cols-6 gap-4">
        <Skeleton  className="h-10 w-full bg-slate-300" />
        <Skeleton className="h-10 w-full bg-slate-300" />
        <Skeleton className="h-10 w-full bg-slate-300" />
        <Skeleton className="h-10 w-full bg-slate-300" />
        <Skeleton className="h-10 w-full bg-slate-300" />
        <Skeleton className="h-10 w-full bg-slate-300" />
      </div>

      {/* Table Row Skeletons */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 items-center">
          <Skeleton className="h-6 w-full bg-slate-200" />
          <Skeleton className="h-6 w-full bg-slate-200" />
          <Skeleton className="h-6 w-full bg-slate-200" />
          <Skeleton className="h-6 w-full bg-slate-200" />
          <Skeleton className="h-6 w-full bg-slate-200" />
          <Skeleton className="h-6 w-full bg-slate-200 rounded-md" />
        </div>
      ))}
    </div>
  )
}
