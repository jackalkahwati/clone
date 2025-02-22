import { Mail } from "lucide-react"

interface EmailListItemProps {
  subject: string
  sender: string
  preview: string
  time: string
  status: 'unread' | 'read' | 'ai_response_ready'
}

export function EmailListItem({ subject, sender, preview, time, status }: EmailListItemProps) {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-gray-100 dark:hover:bg-gray-800">
      <Mail className={status === 'unread' ? 'text-blue-500' : 'text-gray-500'} size={20} />
      <div className="flex-1 space-y-1">
        <p className="font-medium">{subject}</p>
        <p className="text-sm text-gray-500">{sender}</p>
        <p className="text-sm text-gray-500 truncate">{preview}</p>
      </div>
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  )
} 