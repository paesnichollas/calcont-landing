"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMounted } from "@/components/hooks/use-mounted";
import { useRevealMotion } from "@/components/motion/reveal";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingCopy } from "@/content/copy";
import { scrollToTop } from "@/lib/scroll";

type BackToTopButtonProps = {
  showAfter?: number;
};

export function BackToTopButton({ showAfter = 400 }: BackToTopButtonProps) {
  const { scrollY } = useScroll();
  const mounted = useMounted();
  const { shouldReduceMotion } = useRevealMotion();
  const shouldAnimate = mounted && !shouldReduceMotion;
  const [isVisible, setIsVisible] = useState(false);
  const initialState = shouldAnimate ? { opacity: 0, scale: 0.92, y: 8 } : { opacity: 0, scale: 1, y: 0 };
  const visibleState = { opacity: 1, scale: 1, y: 0 };
  const exitState = shouldAnimate ? { opacity: 0, scale: 0.92, y: 8 } : { opacity: 0, scale: 1, y: 0 };
  const transition = shouldAnimate ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } : { duration: 0.01 };
  const backToTopAriaLabel = landingCopy.common.backToTopAriaLabel.trim();

  useMotionValueEvent(scrollY, "change", (value) => {
    setIsVisible(value > showAfter);
  });

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={initialState}
          animate={visibleState}
          exit={exitState}
          transition={transition}
          className="fixed bottom-4 right-4 z-30 md:bottom-6 md:right-6"
        >
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label={backToTopAriaLabel}
            className="h-11 w-11 border border-border/70 bg-card/95 shadow-lg shadow-background/50 backdrop-blur"
            onClick={scrollToTop}
          >
            <ChevronUp className="h-5 w-5" aria-hidden />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
