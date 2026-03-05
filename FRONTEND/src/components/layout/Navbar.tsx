import { Link } from "react-router-dom"
import Logo from "../logo/Logo"
import { Button } from "../ui/button"

export default function Navbar() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4 lg:px-8 gap-2">

        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/events" className="text-muted-foreground hover:text-foreground">
            Browse Events
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">Log In</Button>
          </Link>

          <Link to="/register">
            <Button size="sm" className="text-xs sm:text-sm">Sign Up</Button>
          </Link>
        </div>

      </div>

    </header>
  )
}