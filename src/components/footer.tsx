import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <p className="text-sm text-muted-foreground">© 2024 Clne.me. All rights reserved.</p>
        <nav className="flex gap-4 text-sm">
          <Link href="/settings" className="text-muted-foreground hover:text-foreground">
            Settings
          </Link>
          <Link href="/help" className="text-muted-foreground hover:text-foreground">
            Help
          </Link>
          <Link href="/account" className="text-muted-foreground hover:text-foreground">
            Account
          </Link>
        </nav>
      </div>
    </footer>
  )
}

