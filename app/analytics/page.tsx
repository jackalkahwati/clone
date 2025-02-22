"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { trpc } from "@/lib/trpc/client"

interface AnalyticsMetrics {
  tasks: {
    total: number;
    completed: number;
    growth: number;
  };
  aiResponses: {
    total: number;
    emails: number;
    chats: number;
    documents: number;
    growth: number;
  };
  timeSaved: {
    hours: number;
    growth: number;
  };
  workspaces: {
    active: number;
    total: number;
    distribution: Array<{
      name: string;
      tasks: number;
      completion: number;
    }>;
  };
}

interface QualityMetrics {
  accuracy: number;
  responseTime: number;
  userSatisfaction: number;
  improvementRate: number;
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { data: analyticsData, isLoading: isLoadingAnalytics } = trpc.analytics.getMetrics.useQuery()
  const { data: qualityMetrics, isLoading: isLoadingQuality } = trpc.analytics.getAIQualityMetrics.useQuery()

  useEffect(() => {
    if (analyticsData) {
      setMetrics(analyticsData)
      setIsLoading(false)
    }
  }, [analyticsData])

  if (isLoading) {
    return <div>Loading analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your productivity and AI usage across workspaces.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="ai-usage">
            <LineChart className="mr-2 h-4 w-4" />
            AI Usage
          </TabsTrigger>
          <TabsTrigger value="workspaces">
            <PieChart className="mr-2 h-4 w-4" />
            Workspaces
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.tasks.total}</div>
                <p className="text-xs text-muted-foreground">
                  {metrics?.tasks.growth > 0 ? "+" : ""}{metrics?.tasks.growth}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.aiResponses.total}</div>
                <p className="text-xs text-muted-foreground">
                  {metrics?.aiResponses.growth > 0 ? "+" : ""}{metrics?.aiResponses.growth}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.timeSaved.hours}h</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Workspaces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.workspaces.active}</div>
                <p className="text-xs text-muted-foreground">Of {metrics?.workspaces.total} total</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
                <CardDescription>Your task completion and AI usage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  Activity Chart Placeholder
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Workspace Distribution</CardTitle>
                <CardDescription>Task distribution across workspaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  Distribution Chart Placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Email Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.aiResponses.emails}</div>
                <p className="text-xs text-muted-foreground">Generated this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chat Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.aiResponses.chats}</div>
                <p className="text-xs text-muted-foreground">Generated this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.aiResponses.documents}</div>
                <p className="text-xs text-muted-foreground">Generated this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{qualityMetrics?.accuracy}%</div>
                <p className="text-xs text-muted-foreground">Of monthly quota</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Response Quality</CardTitle>
              <CardDescription>Accuracy and effectiveness metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Response Time</div>
                    <div className="text-2xl font-bold">{qualityMetrics?.responseTime}s</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">User Satisfaction</div>
                    <div className="text-2xl font-bold">{qualityMetrics?.userSatisfaction}%</div>
                  </div>
                </div>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  Quality Metrics Chart Placeholder
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspaces" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics?.workspaces.distribution.map((workspace, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{workspace.name}</CardTitle>
                  <CardDescription>{workspace.tasks} tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium">Active Tasks</div>
                      <div className="text-2xl font-bold">{workspace.tasks}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Completion Rate</div>
                      <div className="text-2xl font-bold">{workspace.completion.toFixed(1)}%</div>
                    </div>
                    <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
                      Progress Chart Placeholder
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 