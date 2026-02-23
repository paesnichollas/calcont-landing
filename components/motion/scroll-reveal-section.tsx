"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import { useMounted } from "@/components/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useRevealMotion } from "./reveal";

type ScrollRevealSectionProps = Omit<HTMLMotionProps<"section">, "initial" | "whileInView"> & {
  viewport?: HTMLMotionProps<"section">["viewport"];
};

export function ScrollRevealSection({
  children,
  className,
  variants,
  viewport,
  ...rest
}: ScrollRevealSectionProps) {
  const mounted = useMounted();
  const { fadeUp, shouldReduceMotion } = useRevealMotion();
  const sectionVariants = variants ?? fadeUp;
  const shouldAnimateInView = mounted && !shouldReduceMotion;

  return (
    <motion.section
      className={cn("relative", className)}
      variants={sectionVariants}
      initial={shouldAnimateInView ? "hidden" : false}
      whileInView={shouldAnimateInView ? "show" : undefined}
      viewport={shouldAnimateInView ? (viewport ?? { once: true, amount: 0.2 }) : undefined}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
