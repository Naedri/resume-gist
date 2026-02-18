import type { TelemetryEvent } from "@/types";
import { TelemetryServiceInjector, type TelemetryConsumer } from "@/utils";
import { useCallback } from "react";

const injector = new TelemetryServiceInjector();
const consumer: TelemetryConsumer = injector.getConsumer();

export const useTelemetry = () => {
  const send = useCallback(
    (event: TelemetryEvent, data?: Record<string, unknown>) => {
      consumer.processEvent(event, data);
    },
    []
  );

  return send;
};
