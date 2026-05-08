import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { currentPlayer, recentMatches } from "@/lib/mockData";
import { MapPin, Settings } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — PitchSide" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const p = currentPlayer;
  return (
    <AppShell>
      <div className="-mx-5 -mt-px relative overflow-hidden rounded-b-[2rem] px-5 pt-12 pb-8"
           style={{ background: "var(--gradient-hero)" }}>
        <div className="flex justify-end">
          <button className="rounded-full bg-white/5 p-2 backdrop-blur"><Settings className="h-4 w-4" /></button>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative">
            <img src={p.photo} alt={p.name} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary" />
            <span className="absolute -bottom-2 -right-2 rounded-lg bg-primary px-2 py-0.5 text-xs font-black text-primary-foreground shadow-[var(--shadow-glow)]">
              {p.rating.toFixed(1)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">{p.name}</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <MapPin className="h-3 w-3" /> {p.city} · Age {p.age}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                {p.position}
              </span>
              <span className="text-xs text-muted-foreground">{p.club.badge} {p.club.name}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="Goals" value={p.goals} />
        <Stat label="Assists" value={p.assists} />
        <Stat label="Matches" value={p.matchesPlayed} />
      </section>

      <section className="mt-3 grid grid-cols-3 gap-3">
        <Stat label="Yellow" value={p.yellowCards} accent="text-yellow-400" />
        <Stat label="Red" value={p.redCards} accent="text-destructive" />
        <Stat label="Rating" value={p.rating.toFixed(1)} accent="text-primary" />
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold tracking-tight">Recent matches</h2>
        <div className="mt-3 space-y-2">
          {recentMatches.map((m) => (
            <Link
              key={m.id}
              to="/home"
              className="flex items-center gap-3 rounded-xl border border-border p-3"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className={`grid h-10 w-10 place-items-center rounded-lg text-sm font-black ${
                m.result === "W" ? "bg-primary/15 text-primary"
                : m.result === "L" ? "bg-destructive/15 text-destructive"
                : "bg-muted text-muted-foreground"
              }`}>
                {m.result}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">vs {m.opponent}</p>
                <p className="text-[11px] text-muted-foreground">{m.date} · {m.goals}G {m.assists}A</p>
              </div>
              <div className="text-right">
                <p className="text-base font-black">{m.score}</p>
                <p className="text-[11px] font-bold text-primary">{m.rating.toFixed(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ label, value, accent = "text-foreground" }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-xl border border-border p-3 text-center" style={{ background: "var(--gradient-card)" }}>
      <p className={`text-2xl font-black ${accent}`}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
