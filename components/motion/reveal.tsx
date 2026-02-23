"use client";

import { useEffect, useMemo, useState } from "react";
import { type Transition, type Variants } from "framer-motion";
import { useMounted } from "@/components/hooks/use-mounted";

const defaultTransition: Transition = {
  duration: 0.3,
  ease: [0.2, 0.65, 0.3, 0.9]
};

const reducedTransition: Transition = {
  duration: 0.01
};

function buildFadeUpVariants(shouldAnimate: boolean): Variants {
  if (!shouldAnimate) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0, transition: reducedTransition }
    };
  }

  return {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: defaultTransition }
  };
}

function buildStaggerVariants(shouldAnimate: boolean): Variants {
  if (!shouldAnimate) {
    return {
      hidden: {},
      show: { transition: { staggerChildren: 0, delayChildren: 0 } }
    };
  }

  return {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } }
  };
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPreference);

      return () => {
        mediaQuery.removeEventListener("change", syncPreference);
      };
    }

    mediaQuery.addListener(syncPreference);

    return () => {
      mediaQuery.removeListener(syncPreference);
    };
  }, []);

  return prefersReducedMotion;
}

export function useRevealMotion() {
  const mounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = mounted && !prefersReducedMotion;
  const shouldReduceMotion = !shouldAnimate;

  return useMemo(
    () => ({
      shouldReduceMotion,
      shouldAnimate,
      fadeUp: buildFadeUpVariants(shouldAnimate),
      stagger: buildStaggerVariants(shouldAnimate)
    }),
    [shouldAnimate, shouldReduceMotion]
  );
}
