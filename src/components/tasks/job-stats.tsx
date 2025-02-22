import { CheckCircle2, Clock, ListTodo } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Job } from "./types"

interface JobStatsProps {
  job: Job
}

export function JobStats({ job }: JobStatsProps) {
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Total Tasks</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{job.taskCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Completed</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{job.completedTasks}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Upcoming</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{job.upcomingDeadlines}</p>
        </CardContent>
      </Card>
    </div>
  )
}

