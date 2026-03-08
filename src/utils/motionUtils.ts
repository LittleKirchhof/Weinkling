/**
 * motionUtils.ts
 *
 * Shared utility functions for GSAP animation composition.
 * All functions are pure and have no side effects.
 */

/**
 * Returns true if the user prefers reduced motion.
 * Used to scale down or skip heavy animations.
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Returns true on mobile breakpoints (< 768px).
 * Used to bifurcate mobile vs desktop animation paths.
 */
export function isMobileViewport(): boolean {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
}
