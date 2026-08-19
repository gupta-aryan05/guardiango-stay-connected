import { useCallback, useEffect, useRef, useState } from "react";
import type { Coords } from "@/lib/journey";

export type GeoState = {
  coords: Coords | null;
  error: string | null;
  loading: boolean;
};

function messageFor(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return "Location permission denied. You can still use GuardianGo, but no location will be shared.";
    case err.POSITION_UNAVAILABLE:
      return "Location is currently unavailable on this device.";
    case err.TIMEOUT:
      return "Timed out while getting your location.";
    default:
      return "Could not get your location.";
  }
}

/** Watches the device location. Fails gracefully when denied/unavailable. */
export function useGeolocation(active: boolean) {
  const [state, setState] = useState<GeoState>({
    coords: null,
    error: null,
    loading: false,
  });
  const watchId = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (watchId.current !== null && typeof navigator !== "undefined") {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setState({
        coords: null,
        error: "Geolocation is not supported by this browser.",
        loading: false,
      });
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null }));
    stop();
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          coords: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            timestamp: pos.timestamp,
          },
          error: null,
          loading: false,
        });
      },
      (err) => {
        setState((s) => ({ ...s, error: messageFor(err), loading: false }));
      },
      { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 },
    );
  }, [stop]);

  useEffect(() => {
    if (active) start();
    else stop();
    return stop;
  }, [active, start, stop]);

  return { ...state, refresh: start };
}

/** One-shot location request, resolves null on failure. */
export function getCurrentLocation(): Promise<Coords | null> {
  if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 15000 },
    );
  });
}
