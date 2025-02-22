import type { Control } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WorkspaceSettingsProps {
  control: Control<any>
}

export function WorkspaceSettings({ control }: WorkspaceSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Settings</CardTitle>
        <CardDescription>Configure your workspace preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="workspace.defaultJob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Job</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a default job" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="job1">Software Engineer</SelectItem>
                  <SelectItem value="job2">Technical Writer</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose which job to show by default when you log in</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="workspace.timeZone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Zone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time zone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Set your preferred time zone for scheduling</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="workspace.language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose your preferred language</FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

