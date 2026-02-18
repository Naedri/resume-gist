import type { TelemetryEvent } from "@/types";
import { useCallback } from "react";

function getSessionId() {
  try {
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
      sessionStorage.setItem("session_id", sessionId);
    }
    return sessionId;
  } catch {
    return "unknown";
  }
}

export function useTelemetry() {
  const send = useCallback(
    (event: TelemetryEvent, data?: Record<string, unknown>) => {
      const url = import.meta.env.VITE_TELEMETRY_URL;

      if (url) {
        const payload = {
          event,
          ...data,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          sessionId: getSessionId()
        };

        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(payload)], {
            type: "application/json"
          });
          navigator.sendBeacon(url, blob);
        } else {
          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true
          }).catch((err) => console.error("Telemetry error:", err));
        }
      }
    },
    []
  );

  return send;
}
