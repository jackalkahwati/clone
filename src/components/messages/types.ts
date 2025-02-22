export interface Thread {
  id: string
  subject: string
  preview: string
  participants: string[]
  unread: boolean
  urgent: boolean
  timestamp: string
  labels: string[]
}

export interface Message {
  id: string
  threadId: string
  from: string
  content: string
  timestamp: string
  attachments: Attachment[]
}

export interface Attachment {
  id: string
  name: string
  type: string
  url: string
}

export interface AISuggestion {
  type: "reply" | "action"
  content: string
  confidence: number
}

