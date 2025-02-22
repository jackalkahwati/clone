"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { date: "Mon", productivity: 85, tasks: 12, meetings: 3 },
  { date: "Tue", productivity: 92, tasks: 15, meetings: 4 },
  { date: "Wed", productivity: 88, tasks: 10, meetings: 2 },
  { date: "Thu", productivity: 95, tasks: 18, meetings: 5 },
  { date: "Fri", productivity: 89, tasks: 14, meetings: 3 },
  { date: "Sat", productivity: 78, tasks: 8, meetings: 1 },
  { date: "Sun", productivity: 82, tasks: 9, meetings: 2 },
]

export function PerformanceChart() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track your productivity and task completion</CardDescription>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last week</SelectItem>
            <SelectItem value="month">Last month</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                            <span className="font-bold text-muted-foreground">Productivity</span>
                            <span className="font-bold">{payload[0].value}%</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-muted-foreground">Tasks</span>
                            <span className="font-bold">{payload[1].value}</span>
                            <span className="font-bold text-muted-foreground">Meetings</span>
                            <span className="font-bold">{payload[2].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line type="monotone" dataKey="productivity" stroke="#4f46e5" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="tasks" stroke="#0891b2" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="meetings" stroke="#7c3aed" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

