"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const metrics = [
  {
    title: "Tasks Completed",
    value: "89",
    description: "Total tasks completed this week",
    trend: 12.5,
    progress: 85,
    icon: (
      <div className="rounded-full bg-primary/10 p-2 text-primary">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 11l3 3l8-8" />
          <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
        </svg>
      </div>
    ),
  },
  {
    title: "Productivity Score",
    value: "92%",
    description: "Based on your activity",
    trend: 8.2,
    progress: 92,
    icon: (
      <div className="rounded-full bg-green-500/10 p-2 text-green-500">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-4" />
        </svg>
      </div>
    ),
  },
  {
    title: "Time Saved",
    value: "24.5h",
    description: "Hours saved through automation",
    trend: 15.3,
    progress: 78,
    icon: (
      <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
    ),
  },
  {
    title: "AI Accuracy",
    value: "95.2%",
    description: "Response accuracy rate",
    trend: -2.1,
    progress: 95,
    icon: (
      <div className="rounded-full bg-purple-500/10 p-2 text-purple-500">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 2a10 10 0 1 1-10 10h10V2z" />
          <path d="M12 12L2.1 12" />
          <path d="M12 12l10-.1" />
        </svg>
      </div>
    ),
  },
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{metric.progress}%</span>
              </div>
              <Progress value={metric.progress} />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {metric.trend > 0 ? (
                <ArrowUpIcon className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 text-red-500" />
              )}
              <span className={metric.trend > 0 ? "text-green-500" : "text-red-500"}>{Math.abs(metric.trend)}%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

