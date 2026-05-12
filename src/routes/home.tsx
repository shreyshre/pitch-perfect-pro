Home · TSX
Copy

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { nearbyTurfs, upcomingMatches, activeTournaments } from "@/lib/mockData";
import { MapPin, Star, Clock, Trophy, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
 
export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — PitchSide" }] }),
  component: HomeFeed,
});
 
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
 
function HomeFeed() {
  const { user } = useAuth();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!user) navigate({ to: "/" });
  }, [user]);
 
  if (!user) return null;
 
  const greeting = user.name ? `${getGreeting()}, ${user.name.split(" ")[0]}` : getGreeting();
  const subtitle = user.city ? `${user.city} · Today` : "Today";
 
  return (
    <AppShell subtitle={subtitle} title={greeting}>
      {/* Nearby turfs */}
      <section className="mt-2">
        <SectionHeader title="Turfs available today" to="/book-turf" />
        <div className="-mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nearbyTurfs.map((t) => (
            <article
              key={t.id}
              className="min-w-[260px] overflow-hidden rounded-2xl border border-border"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="relative h-32">
                <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {t.area}
                    </p>
                  </div>
                  <div className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" /> {t.rating}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="text-base font-bold">₹{t.price}<span className="text-xs font-normal text-muted-foreground">/hr</span></p>
                  <p className="text-[11px] text-muted-foreground">{t.slots.filter(s => s.available).length} slots open</p>
                </div>
                <Link
                  to="/book-turf"
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
                >
                  Book
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
 
      {/* Upcoming matches */}
      <section className="mt-8">
        <SectionHeader title="Upcoming matches" />
        <div className="mt-3 space-y-3">
          {upcomingMatches.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-border p-4"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{m.title}</p>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Confirmed
                </span>
              </div>
              <p className="mt-2 text-base font-bold">{m.teams}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {m.time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {m.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* Tournaments */}
      <section className="mt-8">
        <SectionHeader title="Active tournaments" to="/tournaments" />
        <div className="mt-3 space-y-3">
          {activeTournaments.map((t) => (
            <Link
              key={t.id}
              to="/tournaments"
              className="flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-primary/50"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.format} · {t.teams} teams · {t.prize}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{t.status}</p>
                <ChevronRight className="ml-auto mt-1 h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
 
function SectionHeader({ title, to }: { title: string; to?: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      {to && (
        <Link to={to} className="text-xs font-semibold text-primary">
          See all
        </Link>
      )}
    </div>
  );
}