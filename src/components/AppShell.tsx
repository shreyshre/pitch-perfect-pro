import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppShell({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-xl">
        {(title || subtitle) && (
          <header className="px-5 pt-8 pb-4">
            {subtitle && <p className="text-xs uppercase tracking-[0.2em] text-primary/80">{subtitle}</p>}
            {title && <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>}
          </header>
        )}
        <main className="px-5">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
