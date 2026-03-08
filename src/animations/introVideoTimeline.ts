/**
 * introVideoTimeline.ts
 *
 * GSAP timeline builder for the IntroVideo section.
 * Triggers once when the section enters the viewport.
 *
 * Animations:
 *   - Section header (label + headline + description): slow staggered fade+rise
 *   - Video container: cinematic scale + fade reveal
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_TEXT, EASE_CINEMATIC } from "./scrollDefaults";
import { prefersReducedMotion } from "@/utils/motionUtils";

export interface IntroVideoRefs {
    section:       React.RefObject<HTMLElement | null>;
    label:         React.RefObject<HTMLDivElement | null>;
    headline:      React.RefObject<HTMLHeadingElement | null>;
    description:   React.RefObject<HTMLParagraphElement | null>;
    videoWrapper:  React.RefObject<HTMLDivElement | null>;
}

export function buildIntroVideoTimeline(refs: IntroVideoRefs): () => void {
    const { section, label, headline, description, videoWrapper } = refs;

    if (!section.current) return () => {};

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section.current,
                start:   "top 85%",    // starts revealing earlier
                end:     "top 35%",    // wider range = slower, more cinematic reveal
                toggleActions: "play none none reverse",
            },
        });

        // Text group: label → headline → description — slow stagger
        tl.from(
            [label.current, headline.current, description.current].filter(Boolean),
            {
                opacity:  0,
                y:        reduced ? 0 : 50,
                duration: 1.4,
                ease:     EASE_TEXT,
                stagger:  0.2,
            },
            0
        );

        // Video wrapper: cinematic scale reveal, starts after text begins
        tl.from(
            videoWrapper.current,
            {
                opacity:  0,
                scale:    reduced ? 1 : 0.93,
                y:        reduced ? 0 : 40,
                duration: 1.6,
                ease:     EASE_CINEMATIC,
            },
            0.35
        );
    }, section.current);

    return () => {
        ctx.revert();
        ScrollTrigger.getAll()
            .filter((st) => st.vars.trigger === section.current)
            .forEach((st) => st.kill());
    };
}
