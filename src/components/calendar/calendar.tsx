"use client"

import { useCallback } from "react"
import { addDays, format, startOfWeek } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { CalendarEvent } from "./types"

interface CalendarProps {
  events: CalendarEvent[]
  selectedDate: Date
  onSelectDate: (date: Date) => void
  view: "month" | "week"
  onViewChange: (view: "month" | "week") => void
}

export function Calendar({ events, selectedDate, onSelectDate, view, onViewChange }: CalendarProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(selectedDate), i))

  const getEventsForTimeSlot = useCallback(
    (date: Date, hour: number) => {
      return events.filter((event) => {
        const eventDate = new Date(event.start)
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getHours() === hour
        )
      })
    },
    [events],
  )

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => onSelectDate(addDays(selectedDate, -7))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">{format(selectedDate, "MMMM yyyy")}</h2>
          <Button variant="outline" size="icon" onClick={() => onSelectDate(addDays(selectedDate, 7))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Select value={view} onValueChange={(v: "month" | "week") => onViewChange(v)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-8 border-b">
          <div className="border-r p-2" />
          {weekDays.map((date) => (
            <div
              key={date.toString()}
              className={cn(
                "border-r p-2 text-center",
                date.getMonth() !== selectedDate.getMonth() && "text-muted-foreground",
              )}
            >
              <div className="font-medium">{format(date, "EEE")}</div>
              <div className="text-sm">{format(date, "d")}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
          {hours.map((hour) => (
            <>
              <div key={`hour-${hour}`} className="border-r border-b p-2 text-sm text-muted-foreground">
                {format(new Date().setHours(hour), "ha")}
              </div>
              {weekDays.map((date) => {
                const timeSlotEvents = getEventsForTimeSlot(date, hour)
                return (
                  <div key={`${date.toString()}-${hour}`} className="relative border-r border-b p-2 min-h-[4rem]">
                    {timeSlotEvents.map((event) => (
                      <div
                        key={event.id}
                        className="absolute inset-x-1 rounded p-1 text-xs"
                        style={{
                          backgroundColor: `${event.color}20`,
                          borderLeft: `3px solid ${event.color}`,
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

