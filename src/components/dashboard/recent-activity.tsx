import { format } from "date-fns"
import { Mail, FileText, Calendar, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  {
    id: 1,
    type: "email",
    title: "Client Proposal Sent",
    description: "Sent project proposal to Acme Corp",
    timestamp: new Date(2024, 1, 22, 14, 30),
    icon: Mail,
  },
  {
    id: 2,
    type: "document",
    title: "Report Updated",
    description: "Updated Q1 performance report",
    timestamp: new Date(2024, 1, 22, 13, 15),
    icon: FileText,
  },
  {
    id: 3,
    type: "meeting",
    title: "Team Sync Scheduled",
    description: "Weekly sync with development team",
    timestamp: new Date(2024, 1, 22, 12, 0),
    icon: Calendar,
  },
  {
    id: 4,
    type: "chat",
    title: "Message from Alice",
    description: "Discussed project timeline updates",
    timestamp: new Date(2024, 1, 22, 11, 45),
    icon: MessageSquare,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{format(activity.timestamp, "h:mm a")}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

