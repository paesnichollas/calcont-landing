export type AnalyticsEventName = "click_ja_sou_cliente" | "click_ainda_nao_sou_cliente" | "click_whatsapp";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const isAnalyticsEnabled = Boolean(GA_ID);

export function trackEvent(eventName: AnalyticsEventName, params?: EventParams) {
  if (typeof window === "undefined" || !GA_ID || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params ?? {});
}
