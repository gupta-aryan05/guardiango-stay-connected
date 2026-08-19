import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  buildEmergencyMessage,
  formatCoords,
  formatTime,
  mailtoLink,
  mapsLink,
  type Journey,
} from "@/lib/journey";

type Props = {
  journey: Journey;
  onClose: () => void;
};

export function EmergencyPanel({ journey, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const message = buildEmergencyMessage(journey);
  const link = mapsLink(journey.lastLocation);
  const mailto = mailtoLink(journey);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const el = document.createElement("textarea");
      el.value = message;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border bg-card p-6 shadow-card sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-destructive">Emergency alert</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Nothing has been sent automatically. Copy the message below or open your email app to
              send it.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-muted/40 p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Trusted contact
            </dt>
            <dd className="mt-1 font-semibold">{journey.contact.name}</dd>
            {journey.contact.email && (
              <dd className="text-sm text-muted-foreground">{journey.contact.email}</dd>
            )}
            {journey.contact.phone && (
              <dd className="text-sm text-muted-foreground">{journey.contact.phone}</dd>
            )}
          </div>
          <div className="rounded-xl border bg-muted/40 p-4">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Last known location
            </dt>
            <dd className="mt-1 font-mono text-sm">{formatCoords(journey.lastLocation)}</dd>
            <dd className="text-sm text-muted-foreground">
              {journey.lastLocation
                ? `Recorded ${formatTime(journey.lastLocation.timestamp)}`
                : "No location was captured on this device."}
            </dd>
          </div>
          <div className="rounded-xl border bg-muted/40 p-4 sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Check-in due at
            </dt>
            <dd className="mt-1 text-sm">{formatTime(journey.expiresAt)}</dd>
            <dd className="text-sm text-muted-foreground">
              Journey to {journey.destination} started {formatTime(journey.startedAt)}
            </dd>
          </div>
        </dl>

        <pre className="mt-6 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border bg-muted/40 p-4 text-sm">
          {message}
        </pre>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="emergency" size="lg" className="flex-1" onClick={copy}>
            {copied ? "Copied!" : "Copy emergency message"}
          </Button>
          {mailto && (
            <Button asChild variant="outline" size="lg" className="flex-1">
              <a href={mailto}>Email {journey.contact.name || "contact"}</a>
            </Button>
          )}
          {link && (
            <Button asChild variant="secondary" size="lg">
              <a href={link} target="_blank" rel="noreferrer">
                Open map
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
