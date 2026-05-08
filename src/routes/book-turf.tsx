import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { nearbyTurfs } from "@/lib/mockData";
import { MapPin, Star, Clock, Users, X, Minus, Plus, Check, Share2 } from "lucide-react";

export const Route = createFileRoute("/book-turf")({
  head: () => ({ meta: [{ title: "Book Turf — PitchSide" }] }),
  component: BookTurfPage,
});

type Turf = (typeof nearbyTurfs)[number];
type Step = "map" | "checkout" | "confirmed";

function BookTurfPage() {
  const [selected, setSelected] = useState<Turf | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [players, setPlayers] = useState(10);
  const [step, setStep] = useState<Step>("map");

  const reset = () => { setSelected(null); setSlot(null); setStep("map"); };

  const proceed = () => slot && setStep("checkout");
  const pay = () => setStep("confirmed");

  return (
    <AppShell subtitle="Mumbai · Today" title="Book a turf">
      {/* Map */}
      <div className="relative mt-2 h-[360px] overflow-hidden rounded-3xl border border-border"
           style={{ background: "var(--gradient-hero)" }}>
        {/* fake grid */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        {/* fake roads */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-primary/20" />
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-primary/20" />

        {nearbyTurfs.map((t) => {
          const open = t.slots.filter(s => s.available).length;
          const isSelected = selected?.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => { setSelected(t); setSlot(null); }}
              className="absolute -translate-x-1/2 -translate-y-full focus:outline-none"
              style={{ left: `${t.x}%`, top: `${t.y}%` }}
            >
              <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-[var(--shadow-glow)] transition-transform ${
                isSelected ? "scale-110 bg-primary text-primary-foreground"
                : "bg-[var(--surface-elevated)] text-foreground border border-primary/40"
              }`}>
                <MapPin className="h-3 w-3" />
                ₹{t.price}
              </div>
              <div className={`mx-auto mt-0.5 h-2 w-2 rotate-45 ${isSelected ? "bg-primary" : "bg-primary/60"}`} />
              <p className="mt-1 text-[10px] font-semibold text-foreground/80 whitespace-nowrap">
                {open} open
              </p>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
        Tap a pin to view slots · {nearbyTurfs.length} turfs nearby
      </p>

      {/* Detail / checkout sheet */}
      {selected && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={reset}>
          <div
            className="absolute bottom-0 left-1/2 w-full max-w-xl -translate-x-1/2 rounded-t-3xl border-t border-border p-5 pb-8"
            style={{ background: "var(--surface-elevated)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-border" />
            <button onClick={reset} className="absolute right-4 top-4 rounded-full bg-white/5 p-1.5">
              <X className="h-4 w-4" />
            </button>

            {step === "confirmed" ? (
              <Confirmed turf={selected} slot={slot!} players={players} onClose={reset} />
            ) : step === "checkout" ? (
              <Checkout
                turf={selected}
                slot={slot!}
                players={players}
                setPlayers={setPlayers}
                onBack={() => setStep("map")}
                onPay={pay}
              />
            ) : (
              <SlotPicker turf={selected} slot={slot} setSlot={setSlot} onProceed={proceed} />
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function SlotPicker({ turf, slot, setSlot, onProceed }: {
  turf: Turf; slot: string | null; setSlot: (s: string) => void; onProceed: () => void;
}) {
  return (
    <div className="mt-3">
      <div className="overflow-hidden rounded-2xl">
        <img src={turf.image} alt={turf.name} className="h-36 w-full object-cover" />
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight">{turf.name}</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" /> {turf.area}
          </p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary">
            <Star className="h-3 w-3 fill-current" /> {turf.rating}
          </div>
          <p className="mt-1 text-base font-black">₹{turf.price}<span className="text-xs font-normal text-muted-foreground">/hr</span></p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-bold flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-primary" /> Today's slots
        </p>
        <span className="text-[11px] text-muted-foreground">
          {turf.slots.filter(s => s.available).length} of {turf.slots.length} open
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {turf.slots.map((s) => {
          const active = slot === s.time;
          return (
            <button
              key={s.time}
              disabled={!s.available}
              onClick={() => setSlot(s.time)}
              className={`relative rounded-xl border py-2.5 text-sm font-bold transition-all ${
                !s.available
                  ? "border-border bg-muted/30 text-muted-foreground/50 line-through cursor-not-allowed"
                  : active
                  ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "border-border bg-[var(--surface)] text-foreground hover:border-primary/60"
              }`}
            >
              {s.time}
            </button>
          );
        })}
      </div>

      <button
        disabled={!slot}
        onClick={onProceed}
        className="mt-6 w-full rounded-2xl bg-primary py-3.5 text-sm font-black text-primary-foreground transition-opacity disabled:opacity-40"
        style={slot ? { background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" } : {}}
      >
        {slot ? `Continue with ${slot}` : "Pick a slot"}
      </button>
    </div>
  );
}

function Checkout({ turf, slot, players, setPlayers, onBack, onPay }: {
  turf: Turf; slot: string; players: number; setPlayers: (n: number) => void;
  onBack: () => void; onPay: () => void;
}) {
  const total = turf.price; // 1 hour
  const perPlayer = Math.ceil(total / players);

  return (
    <div className="mt-3">
      <button onClick={onBack} className="text-xs font-semibold text-primary">← Back to slots</button>

      <h2 className="mt-3 text-xl font-black tracking-tight">Confirm booking</h2>

      <div className="mt-4 rounded-2xl border border-border p-4" style={{ background: "var(--gradient-card)" }}>
        <p className="text-sm font-bold">{turf.name}</p>
        <p className="text-xs text-muted-foreground">{turf.area}</p>
        <div className="mt-3 flex items-center gap-3 text-xs">
          <span className="rounded-md bg-primary/15 px-2 py-1 font-bold text-primary">Today · {slot}</span>
          <span className="text-muted-foreground">1 hour</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-bold flex items-center gap-1.5">
          <Users className="h-4 w-4 text-primary" /> Number of players
        </p>
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-border p-2"
             style={{ background: "var(--surface)" }}>
          <button
            onClick={() => setPlayers(Math.max(2, players - 1))}
            className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary disabled:opacity-30"
            disabled={players <= 2}
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="text-center">
            <p className="text-3xl font-black">{players}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">players</p>
          </div>
          <button
            onClick={() => setPlayers(Math.min(22, players + 1))}
            className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary disabled:opacity-30"
            disabled={players >= 22}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[6, 10, 14, 22].map((n) => (
            <button
              key={n}
              onClick={() => setPlayers(n)}
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${
                players === n ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {n === 6 ? "5-a-side" : n === 10 ? "5v5" : n === 14 ? "7-a-side" : "11-a-side"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-1.5 rounded-2xl border border-border p-4" style={{ background: "var(--gradient-card)" }}>
        <Row label="Turf rate (1 hr)" value={`₹${total}`} />
        <Row label="Split per player" value={`₹${perPlayer}`} />
        <div className="my-2 h-px bg-border" />
        <Row label="Total" value={`₹${total}`} bold />
      </div>

      <button
        onClick={onPay}
        className="mt-5 w-full rounded-2xl py-3.5 text-sm font-black text-primary-foreground"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
      >
        Pay ₹{total} & confirm
      </button>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={bold ? "font-bold" : "text-muted-foreground"}>{label}</span>
      <span className={bold ? "text-base font-black text-primary" : "font-semibold"}>{value}</span>
    </div>
  );
}

function Confirmed({ turf, slot, players, onClose }: { turf: Turf; slot: string; players: number; onClose: () => void }) {
  const code = `PS-${turf.id.toUpperCase()}-${slot.replace(":", "")}`;
  const link = `pitchside.app/m/${code}`;
  return (
    <div className="mt-3 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full"
           style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
        <Check className="h-8 w-8 text-primary-foreground" strokeWidth={3} />
      </div>
      <h2 className="mt-4 text-2xl font-black tracking-tight">Booking confirmed</h2>
      <p className="text-xs text-muted-foreground mt-1">{code}</p>

      <div className="mt-5 rounded-2xl border border-border p-4 text-left" style={{ background: "var(--gradient-card)" }}>
        <p className="text-sm font-bold">{turf.name}</p>
        <p className="text-xs text-muted-foreground">{turf.area}</p>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <Mini label="Today" value={slot} />
          <Mini label="Players" value={String(players)} />
          <Mini label="Paid" value={`₹${turf.price}`} />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigator.clipboard?.writeText(link)}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 py-3 text-sm font-bold text-primary"
        >
          <Share2 className="h-4 w-4" /> Share invite
        </button>
        <Link to="/home" onClick={onClose} className="flex-1 rounded-2xl py-3 text-center text-sm font-black text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}>
          Done
        </Link>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-black">{value}</p>
    </div>
  );
}
