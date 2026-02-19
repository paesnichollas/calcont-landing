export type AnalyticsEventName = "click_ja_sou_cliente" | "click_ainda_nao_sou_cliente" | "click_whatsapp";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: AnalyticsEventName, params?: EventParams) {
  if (typeof window === "undefined") {
    return;
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) {
    return;
  }

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params ?? {});
}
