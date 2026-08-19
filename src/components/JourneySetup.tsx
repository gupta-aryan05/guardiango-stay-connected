import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Journey, TrustedContact } from "@/lib/journey";
import { getCurrentLocation } from "@/hooks/useGeolocation";

const DURATIONS = [15, 30, 45, 60];

type Props = {
  onStart: (journey: Journey) => void;
  onCancel: () => void;
};

export function JourneySetup({ onStart, onCancel }: Props) {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(30);
  const [contact, setContact] = useState<TrustedContact>({ name: "", email: "", phone: "" });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!destination.trim()) return setError("Please enter a destination.");
    if (!contact.name.trim()) return setError("Please enter a trusted contact name.");
    if (!contact.email.trim() && !contact.phone.trim())
      return setError("Add at least an email or a phone number for your contact.");

    setStarting(true);
    setNotice("Requesting your location…");
    const coords = await getCurrentLocation();
    setStarting(false);
    if (!coords) {
      setNotice("Location unavailable — starting without it. You can retry from the dashboard.");
    }

    const now = Date.now();
    onStart({
      id: `${now}`,
      destination: destination.trim(),
      durationMinutes: duration,
      contact: {
        name: contact.name.trim(),
        email: contact.email.trim(),
        phone: contact.phone.trim(),
      },
      startedAt: now,
      expiresAt: now + duration * 60 * 1000,
      lastLocation: coords,
      checkIns: 0,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl rounded-2xl border bg-card p-6 shadow-card sm:p-8"
    >
      <h2 className="text-2xl font-bold">Set up your journey</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        We'll ask you to check in before the timer runs out.
      </p>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            placeholder="e.g. Home from campus library"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Check-in window</Label>
          <div className="grid grid-cols-4 gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuration(d)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  duration === d
                    ? "border-safe bg-safe text-safe-foreground"
                    : "bg-background hover:bg-accent"
                }`}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-xl border bg-muted/40 p-4">
          <p className="text-sm font-semibold">Trusted contact</p>
          <div className="space-y-2">
            <Label htmlFor="cname">Name</Label>
            <Input
              id="cname"
              placeholder="Full name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cemail">Email</Label>
              <Input
                id="cemail"
                type="email"
                placeholder="name@example.com"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cphone">Phone</Label>
              <Input
                id="cphone"
                type="tel"
                placeholder="+1 555 0100"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        {notice && <p className="text-sm text-muted-foreground">{notice}</p>}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="hero" size="xl" className="flex-1" disabled={starting}>
            {starting ? "Getting location…" : "Start journey"}
          </Button>
          <Button type="button" variant="outline" size="xl" onClick={onCancel}>
            Back
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          GuardianGo does not send SMS or calls. If a check-in is missed, it prepares an alert
          message for you to send from your own email or messaging app.
        </p>
      </div>
    </form>
  );
}
