const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function isAnalyticsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
}

export function getGaId(): string | undefined {
  return GA_ID;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function push(command: string, ...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(command, ...args);
  }
}

export function trackPageView(path: string): void {
  if (!isAnalyticsEnabled() || !GA_ID) return;
  push("event", "page_view", { page_path: path });
}

export function trackEvent(event: string, params?: Record<string, unknown>): void {
  if (!isAnalyticsEnabled() || !GA_ID) return;
  push("event", event, params ?? {});
}
