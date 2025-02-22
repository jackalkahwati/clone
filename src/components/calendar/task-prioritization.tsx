import { CheckCircle2, Circle, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const EXAMPLE_TASKS = [
  {
    id: "1",
    title: "Review Q1 Reports",
    dueDate: new Date(2024, 1, 23),
    priority: "high",
    jobContext: "Job 1",
    status: "todo",
  },
  {
    id: "2",
    title: "Client Presentation",
    dueDate: new Date(2024, 1, 24),
    priority: "high",
    jobContext: "Job 2",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Team Check-in",
    dueDate: new Date(2024, 1, 22),
    priority: "medium",
    jobContext: "Job 1",
    status: "done",
  },
]

interface TaskPrioritizationProps {
  selectedDate: Date
}

export function TaskPrioritization({ selectedDate }: TaskPrioritizationProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        <div>
          <h3 className="font-semibold">Task Prioritization</h3>
          <Separator className="my-2" />

          <div className="space-y-2">
            {EXAMPLE_TASKS.map((task) => (
              <div
                key={task.id}
                className={cn("flex items-start gap-2 rounded-lg border p-3", task.status === "done" && "bg-muted")}
              >
                <div className="mt-0.5">
                  {task.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={cn("font-medium", task.status === "done" && "line-through")}>{task.title}</span>
                    <span
                      className={cn("text-xs", task.priority === "high" ? "text-destructive" : "text-muted-foreground")}
                    >
                      {task.jobContext}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Due {task.dueDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

