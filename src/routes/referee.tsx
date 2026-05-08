import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  Goal, HandMetal, Square, ArrowLeftRight, Clock, X, Check, Star, Share2,
} from "lucide-react";

export const Route = createFileRoute("/referee")({
  head: () => ({ meta: [{ title: "Referee — Live Match" }] }),
  component: RefereePanel,
});

type Player = { id: string; name: string; number: number; pos: string };
type Team = { id: "A" | "B"; name: string; color: string; lineup: Player[] };

const teamA: Team = {
  id: "A", name: "Coastal FC", color: "oklch(0.78 0.22 145)",
  lineup: [
    { id: "a1", name: "R. Sharma", number: 1, pos: "GK" },
    { id: "a2", name: "K. Iyer", number: 4, pos: "DEF" },
    { id: "a3", name: "A. Mehta", number: 8, pos: "MID" },
    { id: "a4", name: "V. Khan", number: 10, pos: "MID" },
    { id: "a5", name: "S. Pillai", number: 9, pos: "FWD" },
    { id: "a6", name: "D. Rao", number: 7, pos: "FWD" },
  ],
};
const teamB: Team = {
  id: "B", name: "Eastside United", color: "oklch(0.7 0.18 25)",
  lineup: [
    { id: "b1", name: "J. Lobo", number: 1, pos: "GK" },
    { id: "b2", name: "T. Singh", number: 5, pos: "DEF" },
    { id: "b3", name: "M. Joshi", number: 6, pos: "MID" },
    { id: "b4", name: "P. Nair", number: 11, pos: "MID" },
    { id: "b5", name: "H. Desai", number: 9, pos: "FWD" },
    { id: "b6", name: "N. Verma", number: 7, pos: "FWD" },
  ],
};

type EventType = "goal" | "assist" | "yellow" | "red" | "sub";
type MatchEvent = { id: string; type: EventType; team: "A" | "B"; playerId: string; minute: number; ts: number };

const EVENTS: { type: EventType; label: string; Icon: typeof Goal; tone: string }[] = [
  { type: "goal", label: "Goal", Icon: Goal, tone: "bg-primary text-primary-foreground" },
  { type: "assist", label: "Assist", Icon: HandMetal, tone: "bg-primary/15 text-primary border border-primary/40" },
  { type: "yellow", label: "Yellow", Icon: Square, tone: "bg-yellow-400 text-black" },
  { type: "red", label: "Red", Icon: Square, tone: "bg-destructive text-destructive-foreground" },
  { type: "sub", label: "Sub", Icon: ArrowLeftRight, tone: "bg-secondary text-secondary-foreground" },
];

function RefereePanel() {
  const [started, setStarted] = useState(false);
  const [startTs, setStartTs] = useState<number>(0);
  const [tick, setTick] = useState(0);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [picker, setPicker] = useState<{ type: EventType; team: "A" | "B" } | null>(null);
  const [ended, setEnded] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // Tick clock
  useMemo(() => {
    if (!started || ended) return;
    const i = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, [started, ended]);

  const minute = started ? Math.floor((Date.now() - startTs) / 1000 / 60) + 1 : 0;
  // referencing tick keeps eslint quiet & forces re-render
  void tick;

  const score = {
    A: events.filter((e) => e.type === "goal" && e.team === "A").length,
    B: events.filter((e) => e.type === "goal" && e.team === "B").length,
  };

  const start = () => { setStarted(true); setStartTs(Date.now()); };

  const logEvent = (playerId: string) => {
    if (!picker) return;
    setEvents((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: picker.type, team: picker.team, playerId, minute, ts: Date.now() },
    ]);
    setPicker(null);
  };

  const finishMatch = () => setEnded(true);

  if (submitted) return <Submitted score={score} />;

  if (ended) {
    return (
      <RatingScreen
        teamA={teamA}
        teamB={teamB}
        ratings={ratings}
        setRatings={setRatings}
        score={score}
        onSubmit={() => setSubmitted(true)}
      />
    );
  }

  return (
    <AppShell>
      {/* Scoreboard */}
      <div className="-mx-5 px-5 pt-2 pb-5 rounded-b-[2rem]" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-white/5 px-2.5 py-1 font-semibold text-muted-foreground">
            Referee mode
          </span>
          <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-bold ${
            started ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${started ? "bg-primary-foreground animate-pulse" : "bg-muted-foreground"}`} />
            {started ? `LIVE · ${minute}'` : "Pre-match"}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <TeamHeader team={teamA} align="left" />
          <div className="text-center">
            <p className="text-5xl font-black tracking-tighter tabular-nums">
              {score.A}<span className="mx-2 text-muted-foreground">:</span>{score.B}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Match #PS-2031
            </p>
          </div>
          <TeamHeader team={teamB} align="right" />
        </div>

        {!started ? (
          <button
            onClick={start}
            className="mt-5 w-full rounded-2xl py-3.5 text-sm font-black text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            Kick off
          </button>
        ) : (
          <button
            onClick={finishMatch}
            className="mt-5 w-full rounded-2xl border border-destructive/40 bg-destructive/15 py-2.5 text-xs font-bold text-destructive"
          >
            End match & rate players
          </button>
        )}
      </div>

      {/* Event buttons */}
      <section className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Log event</p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {EVENTS.map(({ type, label, Icon, tone }) => (
            <div key={type} className="flex flex-col items-center gap-1">
              <div className="flex w-full gap-1">
                <button
                  disabled={!started}
                  onClick={() => setPicker({ type, team: "A" })}
                  className={`flex-1 rounded-l-xl py-3 text-[10px] font-black transition-opacity disabled:opacity-30 ${tone}`}
                  title={`${label} for ${teamA.name}`}
                >
                  A
                </button>
                <button
                  disabled={!started}
                  onClick={() => setPicker({ type, team: "B" })}
                  className={`flex-1 rounded-r-xl py-3 text-[10px] font-black transition-opacity disabled:opacity-30 ${tone}`}
                  title={`${label} for ${teamB.name}`}
                >
                  B
                </button>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                <Icon className="h-3 w-3" /> {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live timeline */}
      <section className="mt-7">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Live scorecard
          </p>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Share2 className="h-3 w-3" /> Public link
          </span>
        </div>
        {events.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
            No events yet. Tap a button above when something happens on the pitch.
          </div>
        ) : (
          <ol className="mt-3 space-y-2">
            {[...events].reverse().map((e) => {
              const team = e.team === "A" ? teamA : teamB;
              const player = team.lineup.find((p) => p.id === e.playerId);
              const meta = EVENTS.find((m) => m.type === e.type)!;
              return (
                <li key={e.id} className="flex items-center gap-3 rounded-xl border border-border p-3"
                    style={{ background: "var(--gradient-card)" }}>
                  <span className="grid h-9 w-9 place-items-center rounded-lg text-[10px] font-black tabular-nums"
                        style={{ background: team.color, color: "oklch(0.16 0.02 160)" }}>
                    {e.minute}'
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold">
                      {meta.label} · #{player?.number} {player?.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{team.name}</p>
                  </div>
                  <meta.Icon className="h-4 w-4 text-muted-foreground" />
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {/* Player picker sheet */}
      {picker && (
        <PlayerPicker
          team={picker.team === "A" ? teamA : teamB}
          eventType={picker.type}
          onPick={logEvent}
          onClose={() => setPicker(null)}
        />
      )}
    </AppShell>
  );
}

function TeamHeader({ team, align }: { team: Team; align: "left" | "right" }) {
  return (
    <div className={`flex flex-col items-${align === "left" ? "start" : "end"} gap-2`}>
      <div className="grid h-12 w-12 place-items-center rounded-xl text-base font-black"
           style={{ background: team.color, color: "oklch(0.16 0.02 160)" }}>
        {team.name.slice(0, 2).toUpperCase()}
      </div>
      <p className={`text-xs font-bold ${align === "right" ? "text-right" : ""}`}>{team.name}</p>
    </div>
  );
}

function PlayerPicker({ team, eventType, onPick, onClose }: {
  team: Team; eventType: EventType; onPick: (id: string) => void; onClose: () => void;
}) {
  const meta = EVENTS.find((e) => e.type === eventType)!;
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute bottom-0 left-1/2 w-full max-w-xl -translate-x-1/2 rounded-t-3xl border-t border-border p-5 pb-8"
        style={{ background: "var(--surface-elevated)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1.5 w-12 rounded-full bg-border" />
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/5 p-1.5">
          <X className="h-4 w-4" />
        </button>

        <div className="mt-3 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: team.color, color: "oklch(0.16 0.02 160)" }}>
            <meta.Icon className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{meta.label}</p>
            <p className="text-base font-black">{team.name} · pick player</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {team.lineup.map((p) => (
            <button
              key={p.id}
              onClick={() => onPick(p.id)}
              className="flex items-center gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary/60"
              style={{ background: "var(--gradient-card)" }}
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg text-sm font-black tabular-nums"
                    style={{ background: team.color, color: "oklch(0.16 0.02 160)" }}>
                {p.number}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{p.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.pos}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RatingScreen({ teamA, teamB, ratings, setRatings, score, onSubmit }: {
  teamA: Team; teamB: Team; ratings: Record<string, number>;
  setRatings: (r: Record<string, number>) => void;
  score: { A: number; B: number }; onSubmit: () => void;
}) {
  const all = [...teamA.lineup.map(p => ({ ...p, team: teamA })), ...teamB.lineup.map(p => ({ ...p, team: teamB }))];
  const allRated = all.every((p) => typeof ratings[p.id] === "number");

  return (
    <AppShell subtitle={`Final · ${score.A}–${score.B}`} title="Rate the players">
      <p className="text-xs text-muted-foreground">
        Tap 1–10 for every player. This drives their overall rating.
      </p>

      <div className="mt-5 space-y-6">
        {[teamA, teamB].map((team) => (
          <div key={team.id}>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md text-[11px] font-black"
                    style={{ background: team.color, color: "oklch(0.16 0.02 160)" }}>
                {team.name.slice(0, 2).toUpperCase()}
              </span>
              <p className="text-sm font-bold">{team.name}</p>
            </div>

            <div className="mt-3 space-y-2">
              {team.lineup.map((p) => (
                <div key={p.id} className="rounded-xl border border-border p-3"
                     style={{ background: "var(--gradient-card)" }}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">#{p.number} {p.name}</p>
                    <span className={`text-sm font-black ${ratings[p.id] ? "text-primary" : "text-muted-foreground"}`}>
                      {ratings[p.id]?.toFixed(1) ?? "—"}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-10 gap-1">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                      const active = ratings[p.id] === n;
                      return (
                        <button
                          key={n}
                          onClick={() => setRatings({ ...ratings, [p.id]: n })}
                          className={`rounded-md py-1.5 text-[11px] font-bold transition-colors ${
                            active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={!allRated}
        onClick={onSubmit}
        className="mt-6 w-full rounded-2xl py-3.5 text-sm font-black text-primary-foreground transition-opacity disabled:opacity-40"
        style={allRated ? { background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" } : {}}
      >
        {allRated ? "Submit final scorecard" : `Rate all players (${all.filter(p => ratings[p.id]).length}/${all.length})`}
      </button>
    </AppShell>
  );
}

function Submitted({ score }: { score: { A: number; B: number } }) {
  return (
    <AppShell>
      <div className="mt-12 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full"
             style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
          <Check className="h-8 w-8 text-primary-foreground" strokeWidth={3} />
        </div>
        <h1 className="mt-4 text-2xl font-black">Scorecard submitted</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Final score {score.A}–{score.B}. Player ratings have been pushed to their profiles.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <Link to="/home" className="rounded-2xl px-5 py-3 text-sm font-black text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}>
            Back to home
          </Link>
        </div>

        <p className="mt-6 text-[11px] text-muted-foreground flex items-center justify-center gap-1">
          <Clock className="h-3 w-3" /> Match record archived · <Star className="h-3 w-3" /> Ratings live
        </p>
      </div>
    </AppShell>
  );
}
