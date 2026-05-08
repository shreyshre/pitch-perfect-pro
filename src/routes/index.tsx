import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Flag, Video } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PitchSide — The premium football app" },
      { name: "description", content: "Book turfs, track stats, run tournaments. Built for players, referees and cameramen." },
    ],
  }),
  component: SplashLogin,
});

const roles = [
  { id: "player", label: "Player", desc: "Track stats, join clubs, book turfs", Icon: User },
  { id: "referee", label: "Referee", desc: "Run live matches, rate performances", Icon: Flag },
  { id: "cameraman", label: "Cameraman", desc: "Get booked, upload highlights", Icon: Video },
] as const;

function SplashLogin() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-6 pt-20 pb-10">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl shadow-[var(--shadow-glow)]"
               style={{ background: "var(--gradient-primary)" }}>
            <span className="text-xl font-black text-primary-foreground">P</span>
          </div>
          <span className="text-lg font-bold tracking-tight">PitchSide</span>
        </div>

        <div className="mt-16 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Matchday, every day</p>
          <h1 className="mt-3 text-5xl font-black leading-[1.05] tracking-tight">
            The home of <span className="text-primary">grassroots</span> football.
          </h1>
          <p className="mt-4 max-w-sm text-base text-muted-foreground">
            Book pitches, run leagues, and grow your game with stats refs actually rate.
          </p>

          <div className="mt-12 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sign up as</p>
            {roles.map(({ id, label, desc, Icon }) => (
              <Link
                key={id}
                to="/home"
                className="group flex items-center gap-4 rounded-2xl border border-border p-4 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Already a member? <Link to="/home" className="font-semibold text-primary">Log in</Link>
        </p>
      </div>
    </div>
  );
}
