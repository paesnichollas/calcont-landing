"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
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
  const { fadeUp, shouldReduceMotion } = useRevealMotion();
  const sectionVariants = variants ?? fadeUp;

  return (
    <motion.section
      className={className}
      variants={sectionVariants}
      initial={shouldReduceMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={viewport ?? { once: true, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
