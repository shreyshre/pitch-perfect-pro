import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { activeTournaments } from "@/lib/mockData";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/tournaments")({
  head: () => ({ meta: [{ title: "Tournaments — PitchSide" }] }),
  component: () => (
    <AppShell subtitle="Open & ongoing" title="Tournaments">
      <div className="mt-4 space-y-3">
        {activeTournaments.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border p-4" style={{ background: "var(--gradient-card)" }}>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.format} · {t.teams} teams</p>
              </div>
              <p className="text-sm font-black text-primary">{t.prize}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                {t.status}
              </span>
              <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                View bracket
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  ),
});
