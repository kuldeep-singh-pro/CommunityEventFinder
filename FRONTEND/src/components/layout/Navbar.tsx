import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/events"
            className="text-muted-foreground hover:text-indigo-600 transition"
          >
            Browse Events
          </Link>

          {user && (
            <>
              <Link
                to="/calendar"
                className="text-muted-foreground hover:text-indigo-600 transition"
              >
                Calendar
              </Link>

              <Link
                to="/my-activity"
                className="text-muted-foreground hover:text-indigo-600 transition"
              >
                My Activity
              </Link>
            </>
          )}

          {user?.role === "organizer" && (
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>

          {!user && (
            <>
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost">Log In</Button>
              </Link>

              <Link to="/register" className="hidden md:block">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold hover:bg-indigo-700 transition">
                  {initials}
                </div>
              </Link>

              <Button
                variant="outline"
                onClick={logout}
                className="hidden md:block hover:text-red-600"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col gap-6 text-lg font-medium transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button onClick={() => setOpen(false)} className="self-end">
            <X size={24} />
          </button>

          <Link to="/events" onClick={() => setOpen(false)}>
            Browse Events
          </Link>

          {user && (
            <>
              <Link to="/calendar" onClick={() => setOpen(false)}>
                Calendar
              </Link>

              <Link to="/my-activity" onClick={() => setOpen(false)}>
                My Activity
              </Link>
            </>
          )}

          {user?.role === "organizer" && (
            <Link to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}

          {!user && (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>

              <Link to="/register" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <button onClick={logout} className="text-red-600 text-left">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
