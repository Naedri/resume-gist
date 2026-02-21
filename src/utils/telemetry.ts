import type { TelemetryEvent } from "@/types";

const getSessionId = () => {
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
};

// ---- Service Components ----

export interface TelemetryService {
  send(event: TelemetryEvent, data?: Record<string, unknown>): void;
}

export class SupabaseService implements TelemetryService {
  url: string;
  apiKey: string;
  headers: Record<string, string>;

  constructor(url: string, apiKey: string) {
    this.url = url;
    this.apiKey = apiKey;
    this.headers = SupabaseService.buildHeaders(apiKey);
  }

  static buildHeaders(apiKey: string): Record<string, string> {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      apikey: apiKey
    };
  }

  send(event: TelemetryEvent, data?: Record<string, unknown>): void {
    const payload = {
      data: data ?? {},
      event,
      sessionId: getSessionId(),
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: window.navigator.userAgent
    };
    fetch(this.url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(payload),
      keepalive: true
    }).catch((err) => console.error("Telemetry error:", err));
  }
}

// ---- Service Consumer ----

export interface TelemetryConsumer {
  //doing some msg validation, manipulation logic etc
  processEvent(event: TelemetryEvent, data?: Record<string, unknown>): void;
}

export class SupabaseConsumer implements TelemetryConsumer {
  service: TelemetryService;
  constructor(service: TelemetryService) {
    this.service = service;
  }
  processEvent(event: TelemetryEvent, data?: Record<string, unknown>): void {
    this.service.send(event, data);
  }
}

export class FakeConsumer implements TelemetryConsumer {
  processEvent(event: TelemetryEvent, data?: Record<string, unknown>): void {
    console.info("Fake telemetry service received event:", event);
    if (data) console.info("Fake telemetry service received data:", data);
  }
}

// ---- Injectors Classes ----
// will initialize the services and then the consumer classes

export class TelemetryServiceInjector {
  getConsumer(): TelemetryConsumer {
    const url = import.meta.env.VITE_TELEMETRY_URL;
    const apiKey = import.meta.env.VITE_TELEMETRY_HEADER_KEY;
    if (url && apiKey) {
      return new SupabaseConsumer(new SupabaseService(url, apiKey));
    } else {
      if (!url) {
        console.warn(
          "Telemetry event cannot be sent as there is no url provided."
        );
      }
      if (!apiKey) {
        console.warn(
          "Telemetry event cannot be sent as there is no apiKey provided."
        );
      }
      return new FakeConsumer();
    }
  }
}
