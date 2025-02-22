import { formatDistanceToNow } from "date-fns"
import { AlertCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Thread } from "./types"

interface ThreadListProps {
  threads: Thread[]
  selectedThread: Thread | null
  onSelectThread: (thread: Thread) => void
}

export function ThreadList({ threads, selectedThread, onSelectThread }: ThreadListProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages" className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => onSelectThread(thread)}
              className={cn(
                "flex w-full flex-col gap-1 p-4 text-left hover:bg-muted/50",
                selectedThread?.id === thread.id && "bg-muted",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {thread.urgent && <AlertCircle className="h-4 w-4 text-destructive" />}
                  <span className="font-medium">{thread.subject}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(thread.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{thread.preview}</p>
              <div className="flex gap-2">
                {thread.labels.map((label) => (
                  <span key={label} className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                    {label}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

