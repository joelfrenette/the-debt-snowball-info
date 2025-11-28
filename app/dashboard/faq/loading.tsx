import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-6xl mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>

        <Skeleton className="h-10 w-64" />
      </div>

      <div className="space-y-4 mb-8">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-4">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
      </div>
    </div>
  )
}
