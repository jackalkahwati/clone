import { useDroppable } from "@dnd-kit/core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DraggableTask } from "./draggable-task"
import type { Task } from "./types"

interface TaskBoardProps {
  tasks: Task[]
}

interface Column {
  id: Task["status"]
  title: string
}

const COLUMNS: Column[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
]

export function TaskBoard({ tasks }: TaskBoardProps) {
  return (
    <div className="flex h-full">
      {COLUMNS.map((column) => (
        <Column key={column.id} column={column} tasks={tasks.filter((task) => task.status === column.id)} />
      ))}
    </div>
  )
}

interface ColumnProps {
  column: Column
  tasks: Task[]
}

function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  return (
    <div className="flex-1 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{column.title}</h3>
        <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">{tasks.length}</span>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div ref={setNodeRef} className="space-y-3">
          {tasks.map((task) => (
            <DraggableTask key={task.id} task={task} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

