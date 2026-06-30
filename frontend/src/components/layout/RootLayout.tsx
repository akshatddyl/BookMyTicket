import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
