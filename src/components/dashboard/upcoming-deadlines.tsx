import { format } from "date-fns"
import { AlertCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const deadlines = [
  {
    id: 1,
    title: "Project Proposal Due",
    date: new Date(2024, 1, 25),
    priority: "high",
    job: "Software Engineer",
  },
  {
    id: 2,
    title: "Client Meeting Preparation",
    date: new Date(2024, 1, 26),
    priority: "medium",
    job: "Technical Writer",
  },
  {
    id: 3,
    title: "Documentation Review",
    date: new Date(2024, 1, 27),
    priority: "low",
    job: "Technical Writer",
  },
  {
    id: 4,
    title: "Sprint Planning",
    date: new Date(2024, 1, 28),
    priority: "medium",
    job: "Software Engineer",
  },
]

export function UpcomingDeadlines() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Tasks and events requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {deadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-start gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{deadline.title}</p>
                    {deadline.priority === "high" && <AlertCircle className="h-4 w-4 text-destructive" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{deadline.job}</p>
                  <p className="text-xs text-muted-foreground">Due {format(deadline.date, "MMM d, yyyy")}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

