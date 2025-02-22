import { Lightbulb, MessageSquare, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Document } from "./types"

interface AISuggestionsPanelProps {
  document: Document
}

export function AISuggestionsPanel({ document }: AISuggestionsPanelProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        <div>
          <h3 className="font-semibold">AI Writing Assistant</h3>
          <Separator className="my-2" />

          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 font-medium">
                <Wand2 className="h-4 w-4" />
                Suggestions
              </div>
              <div className="mt-2 space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  Enhance executive summary
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Add success metrics
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Expand timeline details
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 font-medium">
                <MessageSquare className="h-4 w-4" />
                Writing Style
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <p>• Consider using more action verbs</p>
                <p>• Add specific metrics to objectives</p>
                <p>• Include risk mitigation strategies</p>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 font-medium">
                <Lightbulb className="h-4 w-4" />
                Smart Recommendations
              </div>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p>• Similar successful proposals included ROI analysis</p>
                <p>• Consider adding competitive analysis</p>
                <p>• Most viewed by stakeholders: Budget section</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

