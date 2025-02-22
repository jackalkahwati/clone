export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  dueDate: Date
  jobContext: string
  assignee: string
  tags: string[]
}

export interface Job {
  id: string
  name: string
  color: string
  taskCount: number
  completedTasks: number
  upcomingDeadlines: number
}

export interface WorkloadData {
  job: string
  tasks: number
  completed: number
}

