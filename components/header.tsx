import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="https://thedebtsnowball.info" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-green-600">The Debt Snowball Info</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/how-it-works" className="text-sm font-medium transition-colors hover:text-green-600">
            How It Works
          </Link>
          <Link href="/dashboard">
            <Button className="bg-green-600 hover:bg-green-700">Dashboard</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
