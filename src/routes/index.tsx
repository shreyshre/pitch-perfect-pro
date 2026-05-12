import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { User, Flag, Video } from "lucide-react";
import { useAuth, Role } from "@/hooks/useAuth";
 
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
  { id: "player" as Role, label: "Player", desc: "Track stats, join clubs, book turfs", Icon: User },
  { id: "referee" as Role, label: "Referee", desc: "Run live matches, rate performances", Icon: Flag },
  { id: "cameraman" as Role, label: "Cameraman", desc: "Get booked, upload highlights", Icon: Video },
];
 
function SplashLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"splash" | "signup" | "login">("splash");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
 
  const handleSignup = (role: Role) => {
    setSelectedRole(role);
    setMode("signup");
  };
 
  const handleSubmit = () => {
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!selectedRole) return;
    login({
      name: name.trim(),
      role: selectedRole,
      city: "",
      position: "",
      age: "",
      club: "",
      bio: "",
      photo: "",
    });
    navigate({ to: "/home" });
  };
 
  const handleLogin = () => {
    if (!name.trim()) { setError("Please enter your name"); return; }
    login({
      name: name.trim(),
      role: selectedRole ?? "player",
      city: "",
      position: "",
      age: "",
      club: "",
      bio: "",
      photo: "",
    });
    navigate({ to: "/home" });
  };
 
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
 
        {mode === "splash" && (
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
                <button
                  key={id}
                  onClick={() => handleSignup(id)}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-border p-4 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
                  style={{ background: "var(--gradient-card)" }}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </button>
              ))}
            </div>
 
            <p className="mt-10 text-center text-xs text-muted-foreground">
              Already a member?{" "}
              <button onClick={() => setMode("login")} className="font-semibold text-primary">Log in</button>
            </p>
          </div>
        )}
 
        {mode === "signup" && (
          <div className="mt-16 flex-1">
            <button onClick={() => setMode("splash")} className="text-xs font-semibold text-primary mb-6">← Back</button>
            <h1 className="text-4xl font-black tracking-tight">
              Sign up as <span className="text-primary capitalize">{selectedRole}</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">You can fill in the rest of your profile later.</p>
 
            <div className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                  placeholder="e.g. Rahul Sharma"
                  className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm font-medium outline-none focus:border-primary"
                />
                {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
              </div>
 
              <button
                onClick={handleSubmit}
                className="w-full rounded-2xl py-3.5 text-sm font-black text-primary-foreground"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                Create account →
              </button>
            </div>
          </div>
        )}
 
        {mode === "login" && (
          <div className="mt-16 flex-1">
            <button onClick={() => setMode("splash")} className="text-xs font-semibold text-primary mb-6">← Back</button>
            <h1 className="text-4xl font-black tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter your name to continue.</p>
 
            <div className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                  placeholder="e.g. Rahul Sharma"
                  className="mt-2 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm font-medium outline-none focus:border-primary"
                />
                {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
              </div>
 
              <button
                onClick={handleLogin}
                className="w-full rounded-2xl py-3.5 text-sm font-black text-primary-foreground"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                Log in →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}