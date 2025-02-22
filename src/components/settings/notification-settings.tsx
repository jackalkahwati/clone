import type { Control } from "react-hook-form"
import { Bell, Calendar, Mail, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

interface NotificationSettingsProps {
  control: Control<any>
}

export function NotificationSettings({ control }: NotificationSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure how and when you want to be notified.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="notifications.emailNotifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Notifications
                </FormLabel>
                <FormDescription>Receive notifications via email</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="notifications.pushNotifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  Push Notifications
                </FormLabel>
                <FormDescription>Receive browser push notifications</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="notifications.taskReminders"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Task Reminders
                </FormLabel>
                <FormDescription>Get reminders for upcoming tasks</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="notifications.meetingReminders"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Meeting Reminders
                </FormLabel>
                <FormDescription>Get reminders for upcoming meetings</FormDescription>
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

