import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
  formatCoords,
  formatCountdown,
  formatTime,
  mapsLink,
  type Coords,
  type Journey,
} from "@/lib/journey";

type Props = {
  journey: Journey;
  onCheckIn: () => void;
  onEndJourney: () => void;
  onEmergency: () => void;
  onLocationUpdate: (coords: Coords) => void;
};

export function ActiveJourney({
  journey,
  onCheckIn,
  onEndJourney,
  onEmergency,
  onLocationUpdate,
}: Props) {
  const [now, setNow] = useState(() => Date.now());
  const geo = useGeolocation(true);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (geo.coords) onLocationUpdate(geo.coords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.coords?.lat, geo.coords?.lng, geo.coords?.timestamp]);

  const remaining = journey.expiresAt - now;
  const missed = remaining <= 0;
  const location = geo.coords ?? journey.lastLocation;
  const link = mapsLink(location);
  const progress = Math.max(
    0,
    Math.min(100, (remaining / (journey.durationMinutes * 60 * 1000)) * 100),
  );

  useEffect(() => {
    if (missed) onEmergency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missed]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div
        className={`rounded-2xl border p-6 shadow-card sm:p-8 ${
          missed ? "border-destructive bg-destructive/5" : "bg-card"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Journey status</p>
            <h2 className={`text-2xl font-bold ${missed ? "text-destructive" : "text-safe"}`}>
              {missed ? "CHECK-IN MISSED" : "Journey active"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              To {journey.destination} · started {formatTime(journey.startedAt)}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              missed
                ? "bg-destructive text-destructive-foreground"
                : "bg-safe/15 text-safe shadow-glow"
            }`}
          >
            {missed ? "Emergency" : "Monitoring"}
          </span>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {missed ? "Overdue by" : "Check in within"}
          </p>
          <p
            className={`font-display text-6xl font-bold tabular-nums sm:text-7xl ${
              missed ? "text-destructive" : "text-foreground"
            }`}
          >
            {formatCountdown(Math.abs(remaining))}
          </p>
          <div className="mx-auto mt-4 h-2 w-full max-w-sm overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full transition-all duration-1000 ${
                missed ? "bg-destructive" : "bg-safe-gradient"
              }`}
              style={{ width: `${missed ? 100 : progress}%` }}
            />
          </div>
          {journey.checkIns > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {journey.checkIns} check-in{journey.checkIns > 1 ? "s" : ""} so far
            </p>
          )}
        </div>

        {missed && (
          <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            <p className="font-semibold text-destructive">You missed your check-in.</p>
            <p className="mt-1 text-muted-foreground">
              Open the emergency panel to alert {journey.contact.name}. GuardianGo cannot send
              messages for you — you or someone nearby must send it.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Button variant="safe" size="xl" onClick={onCheckIn}>
            I'm safe — reset timer
          </Button>
          <Button variant="emergency" size="xl" onClick={onEmergency}>
            Emergency
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-card">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Current location</p>
        <p className="mt-1 font-mono text-sm">{formatCoords(location)}</p>
        {location && (
          <p className="text-xs text-muted-foreground">
            Updated {formatTime(location.timestamp)}
            {location.accuracy ? ` · ±${Math.round(location.accuracy)}m` : ""}
          </p>
        )}
        {geo.error && <p className="mt-2 text-sm text-destructive">{geo.error}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          {link ? (
            <Button asChild variant="outline">
              <a href={link} target="_blank" rel="noreferrer">
                View location on Google Maps
              </a>
            </Button>
          ) : (
            <Button variant="outline" onClick={geo.refresh}>
              Retry location
            </Button>
          )}
          <Button variant="ghost" onClick={geo.refresh}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-card">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Trusted contact</p>
        <p className="mt-1 font-semibold">{journey.contact.name}</p>
        <p className="text-sm text-muted-foreground">
          {[journey.contact.email, journey.contact.phone].filter(Boolean).join(" · ")}
        </p>
        <Button variant="ghost" className="mt-4" onClick={onEndJourney}>
          End journey
        </Button>
      </div>
    </div>
  );
}
