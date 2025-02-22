"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const resources = [
  {
    name: "AI Credits",
    used: 850,
    total: 1000,
    color: "bg-blue-500",
  },
  {
    name: "Storage",
    used: 7.5,
    total: 10,
    color: "bg-purple-500",
  },
  {
    name: "API Calls",
    used: 75000,
    total: 100000,
    color: "bg-green-500",
  },
  {
    name: "Automation Tasks",
    used: 180,
    total: 200,
    color: "bg-orange-500",
  },
]

export function ResourceUtilization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Utilization</CardTitle>
        <CardDescription>Monitor your resource usage and limits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {resources.map((resource) => {
          const percentage = (resource.used / resource.total) * 100
          return (
            <div key={resource.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${resource.color}`} />
                  <span className="font-medium">{resource.name}</span>
                </div>
                <span className="text-muted-foreground">
                  {resource.used} / {resource.total}
                </span>
              </div>
              <Progress value={percentage} className="h-2" indicatorColor={resource.color} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{percentage.toFixed(1)}% used</span>
                <span>{(100 - percentage).toFixed(1)}% available</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

