export type Coords = {
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp: number;
};

export type TrustedContact = {
  name: string;
  email: string;
  phone: string;
};

export type Journey = {
  id: string;
  destination: string;
  durationMinutes: number;
  contact: TrustedContact;
  startedAt: number;
  /** timestamp when the current check-in window expires */
  expiresAt: number;
  lastLocation: Coords | null;
  checkIns: number;
};

const STORAGE_KEY = "guardiango.activeJourney";

export function loadJourney(): Journey | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Journey;
    if (!parsed || typeof parsed.expiresAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveJourney(journey: Journey) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(journey));
}

export function clearJourney() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function mapsLink(coords: Coords | null): string | null {
  if (!coords) return null;
  return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
}

export function formatCoords(coords: Coords | null): string {
  if (!coords) return "Location unavailable";
  return `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleString();
}

export function formatCountdown(msRemaining: number): string {
  const total = Math.max(0, Math.floor(msRemaining / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function buildEmergencyMessage(journey: Journey): string {
  const link = mapsLink(journey.lastLocation);
  return [
    `GUARDIANGO SAFETY ALERT`,
    ``,
    `${journey.contact.name || "Trusted contact"}, this is an automated safety message generated on my device.`,
    `I started a journey to "${journey.destination}" and did not check in within ${journey.durationMinutes} minutes.`,
    ``,
    `Check-in was due: ${formatTime(journey.expiresAt)}`,
    `Last known location: ${formatCoords(journey.lastLocation)}`,
    journey.lastLocation
      ? `Recorded at: ${formatTime(journey.lastLocation.timestamp)}`
      : `Location was not available on my device.`,
    link ? `Map: ${link}` : ``,
    ``,
    `Please try to contact me.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function smsLink(journey: Journey): string | null {
  if (!journey.contact.phone) return null;
  const number = journey.contact.phone.replace(/[^\d+]/g, "");
  if (!number) return null;
  // "?&body=" is the cross-platform (iOS + Android) form for prefilled SMS text
  return `sms:${number}?&body=${encodeURIComponent(buildEmergencyMessage(journey))}`;
}

export function telLink(journey: Journey): string | null {
  const number = journey.contact.phone.replace(/[^\d+]/g, "");
  return number ? `tel:${number}` : null;
}

export const SAFETY_TIPS = [
  {
    title: "Share your route, not just your arrival",
    body: "Tell your trusted contact the road or transport you plan to take, so a search starts in the right place.",
  },
  {
    title: "Keep one earbud out",
    body: "Hearing traffic and footsteps matters more than your playlist on a quiet street.",
  },
  {
    title: "Stay on lit, busy paths",
    body: "A longer route past open shops beats a shortcut through an empty park or alley.",
  },
  {
    title: "Keep your phone charged above 30%",
    body: "Your location link is only useful while the device is alive. Carry a power bank on long trips.",
  },
  {
    title: "Trust the early instinct",
    body: "If something feels off, step into a shop, cafe or petrol station and call someone.",
  },
  {
    title: "Check in more often at night",
    body: "Pick a 15-minute timer after dark and reset it each time you reach a landmark.",
  },
];

export function mailtoLink(journey: Journey): string | null {
  if (!journey.contact.email) return null;
  const subject = `GuardianGo alert: missed check-in (${journey.destination})`;
  return `mailto:${encodeURIComponent(journey.contact.email)}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(buildEmergencyMessage(journey))}`;
}
