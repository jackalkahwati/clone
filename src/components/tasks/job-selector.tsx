import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Job } from "./types"

interface JobSelectorProps {
  jobs: Job[]
  selectedJob: string
  onSelectJob: (jobId: string) => void
}

export function JobSelector({ jobs, selectedJob, onSelectJob }: JobSelectorProps) {
  return (
    <div className="border-b">
      <div className="space-y-2 p-4">
        <h2 className="text-lg font-semibold">Workspaces</h2>
        <div className="space-y-1">
          {jobs.map((job) => (
            <button
              key={job.id}
              onClick={() => onSelectJob(job.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
                selectedJob === job.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: job.color }} />
                {job.name}
              </div>
              {selectedJob === job.id && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

