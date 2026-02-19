const NAVBAR_SELECTOR = "[data-navbar-root]";
const TARGET_SCROLL_GAP = 8;
const SCROLL_DURATION_MS = 420;
let activeScrollAnimation: number | null = null;

export function prefersReducedMotion() {
  return false;
}

export function getScrollBehavior(): ScrollBehavior {
  return "smooth";
}

function easeInOutCubic(progress: number) {
  if (progress < 0.5) {
    return 4 * progress * progress * progress;
  }

  return 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function scrollToPosition(top: number) {
  if (typeof window === "undefined") {
    return;
  }

  const initialTop = window.scrollY;
  const distance = top - initialTop;

  if (Math.abs(distance) < 1) {
    window.scrollTo({
      top,
      behavior: "auto"
    });
    return;
  }

  if (activeScrollAnimation !== null) {
    window.cancelAnimationFrame(activeScrollAnimation);
    activeScrollAnimation = null;
  }

  const startedAt = performance.now();

  const step = (timestamp: number) => {
    const elapsed = timestamp - startedAt;
    const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
    const easedProgress = easeInOutCubic(progress);
    const nextTop = initialTop + distance * easedProgress;

    window.scrollTo({
      top: nextTop,
      behavior: "auto"
    });

    if (progress < 1) {
      activeScrollAnimation = window.requestAnimationFrame(step);
      return;
    }

    activeScrollAnimation = null;
  };

  activeScrollAnimation = window.requestAnimationFrame(step);
}

function getNavbarHeight() {
  if (typeof document === "undefined") {
    return 0;
  }

  const navbar = document.querySelector<HTMLElement>(NAVBAR_SELECTOR);
  if (!navbar) {
    return 0;
  }

  return navbar.getBoundingClientRect().height;
}

export function scrollToId(id: string) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const navbarHeight = getNavbarHeight();
  const nextTop = Math.max(0, targetTop - navbarHeight - TARGET_SCROLL_GAP);

  scrollToPosition(nextTop);
}

export function scrollToTop() {
  if (typeof window === "undefined") {
    return;
  }

  scrollToPosition(0);
}
