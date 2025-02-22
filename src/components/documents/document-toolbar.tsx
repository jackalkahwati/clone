"use client"

import { Clock, Download, Save, Share2, LayoutTemplateIcon as Templates } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Document } from "./types"

interface DocumentToolbarProps {
  document: Document
  onShowVersionHistory: () => void
}

export function DocumentToolbar({ document, onShowVersionHistory }: DocumentToolbarProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Input
            value={document.title}
            className="h-9 w-[200px] md:w-[300px]"
            onChange={(e) => {
              // Update document title
            }}
          />
          <Select defaultValue="proposal">
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="presentation">Presentation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onShowVersionHistory}>
            <Clock className="mr-2 h-4 w-4" />
            History
          </Button>
          <Button variant="outline" size="sm">
            <Templates className="mr-2 h-4 w-4" />
            Templates
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

