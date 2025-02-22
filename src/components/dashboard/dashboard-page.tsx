"use client"

import { ActivityMetrics } from "./activity-metrics"
import { OverviewCards } from "./overview-cards"
import { PerformanceChart } from "./performance-chart"
import { QuickActions } from "./quick-actions"
import { RecentActivity } from "./recent-activity"
import { ResourceUtilization } from "./resource-utilization"
import { UpcomingDeadlines } from "./upcoming-deadlines"
import { WorkloadDistribution } from "./workload-distribution"

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your digital workspace.</p>
        </div>
        <QuickActions />
      </div>

      <OverviewCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <PerformanceChart />
        <WorkloadDistribution />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityMetrics />
        <ResourceUtilization />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />
        <UpcomingDeadlines />
      </div>
    </div>
  )
}

