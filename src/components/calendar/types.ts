export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  description?: string
  location?: string
  jobContext: string
  priority: "low" | "medium" | "high"
  attendees: string[]
  color?: string
}

export interface TimeSlot {
  start: Date
  end: Date
  score: number
  conflicts: string[]
}

export interface Task {
  id: string
  title: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  jobContext: string
  status: "todo" | "in-progress" | "done"
}

