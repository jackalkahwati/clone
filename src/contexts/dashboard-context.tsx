'use client'

import { createContext, useContext, useState } from 'react'
import { mockData } from '@/lib/mock-data'

interface DashboardContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  data: typeof mockData
  markEmailAsRead: (emailId: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('inbox')
  const [data, setData] = useState(mockData)

  const markEmailAsRead = (emailId: string) => {
    setData(prev => ({
      ...prev,
      inbox: {
        ...prev.inbox,
        emails: prev.inbox.emails.map(email => 
          email.id === emailId ? { ...email, status: 'read' } : email
        )
      }
    }))
  }

  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab, data, markEmailAsRead }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (undefined === context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
} 