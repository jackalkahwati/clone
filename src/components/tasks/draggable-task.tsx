import { useDraggable } from "@dnd-kit/core"
import { format } from "date-fns"
import { AlertCircle, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Task } from "./types"

interface DraggableTaskProps {
  task: Task
}

export function DraggableTask({ task }: DraggableTaskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="cursor-move">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
              </div>
              {task.priority === "high" && <AlertCircle className="h-4 w-4 text-destructive" />}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(task.dueDate, "MMM d")}
              </div>
              <div className="flex gap-1">
                {task.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

