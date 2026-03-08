/**
 * heroTimeline.ts
 *
 * Isolated GSAP timeline for the Hero section.
 * Receives DOM refs, builds timelines, registers ScrollTrigger.
 * Returns a cleanup function. Zero JSX knowledge.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroRefs } from "@/components/hero/hero.types";
import {
    pinnedSectionDefaults,
    EASE_CINEMATIC,
    EASE_TEXT,
    DUR,
} from "./scrollDefaults";
import { prefersReducedMotion, isMobileViewport } from "@/utils/motionUtils";

gsap.registerPlugin(ScrollTrigger);

export function buildHeroTimeline(refs: HeroRefs): () => void {
    const {
        container,
        dayLayer,
        nightLayer,
        overlay,
        textBlock,
        badge,
        headlineLines,
        sublineEl,
        ctaEl,
        scrollHintEl,
    } = refs;

    if (
        !container.current ||
        !dayLayer.current ||
        !nightLayer.current ||
        !overlay.current ||
        !textBlock.current
    ) {
        return () => { };
    }

    const ctx = gsap.context(() => {
        const reduced = prefersReducedMotion();
        const mobile = isMobileViewport();

        // ─ Entry animation: elements appear on load ──────────────
        const entryTl = gsap.timeline({ delay: 0.3 });

        if (!reduced) {
            // Badge
            if (badge.current) {
                entryTl.from(badge.current, {
                    opacity: 0,
                    y: -12,
                    duration: DUR.sm,
                    ease: EASE_TEXT,
                });
            }

            // Headline lines sequenced
            if (headlineLines.current.length > 0) {
                entryTl.from(
                    headlineLines.current,
                    {
                        opacity: 0,
                        y: 70,
                        skewY: 1.5,
                        stagger: 0.18,
                        duration: DUR.lg,
                        ease: EASE_TEXT,
                    },
                    "-=0.35"
                );
            }

            // Subline
            if (sublineEl.current) {
                entryTl.from(
                    sublineEl.current,
                    {
                        opacity: 0,
                        y: 24,
                        duration: DUR.md,
                        ease: EASE_TEXT,
                    },
                    "-=0.65"
                );
            }

            // CTA
            if (ctaEl.current) {
                entryTl.from(
                    ctaEl.current,
                    {
                        opacity: 0,
                        y: 20,
                        duration: DUR.sm,
                        ease: EASE_TEXT,
                    },
                    "-=0.55"
                );
            }

            // Scroll hint
            if (scrollHintEl.current) {
                entryTl.from(
                    scrollHintEl.current,
                    {
                        opacity: 0,
                        y: 10,
                        duration: DUR.sm,
                        ease: EASE_TEXT,
                    },
                    "-=0.2"
                );

                // Looping bounce
                gsap.to(scrollHintEl.current.querySelector(".scroll-arrow"), {
                    y: 8,
                    repeat: -1,
                    yoyo: true,
                    duration: 0.8,
                    ease: "sine.inOut",
                    delay: 1.5,
                });
            }
        } else {
            // Reduced motion: instant reveal
            entryTl.set(textBlock.current, { opacity: 1 });
        }

        // ─ Scroll-driven crossfade: day → night ───────────────────
        if (!mobile || !reduced) {
            // Pin the section and scrub a day→night transition
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    ...pinnedSectionDefaults,
                    trigger: container.current,
                    start: "top top",
                    end: "+=300%",
                    onUpdate: (self) => {
                        const p = self.progress;
                        if (textBlock.current) {
                            // Text fades out gently in the middle third, then stays gone
                            const textOpacity = p < 0.30 ? 1 : p < 0.55 ? 1 - (p - 0.30) / 0.25 : 0;
                            gsap.set(textBlock.current, { opacity: textOpacity });
                        }
                    },
                } as ScrollTrigger.Vars,
            });

            // Phase 1 (0–50%): day image subtly zooms in, overlay darkens
            scrollTl
                .to(
                    dayLayer.current,
                    {
                        scale: 1.08,
                        duration: 1,
                        ease: "none",
                    },
                    0
                )
                .to(
                    overlay.current,
                    {
                        opacity: 0.55,
                        duration: 1,
                        ease: "none",
                    },
                    0
                );

            // Phase 2 (40–100%): night layer fades in, day layer fades out
            scrollTl
                .fromTo(
                    nightLayer.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.6,
                        ease: EASE_CINEMATIC,
                    },
                    0.4
                )
                .to(
                    dayLayer.current,
                    {
                        opacity: 0,
                        duration: 0.5,
                        ease: EASE_CINEMATIC,
                    },
                    0.5
                )
                .to(
                    overlay.current,
                    {
                        opacity: 0.3,
                        duration: 0.3,
                        ease: "none",
                    },
                    0.7
                );
        }
    }, container.current);

    return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
    };
}
