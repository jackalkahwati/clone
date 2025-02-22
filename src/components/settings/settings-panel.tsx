"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { AISettings } from "./ai-settings"
import { IntegrationSettings } from "./integration-settings"
import { NotificationSettings } from "./notification-settings"
import { WorkspaceSettings } from "./workspace-settings"

const settingsSchema = z.object({
  aiSettings: z.object({
    autoApprovalThreshold: z.number().min(0).max(100),
    responseSpeed: z.number().min(0).max(100),
    toneFormal: z.number().min(0).max(100),
    toneCreative: z.number().min(0).max(100),
  }),
  integrations: z.object({
    emailSync: z.boolean(),
    calendarSync: z.boolean(),
    slackSync: z.boolean(),
    githubSync: z.boolean(),
  }),
  notifications: z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    taskReminders: z.boolean(),
    meetingReminders: z.boolean(),
  }),
  workspace: z.object({
    defaultJob: z.string(),
    timeZone: z.string(),
    language: z.string(),
  }),
})

type SettingsValues = z.infer<typeof settingsSchema>

const defaultValues: SettingsValues = {
  aiSettings: {
    autoApprovalThreshold: 80,
    responseSpeed: 70,
    toneFormal: 60,
    toneCreative: 40,
  },
  integrations: {
    emailSync: true,
    calendarSync: true,
    slackSync: false,
    githubSync: false,
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    meetingReminders: true,
  },
  workspace: {
    defaultJob: "job1",
    timeZone: "UTC",
    language: "en",
  },
}

export function SettingsPanel() {
  const [isPending, setIsPending] = useState(false)

  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  })

  async function onSubmit(data: SettingsValues) {
    setIsPending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsPending(false)
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your Clne.me preferences and integrations.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="ai" className="space-y-6">
            <TabsList>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="space-y-6">
              <AISettings control={form.control} />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <IntegrationSettings control={form.control} />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationSettings control={form.control} />
            </TabsContent>

            <TabsContent value="workspace" className="space-y-6">
              <WorkspaceSettings control={form.control} />
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

