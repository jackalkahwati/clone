import { Clock, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { CalendarEvent } from "./types"

interface AIAssistantPanelProps {
  selectedDate: Date
  events: CalendarEvent[]
}

export function AIAssistantPanel({ selectedDate, events }: AIAssistantPanelProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        <div>
          <h3 className="font-semibold">AI Suggestions</h3>
          <Separator className="my-2" />

          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 font-medium">
                <Clock className="h-4 w-4" />
                Suggested Meeting Times
              </div>
              <div className="mt-2 space-y-2 text-sm">
                <Button variant="outline" className="w-full justify-start">
                  Tomorrow, 10:00 AM - 11:00 AM
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Thursday, 2:00 PM - 3:00 PM
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 font-medium">
                <Users className="h-4 w-4" />
                Attendee Availability
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <p>• Alice: Available after 2 PM</p>
                <p>• Bob: Out of office on Friday</p>
                <p>• Carol: Prefers morning meetings</p>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 font-medium">
                <Zap className="h-4 w-4" />
                Smart Recommendations
              </div>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p>• Consider splitting the 2-hour meeting into two sessions</p>
                <p>• Block focus time between meetings</p>
                <p>• Schedule buffer time for Job 2 client calls</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

