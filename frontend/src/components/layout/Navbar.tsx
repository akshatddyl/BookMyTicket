import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light") // cycle: light -> dark -> system -> light
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">BookMyTicket</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Events
            </Link>
            <Link to="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
