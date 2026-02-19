"use client";

import { useMemo } from "react";
import { type Transition, type Variants, useReducedMotion } from "framer-motion";

const defaultTransition: Transition = {
  duration: 0.4,
  ease: [0.2, 0.65, 0.3, 0.9]
};

const reducedTransition: Transition = {
  duration: 0.01
};

function buildFadeUpVariants(shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0, transition: reducedTransition }
    };
  }

  return {
    hidden: { opacity: 0, y: 0.75 },
    show: { opacity: 1, y: 0, transition: defaultTransition }
  };
}

function buildStaggerVariants(shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: {},
      show: { transition: { staggerChildren: 0, delayChildren: 0 } }
    };
  }

  return {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
  };
}

export function useRevealMotion() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return useMemo(
    () => ({
      shouldReduceMotion,
      fadeUp: buildFadeUpVariants(shouldReduceMotion),
      stagger: buildStaggerVariants(shouldReduceMotion)
    }),
    [shouldReduceMotion]
  );
}
