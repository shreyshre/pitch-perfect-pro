import { Link, useLocation } from "@tanstack/react-router";
import { Home, User, MapPin, Shield, Trophy } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/book-turf", label: "Book", icon: MapPin },
  { to: "/club", label: "Club", icon: Shield },
  { to: "/tournaments", label: "Cups", icon: Trophy },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-[var(--surface)]/90 backdrop-blur-xl">
      <ul className="mx-auto flex max-w-xl items-center justify-between px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/home" && pathname.startsWith(to));
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="group flex flex-col items-center gap-1 rounded-xl px-2 py-2 transition-colors"
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span
                  className={`text-[10px] font-medium tracking-wide transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
