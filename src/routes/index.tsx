import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Landing } from "@/components/Landing";
import { JourneySetup } from "@/components/JourneySetup";
import { ActiveJourney } from "@/components/ActiveJourney";
import { EmergencyPanel } from "@/components/EmergencyPanel";
import {
  clearJourney,
  loadJourney,
  saveJourney,
  type Coords,
  type Journey,
} from "@/lib/journey";

const TITLE = "GuardianGo — Your journey. Your check-in. Your safety.";
const DESCRIPTION =
  "GuardianGo is a personal safety check-in timer: set a journey, share your live location with a trusted contact, and get a ready-to-send alert if you miss a check-in.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

type Screen = "landing" | "setup" | "active";

function Index() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [journey, setJourney] = useState<Journey | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadJourney();
    if (stored) {
      setJourney(stored);
      setScreen("active");
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Journey | null) => {
    setJourney(next);
    if (next) saveJourney(next);
    else clearJourney();
  }, []);

  const handleStart = (next: Journey) => {
    persist(next);
    setShowEmergency(false);
    setScreen("active");
  };

  const handleCheckIn = () => {
    if (!journey) return;
    persist({
      ...journey,
      expiresAt: Date.now() + journey.durationMinutes * 60 * 1000,
      checkIns: journey.checkIns + 1,
    });
    setShowEmergency(false);
  };

  const handleLocationUpdate = useCallback(
    (coords: Coords) => {
      setJourney((current) => {
        if (!current) return current;
        const next = { ...current, lastLocation: coords };
        saveJourney(next);
        return next;
      });
    },
    [],
  );

  const handleEnd = () => {
    persist(null);
    setShowEmergency(false);
    setScreen("landing");
  };

  return (
    <main className="min-h-screen bg-background">
      {!hydrated ? (
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Loading GuardianGo…
        </div>
      ) : screen === "landing" ? (
        <Landing onStart={() => setScreen("setup")} />
      ) : screen === "setup" ? (
        <div className="px-4 py-12">
          <JourneySetup onStart={handleStart} onCancel={() => setScreen("landing")} />
        </div>
      ) : journey ? (
        <div className="px-4 py-10">
          <ActiveJourney
            journey={journey}
            onCheckIn={handleCheckIn}
            onEndJourney={handleEnd}
            onEmergency={() => setShowEmergency(true)}
            onLocationUpdate={handleLocationUpdate}
          />
        </div>
      ) : null}

      {showEmergency && journey && (
        <EmergencyPanel journey={journey} onClose={() => setShowEmergency(false)} />
      )}
    </main>
  );
}
