import { CheckCircle2, Clock, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Thread } from "./types"

interface SummaryPanelProps {
  thread: Thread | null
}

export function SummaryPanel({ thread }: SummaryPanelProps) {
  if (!thread) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a conversation to view summary</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        <div>
          <h3 className="font-semibold">Key Points</h3>
          <Separator className="my-2" />
          <ul className="space-y-2 text-sm">
            <li>• Discussion about project timeline</li>
            <li>• Meeting proposed for tomorrow</li>
            <li>• Need to confirm availability</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Action Items</h3>
          <Separator className="my-2" />
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Schedule follow-up meeting
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Review project timeline
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Flag className="mr-2 h-4 w-4" />
              Prepare status update
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">AI Suggestions</h3>
          <Separator className="my-2" />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Consider scheduling the meeting earlier in the day for better attendance</p>
            <p>• Add project milestones to the discussion agenda</p>
            <p>• Include team availability in the response</p>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

