import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DashboardProvider } from '@/contexts/dashboard-context'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Digital Clone",
  description: "AI-powered personal assistant that learns your communication style",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </body>
    </html>
  )
} 