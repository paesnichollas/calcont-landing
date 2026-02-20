"use client";

import { useCallback, useEffect, useRef } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

type UseEmblaDeckEffectsParams = {
  emblaApi?: CarouselApi;
  slideCount: number;
  reducedMotion: boolean;
  maxParallaxPx?: number;
  maxRotateDeg?: number;
  inactiveScaleMin?: number;
  inactiveOpacityMin?: number;
};

type UseEmblaDeckEffectsResult = {
  bindSlideRef: (index: number) => (node: HTMLDivElement | null) => void;
  resetSlideRefs: () => void;
  applyNow: () => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getSlideDelta(index: number, snaps: number[], progress: number) {
  const currentSnap = snaps[index] ?? 0;
  const previousSnap = snaps[Math.max(index - 1, 0)] ?? currentSnap;
  const nextSnap = snaps[Math.min(index + 1, snaps.length - 1)] ?? currentSnap;
  const step = Math.max(Math.abs(currentSnap - previousSnap), Math.abs(nextSnap - currentSnap), 0.0001);

  return (currentSnap - progress) / step;
}

export function useEmblaDeckEffects({
  emblaApi,
  slideCount,
  reducedMotion,
  maxParallaxPx = 12,
  maxRotateDeg = 2,
  inactiveScaleMin = 0.94,
  inactiveOpacityMin = 0.68
}: UseEmblaDeckEffectsParams): UseEmblaDeckEffectsResult {
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const transitionsEnabledRef = useRef(true);

  const bindSlideRef = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      slideRefs.current[index] = node;
    },
    []
  );

  const resetSlideRefs = useCallback(() => {
    slideRefs.current = [];
  }, []);

  const applyEffects = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    const snaps = emblaApi.scrollSnapList();
    const progress = emblaApi.scrollProgress();
    const transition = reducedMotion
      ? transitionsEnabledRef.current
        ? "opacity 160ms linear"
        : "none"
      : transitionsEnabledRef.current
        ? "transform 380ms cubic-bezier(0.22,1,0.36,1), opacity 360ms cubic-bezier(0.22,1,0.36,1), filter 360ms cubic-bezier(0.22,1,0.36,1)"
        : "none";

    for (let index = 0; index < slideCount; index += 1) {
      const node = slideRefs.current[index];

      if (!node) {
        continue;
      }

      const rawDelta = getSlideDelta(index, snaps, progress);
      const clampedDelta = clamp(rawDelta, -1.7, 1.7);
      const distance = Math.abs(clampedDelta);
      const normalizedDistance = clamp(distance, 0, 1);

      const scale = reducedMotion ? 1 : 1 - (1 - inactiveScaleMin) * normalizedDistance;
      const opacity = reducedMotion
        ? 1 - (1 - 0.9) * normalizedDistance
        : 1 - (1 - inactiveOpacityMin) * normalizedDistance;
      const parallax = reducedMotion ? 0 : -clampedDelta * maxParallaxPx;
      const rotateY = reducedMotion ? 0 : clamp(clampedDelta * maxRotateDeg, -maxRotateDeg, maxRotateDeg);
      const blur = reducedMotion ? 0 : Math.min(0.45, normalizedDistance * 0.32);
      const zIndex = String(Math.round(100 - Math.min(95, normalizedDistance * 40)));

      node.style.transform = `translateX(${parallax.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
      node.style.opacity = opacity.toFixed(4);
      node.style.filter = blur > 0 ? `blur(${blur.toFixed(2)}px)` : "none";
      node.style.zIndex = zIndex;
      if (node.style.transition !== transition) {
        node.style.transition = transition;
      }
    }
  }, [
    emblaApi,
    inactiveOpacityMin,
    inactiveScaleMin,
    maxParallaxPx,
    maxRotateDeg,
    reducedMotion,
    slideCount
  ]);

  const scheduleApply = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      applyEffects();
      frameRef.current = null;
    });
  }, [applyEffects]);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slideCount);
    scheduleApply();
  }, [scheduleApply, slideCount]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const handleScroll = () => {
      scheduleApply();
    };
    const handleSelect = () => {
      transitionsEnabledRef.current = true;
      scheduleApply();
    };
    const handleReInit = () => {
      scheduleApply();
    };
    const handlePointerDown = () => {
      transitionsEnabledRef.current = false;
      scheduleApply();
    };
    const handlePointerUp = () => {
      transitionsEnabledRef.current = true;
      scheduleApply();
    };
    const handleSettle = () => {
      transitionsEnabledRef.current = true;
      scheduleApply();
    };

    emblaApi.on("scroll", handleScroll);
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleReInit);
    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);
    emblaApi.on("settle", handleSettle);
    scheduleApply();

    return () => {
      emblaApi.off("scroll", handleScroll);
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleReInit);
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
      emblaApi.off("settle", handleSettle);
    };
  }, [emblaApi, scheduleApply]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    bindSlideRef,
    resetSlideRefs,
    applyNow: scheduleApply
  };
}
