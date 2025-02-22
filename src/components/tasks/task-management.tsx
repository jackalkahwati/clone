"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { JobSelector } from "./job-selector"
import { JobStats } from "./job-stats"
import { TaskBoard } from "./task-board"
import { AnalyticsPanel } from "./analytics-panel"
import type { Job, Task } from "./types"

const EXAMPLE_JOBS: Job[] = [
  {
    id: "job1",
    name: "Software Engineer",
    color: "#4f46e5",
    taskCount: 12,
    completedTasks: 5,
    upcomingDeadlines: 3,
  },
  {
    id: "job2",
    name: "Technical Writer",
    color: "#0891b2",
    taskCount: 8,
    completedTasks: 3,
    upcomingDeadlines: 2,
  },
]

const EXAMPLE_TASKS: Task[] = [
  {
    id: "task1",
    title: "Code Review",
    description: "Review pull requests for the new feature",
    status: "todo",
    priority: "high",
    dueDate: new Date(2024, 1, 25),
    jobContext: "job1",
    assignee: "alice@example.com",
    tags: ["development", "review"],
  },
  {
    id: "task2",
    title: "Documentation Update",
    description: "Update API documentation",
    status: "in-progress",
    priority: "medium",
    dueDate: new Date(2024, 1, 26),
    jobContext: "job2",
    assignee: "bob@example.com",
    tags: ["documentation"],
  },
]

export function TaskManagement() {
  const [selectedJob, setSelectedJob] = useState<string>(EXAMPLE_JOBS[0].id)
  const [tasks, setTasks] = useState<Task[]>(EXAMPLE_TASKS)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setTasks(
        tasks.map((task) => {
          if (task.id === active.id) {
            return { ...task, status: over.id as Task["status"] }
          }
          return task
        }),
      )
    }
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="flex h-full flex-col">
          <JobSelector jobs={EXAMPLE_JOBS} selectedJob={selectedJob} onSelectJob={setSelectedJob} />
          <JobStats job={EXAMPLE_JOBS.find((job) => job.id === selectedJob)!} />
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={55}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <TaskBoard tasks={tasks.filter((task) => task.jobContext === selectedJob)} />
        </DndContext>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={25}>
        <AnalyticsPanel jobs={EXAMPLE_JOBS} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

