import type { Control } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"

interface AISettingsProps {
  control: Control<any>
}

export function AISettings({ control }: AISettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant Settings</CardTitle>
        <CardDescription>Configure how your Clne.me behaves and communicates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="aiSettings.autoApprovalThreshold"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Auto-approval Threshold</FormLabel>
              <FormControl>
                <Slider value={[value]} onValueChange={([value]) => onChange(value)} max={100} step={1} />
              </FormControl>
              <FormDescription>Set the confidence threshold for automatic task approval ({value}%)</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="aiSettings.responseSpeed"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Response Speed</FormLabel>
              <FormControl>
                <Slider value={[value]} onValueChange={([value]) => onChange(value)} max={100} step={1} />
              </FormControl>
              <FormDescription>Balance between speed and accuracy ({value}%)</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="aiSettings.toneFormal"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Formal Tone</FormLabel>
              <FormControl>
                <Slider value={[value]} onValueChange={([value]) => onChange(value)} max={100} step={1} />
              </FormControl>
              <FormDescription>Adjust the formality of AI responses ({value}%)</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="aiSettings.toneCreative"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Creative Tone</FormLabel>
              <FormControl>
                <Slider value={[value]} onValueChange={([value]) => onChange(value)} max={100} step={1} />
              </FormControl>
              <FormDescription>Adjust the creativity of AI responses ({value}%)</FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

