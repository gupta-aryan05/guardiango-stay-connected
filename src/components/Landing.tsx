import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    title: "Set a check-in timer",
    body: "Pick 15, 30, 45 or 60 minutes for your trip and add one trusted contact.",
  },
  {
    title: "Real GPS location",
    body: "Your browser's location is tracked locally so a map link is always ready.",
  },
  {
    title: "Miss a check-in?",
    body: "GuardianGo prepares an alert with your last known location to send instantly.",
  },
];

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <section className="bg-hero-gradient px-4 py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-primary-foreground/30 px-4 py-1 text-xs font-medium uppercase tracking-widest">
            Safety Net
          </span>
          <h1 className="mt-6 text-5xl font-bold sm:text-6xl">GuardianGo</h1>
          <p className="mt-4 text-lg opacity-90 sm:text-xl">
            Your journey. Your check-in. Your safety.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm opacity-80">
            A personal check-in timer for walking home, late shifts and solo trips. If you don't
            check in, GuardianGo hands you a ready-to-send alert with your last known location.
          </p>
          <div className="mt-10">
            <Button variant="hero" size="xl" onClick={onStart}>
              Start Safe Journey
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border bg-card p-6 shadow-card">
              <h2 className="text-lg font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted-foreground">
          GuardianGo never sends SMS or places calls on your behalf, and it is not a replacement for
          emergency services. In an emergency, call your local emergency number.
        </p>
      </section>
    </div>
  );
}
