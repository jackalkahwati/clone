"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Document } from "./types"

interface EditorProps {
  document: Document
  onChange: (content: string) => void
}

export function Editor({ document, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: document.content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <ScrollArea className="h-full">
      <div className="container max-w-4xl py-8">
        <EditorContent editor={editor} />
      </div>
    </ScrollArea>
  )
}

