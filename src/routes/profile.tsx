import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { MapPin, Settings, Check, X, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — PitchSide" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, update, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    city: user?.city ?? "",
    position: user?.position ?? "",
    age: user?.age ?? "",
    club: user?.club ?? "",
    bio: user?.bio ?? "",
  });

  if (!user) { navigate({ to: "/" }); return null; }

  const save = () => { update(form); setEditing(false); };
  const cancel = () => { setForm({ name: user.name, city: user.city, position: user.position, age: user.age, club: user.club, bio: user.bio }); setEditing(false); };
  const handleLogout = () => { logout(); navigate({ to: "/" }); };
  const initials = user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "?";

  return (
    <AppShell>
      <div className="-mx-5 -mt-px relative overflow-hidden rounded-b-[2rem] px-5 pt-12 pb-8" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex justify-end gap-2">
          {editing ? (
            <>
              <button onClick={cancel} className="rounded-full bg-white/5 p-2 backdrop-blur"><X className="h-4 w-4" /></button>
              <button onClick={save} className="rounded-full bg-primary/90 p-2 backdrop-blur"><Check className="h-4 w-4 text-primary-foreground" /></button>
            </>
          ) : (
            <>
              <button onClick={handleLogout} className="rounded-full bg-white/5 p-2 backdrop-blur"><LogOut className="h-4 w-4" /></button>
              <button onClick={() => setEditing(true)} className="rounded-full bg-white/5 p-2 backdrop-blur"><Settings className="h-4 w-4" /></button>
            </>
          )}
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="h-20 w-20 rounded-2xl ring-2 ring-primary bg-primary/20 flex items-center justify-center">
            <span className="text-2xl font-black text-primary">{initials}</span>
          </div>
          <div className="flex-1">
            {editing ? (
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full rounded-lg border border-primary/40 bg-white/5 px-3 py-1.5 text-xl font-black tracking-tight outline-none" />
            ) : (
              <h1 className="text-2xl font-black tracking-tight">{user.name || "—"}</h1>
            )}
            {editing ? (
              <div className="mt-1 flex gap-2">
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-1/2 rounded-lg border border-border bg-white/5 px-2 py-1 text-xs outline-none" />
                <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age" className="w-1/4 rounded-lg border border-border bg-white/5 px-2 py-1 text-xs outline-none" />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                {(user.city || user.age) ? (<>{user.city && <><MapPin className="h-3 w-3" />{user.city}</>}{user.city && user.age && " · "}{user.age && `Age ${user.age}`}</>) : (<span className="italic opacity-50">Tap settings to add location</span>)}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {editing ? (
                <>
                  <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Position" className="rounded-lg border border-border bg-white/5 px-2 py-1 text-xs outline-none" />
                  <input value={form.club} onChange={(e) => setForm({ ...form, club: e.target.value })} placeholder="Club name" className="rounded-lg border border-border bg-white/5 px-2 py-1 text-xs outline-none" />
                </>
              ) : (
                <>
                  {user.position && <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">{user.position}</span>}
                  {user.club && <span className="text-xs text-muted-foreground">⚽ {user.club}</span>}
                  {!user.position && !user.club && <span className="text-[10px] italic text-muted-foreground opacity-50">Tap settings to add position and club</span>}
                </>
              )}
            </div>
          </div>
        </div>
        {editing && <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short bio (optional)" rows={2} className="mt-4 w-full rounded-lg border border-border bg-white/5 px-3 py-2 text-xs outline-none resize-none" />}
        {!editing && user.bio && <p className="mt-4 text-xs text-muted-foreground italic">"{user.bio}"</p>}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary capitalize">{user.role}</span>
      </div>

      {user.role === "player" && (
        <section className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Career stats</p>
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Goals" value="—" />
            <Stat label="Assists" value="—" />
            <Stat label="Matches" value="—" />
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground italic opacity-60">Stats will appear after your first match.</p>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-bold tracking-tight">Recent matches</h2>
        <div className="mt-3 rounded-2xl border border-border p-6 text-center" style={{ background: "var(--gradient-card)" }}>
          <p className="text-sm text-muted-foreground">No matches logged yet.</p>
          <p className="text-xs text-muted-foreground opacity-60 mt-1">Book a turf and play to get started.</p>
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