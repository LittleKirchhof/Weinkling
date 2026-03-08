/**
 * scrollDefaults.ts
 *
 * Central configuration for all ScrollTrigger instances.
 * Editing values here propagates to every section automatically.
 */

import type { ScrollTrigger } from "gsap/ScrollTrigger";

export type ScrollTriggerVars = Parameters<typeof ScrollTrigger.create>[0];

/**
 * Scrub friction — higher = more lag behind scroll = premium elastic feel.
 * 2.8 gives the expensive "pulled on a string" quality seen on high-end sites.
 */
export const SCRUB_SMOOTH = 2.8;

/** Pin spacer behavior */
export const PIN_SPACING = true;

/**
 * Base ScrollTrigger config for a pinned, scrubbed section.
 * Override `trigger` and `end` per-section.
 */
export const pinnedSectionDefaults: Partial<ScrollTriggerVars> = {
    pin: true,
    scrub: SCRUB_SMOOTH,
    pinSpacing: PIN_SPACING,
    anticipatePin: 1,
};

/**
 * Fade-in reveal — used for text blocks entering viewport.
 * Wide start→end range lets the animation breathe for a cinematic reveal.
 */
export const fadeRevealDefaults: Partial<ScrollTriggerVars> = {
    start: "top 88%",
    end:   "top 45%",
    scrub: false,
    toggleActions: "play none none reverse",
};

/**
 * Cinematic ease for opacity cross-fades
 */
export const EASE_CINEMATIC = "power2.inOut";

/**
 * Ease for text reveals — expo.out gives a quick start that settles elegantly
 */
export const EASE_TEXT = "expo.out";

/**
 * Duration multipliers — scale all durations uniformly.
 * These drive non-scrubbed (free-play) animations.
 */
export const DUR = {
    xs:  0.4,
    sm:  0.8,
    md:  1.2,
    lg:  2.0,
    xl:  3.0,
} as const;
