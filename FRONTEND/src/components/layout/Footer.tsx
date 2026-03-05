import { Link } from "react-router-dom"
import Logo from "../logo/Logo"

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-20">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">

          <Logo />

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <Link to="/events" className="hover:text-foreground">Events</Link>
            <Link to="/login" className="hover:text-foreground">Log In</Link>
            <Link to="/register" className="hover:text-foreground">Sign Up</Link>
          </div>

        </div>

        <div className="mt-6 border-t pt-6 text-center text-xs sm:text-sm text-muted-foreground">
          Built for communities. © 2026 EventFinder.
        </div>

      </div>

    </footer>
  )
}