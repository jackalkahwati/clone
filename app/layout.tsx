import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MainSidebar } from "@/components/main-sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { TRPCProvider } from "./providers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Clne.me",
  description: "Automate your personal workflows",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <TRPCProvider>
          <AuthProvider>
            <SidebarProvider defaultOpen>
              <div className="flex min-h-screen">
                <MainSidebar />
                <div className="flex-1">
                  <Header />
                  <main className="container mx-auto p-4 md:p-6 lg:p-8">{children}</main>
                  <Footer />
                </div>
              </div>
            </SidebarProvider>
            <Toaster />
          </AuthProvider>
        </TRPCProvider>
      </body>
    </html>
  )
}



import './globals.css'