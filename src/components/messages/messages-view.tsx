"use client"

import { useState } from "react"
import { ThreadList } from "./thread-list"
import { ConversationView } from "./conversation-view"
import { SummaryPanel } from "./summary-panel"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import type { Thread, Message } from "./types"

const EXAMPLE_THREADS: Thread[] = [
  {
    id: "1",
    subject: "Project Update Meeting",
    preview: "Here's a summary of our discussion...",
    participants: ["alice@example.com", "bob@example.com"],
    unread: true,
    urgent: true,
    timestamp: "2024-02-22T10:00:00Z",
    labels: ["work", "important"],
  },
  {
    id: "2",
    subject: "Weekly Report",
    preview: "Attached is the weekly progress report...",
    participants: ["carol@example.com"],
    unread: false,
    urgent: false,
    timestamp: "2024-02-22T09:00:00Z",
    labels: ["work"],
  },
  // Add more example threads as needed
]

const EXAMPLE_MESSAGES: Message[] = [
  {
    id: "1",
    threadId: "1",
    from: "alice@example.com",
    content: "Hi team, following up on our discussion about the project timeline. Can we schedule a quick sync?",
    timestamp: "2024-02-22T10:00:00Z",
    attachments: [],
  },
  {
    id: "2",
    threadId: "1",
    from: "bob@example.com",
    content: "Sure, I'm available tomorrow afternoon. How does 2 PM sound?",
    timestamp: "2024-02-22T10:05:00Z",
    attachments: [],
  },
  // Add more example messages as needed
]

export function MessagesView() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
        <ThreadList threads={EXAMPLE_THREADS} selectedThread={selectedThread} onSelectThread={setSelectedThread} />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={50}>
        <ConversationView
          thread={selectedThread}
          messages={EXAMPLE_MESSAGES.filter((m) => m.threadId === selectedThread?.id)}
        />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={25}>
        <SummaryPanel thread={selectedThread} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

