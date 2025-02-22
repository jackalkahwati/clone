export interface Document {
  id: string
  title: string
  content: string
  lastModified: Date
  createdAt: Date
  template?: string
  jobContext: string
  collaborators: string[]
  version: number
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  content: string
  thumbnail: string
}

export interface Version {
  id: string
  documentId: string
  content: string
  createdAt: Date
  createdBy: string
  comment: string
}

export interface AISuggestion {
  id: string
  type: "grammar" | "style" | "content"
  content: string
  range: { from: number; to: number }
  confidence: number
}

