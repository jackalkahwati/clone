import type { Control } from "react-hook-form"
import { Github, Mail, Slack, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

interface IntegrationSettingsProps {
  control: Control<any>
}

export function IntegrationSettings({ control }: IntegrationSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Settings</CardTitle>
        <CardDescription>Connect your Clne.me with other services.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="integrations.emailSync"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Integration
                </FormLabel>
                <FormDescription>Sync and manage emails across your jobs</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="integrations.calendarSync"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar Integration
                </FormLabel>
                <FormDescription>Sync calendars and manage scheduling</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="integrations.slackSync"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center">
                  <Slack className="mr-2 h-4 w-4" />
                  Slack Integration
                </FormLabel>
                <FormDescription>Connect with Slack workspaces</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="integrations.githubSync"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Integration
                </FormLabel>
                <FormDescription>Sync with GitHub repositories</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

