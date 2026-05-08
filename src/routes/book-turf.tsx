import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/book-turf")({
  head: () => ({ meta: [{ title: "Book Turf — PitchSide" }] }),
  component: () => (
    <AppShell subtitle="Coming next" title="Book a turf">
      <p className="mt-4 text-sm text-muted-foreground">
        Map view, live slots and instant payment land in the next module.
      </p>
    </AppShell>
  ),
});
