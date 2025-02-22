"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import type { Thread, Message } from "./types"

interface ConversationViewProps {
  thread: Thread | null
  messages: Message[]
}

export function ConversationView({ thread, messages }: ConversationViewProps) {
  const [reply, setReply] = useState("")

  if (!thread) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a conversation to view</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="font-semibold">{thread.subject}</h2>
        <p className="text-sm text-muted-foreground">{thread.participants.join(", ")}</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{message.from.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.from}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex gap-4">
          <Textarea
            placeholder="Type your message..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline">AI Draft</Button>
            <Button variant="outline">Templates</Button>
          </div>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

