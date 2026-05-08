import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/club")({
  head: () => ({ meta: [{ title: "My Club — PitchSide" }] }),
  component: () => (
    <AppShell subtitle="Coming next" title="My Club">
      <p className="mt-4 text-sm text-muted-foreground">
        Create or join a club, manage members and view club match history.
      </p>
    </AppShell>
  ),
});
