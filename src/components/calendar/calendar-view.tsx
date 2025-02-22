"use client"

import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Calendar } from "./calendar"
import { AIAssistantPanel } from "./ai-assistant-panel"
import { TaskPrioritization } from "./task-prioritization"
import type { CalendarEvent } from "./types"

const EXAMPLE_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Standup - Job 1",
    start: new Date(2024, 1, 22, 10, 0),
    end: new Date(2024, 1, 22, 10, 30),
    jobContext: "Job 1",
    priority: "medium",
    attendees: ["alice@example.com", "bob@example.com"],
    color: "#4f46e5",
  },
  {
    id: "2",
    title: "Client Meeting - Job 2",
    start: new Date(2024, 1, 22, 14, 0),
    end: new Date(2024, 1, 22, 15, 0),
    jobContext: "Job 2",
    priority: "high",
    attendees: ["carol@example.com"],
    color: "#0891b2",
  },
  // Add more example events as needed
]

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [view, setView] = useState<"month" | "week">("week")

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={75}>
        <Calendar
          events={EXAMPLE_EVENTS}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          view={view}
          onViewChange={setView}
        />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={25}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <AIAssistantPanel selectedDate={selectedDate} events={EXAMPLE_EVENTS} />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50}>
            <TaskPrioritization selectedDate={selectedDate} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

