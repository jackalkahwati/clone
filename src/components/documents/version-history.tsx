import { format } from "date-fns"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Document } from "./types"

const EXAMPLE_VERSIONS = [
  {
    id: "v3",
    documentId: "1",
    createdAt: new Date(2024, 1, 22, 15, 30),
    createdBy: "alice@example.com",
    comment: "Updated budget section",
  },
  {
    id: "v2",
    documentId: "1",
    createdAt: new Date(2024, 1, 22, 14, 0),
    createdBy: "bob@example.com",
    comment: "Added timeline details",
  },
  {
    id: "v1",
    documentId: "1",
    createdAt: new Date(2024, 1, 22, 10, 0),
    createdBy: "alice@example.com",
    comment: "Initial draft",
  },
]

interface VersionHistoryProps {
  document: Document
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VersionHistory({ document, open, onOpenChange }: VersionHistoryProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Version History</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-4">
            {EXAMPLE_VERSIONS.map((version) => (
              <div key={version.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Version {version.id}</span>
                  <span className="text-sm text-muted-foreground">{format(version.createdAt, "MMM d, h:mm a")}</span>
                </div>
                <p className="text-sm text-muted-foreground">{version.comment}</p>
                <div className="text-sm text-muted-foreground">By {version.createdBy}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

