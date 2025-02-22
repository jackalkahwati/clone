"use client"

import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Editor } from "./editor"
import { DocumentToolbar } from "./document-toolbar"
import { AISuggestionsPanel } from "./ai-suggestions-panel"
import { VersionHistory } from "./version-history"
import type { Document } from "./types"

const EXAMPLE_DOCUMENT: Document = {
  id: "1",
  title: "Q1 2024 Project Proposal",
  content: `# Project Proposal

## Executive Summary
This proposal outlines our strategic initiatives for Q1 2024...

## Objectives
1. Increase market penetration
2. Optimize operational efficiency
3. Enhance customer satisfaction

## Timeline
- Phase 1: Planning (January)
- Phase 2: Implementation (February)
- Phase 3: Review (March)

## Budget
Total estimated budget: $150,000

## Next Steps
Schedule kickoff meeting with stakeholders...`,
  lastModified: new Date(),
  createdAt: new Date(2024, 1, 1),
  jobContext: "Job 1",
  collaborators: ["alice@example.com", "bob@example.com"],
  version: 1,
}

export function DocumentEditor() {
  const [document, setDocument] = useState<Document>(EXAMPLE_DOCUMENT)
  const [showVersionHistory, setShowVersionHistory] = useState(false)

  return (
    <div className="flex h-full flex-col">
      <DocumentToolbar document={document} onShowVersionHistory={() => setShowVersionHistory(true)} />

      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={75}>
            <Editor document={document} onChange={(content) => setDocument({ ...document, content })} />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={25}>
            <AISuggestionsPanel document={document} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <VersionHistory document={document} open={showVersionHistory} onOpenChange={setShowVersionHistory} />
    </div>
  )
}

