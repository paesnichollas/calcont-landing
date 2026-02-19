"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToTop } from "@/lib/scroll";

type BackToTopButtonProps = {
  showAfter?: number;
};

export function BackToTopButton({ showAfter = 400 }: BackToTopButtonProps) {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setIsVisible(value > showAfter);
  });

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 8 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 8 }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-30 md:bottom-6 md:right-6"
        >
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label="Voltar ao topo"
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
