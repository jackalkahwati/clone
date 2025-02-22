"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    name: "Emails",
    sent: 45,
    received: 78,
  },
  {
    name: "Meetings",
    sent: 12,
    received: 15,
  },
  {
    name: "Tasks",
    sent: 25,
    received: 35,
  },
  {
    name: "Documents",
    sent: 18,
    received: 22,
  },
]

export function ActivityMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Metrics</CardTitle>
        <CardDescription>Your communication and task patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="sent" fill="#4f46e5" name="Sent" />
              <Bar dataKey="received" fill="#0891b2" name="Received" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

