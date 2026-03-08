/**
 * controlMethodsTimeline.ts
 *
 * GSAP timeline builder for the ControlMethods section.
 *
 * Architecture:
 *   ControlMethods.tsx → useScrollTimeline → buildControlMethodsTimeline
 *
 * Premium scroll design:
 *   - 600vh total scroll = 150vh per panel = slow, cinematic pacing
 *   - scrub: 2.8 = elastic "pulled on a string" lag
 *   - Panel entries: slow fade + rise (PANEL_DUR = 0.14)
 *   - Hold: meaningful dwell time (HOLD = 0.12)
 *   - Exits: clean dissolve (EXIT_DUR = 0.08)
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    pinnedSectionDefaults,
    EASE_CINEMATIC,
    EASE_TEXT,
    SCRUB_SMOOTH,
} from "./scrollDefaults";
import { prefersReducedMotion, isMobileViewport } from "@/utils/motionUtils";

export interface ControlMethodsRefs {
    section: React.RefObject<HTMLElement | null>;
    panels: React.MutableRefObject<(HTMLDivElement | null)[]>;
    panelTitles: React.MutableRefObject<(HTMLHeadingElement | null)[]>;
    panelDescriptions: React.MutableRefObject<(HTMLParagraphElement | null)[]>;
    panelIcons: React.MutableRefObject<(HTMLDivElement | null)[]>;
    panelImages: React.MutableRefObject<(HTMLDivElement | null)[]>;
    sectionLabel: React.RefObject<HTMLDivElement | null>;
    sectionHeadline: React.RefObject<HTMLHeadingElement | null>;
}

export function buildControlMethodsTimeline(refs: ControlMethodsRefs): () => void {
    const {
        section,
        panels,
        panelTitles,
        panelDescriptions,
        panelIcons,
        panelImages,
        sectionLabel,
        sectionHeadline,
    } = refs;

    if (!section.current) return () => {};

    const reduced = prefersReducedMotion();
    const mobile  = isMobileViewport();

    const ctx = gsap.context(() => {

        // ─ Section header reveal ─────────────────────────────────────────
        const headerTargets = [sectionLabel.current, sectionHeadline.current].filter(Boolean);
        if (headerTargets.length) {
            gsap.from(headerTargets, {
                opacity: 0,
                y: reduced ? 0 : 36,
                duration: 1.2,
                ease: EASE_TEXT,
                stagger: 0.18,
                scrollTrigger: {
                    trigger: section.current,
                    start: "top 82%",
                    end:   "top 52%",
                    toggleActions: "play none none reverse",
                },
            });
        }

        // ─ Icon micro-animations (infinite, GPU-friendly GSAP tweens) ────
        if (!reduced) {
            // Panel 1 — Touch: subtle scale + opacity pulse
            const touchIcon = section.current!.querySelector("[data-icon-anim='touch']");
            if (touchIcon) {
                gsap.to(touchIcon, {
                    scale: 1.07,
                    opacity: 0.8,
                    duration: 3.0,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                });
            }

            // Panel 2 — Remote: signal arcs fade in/out
            const remoteArcs = section.current!.querySelectorAll("[data-icon-anim='remote-arc']");
            if (remoteArcs.length) {
                gsap.fromTo(remoteArcs,
                    { opacity: 0, scale: 0.85 },
                    {
                        opacity: 0.55,
                        scale: 1,
                        duration: 2.4,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        stagger: { each: 0.4, from: "start" },
                    }
                );
            }

            // Panel 3 — Mobile: gentle scale pulse
            const mobileIcon = section.current!.querySelector("[data-icon-anim='mobile']");
            if (mobileIcon) {
                gsap.to(mobileIcon, {
                    scale: 1.04,
                    duration: 2.8,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                });
            }

            // Panel 4 — Voice: waveform bars animate scaleY
            const voiceBars = section.current!.querySelectorAll("[data-icon-anim='voice-bar']");
            if (voiceBars.length) {
                gsap.to(voiceBars, {
                    scaleY: 1.15,
                    duration: 1.8,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    stagger: { each: 0.2, from: "center", yoyo: true },
                });
            }
        }

        // ─ MOBILE PATH — simple viewport entry reveals ───────────────────
        if (mobile) {
            panels.current.forEach((panel, i) => {
                if (!panel) return;
                const title  = panelTitles.current[i];
                const desc   = panelDescriptions.current[i];
                const icons  = panelIcons.current[i];
                const img    = panelImages.current[i];

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 88%",
                        end:   "top 55%",
                        toggleActions: "play none none reverse",
                    },
                });

                if (!reduced) {
                    tl.from(panel, { opacity: 0, y: 50, duration: 1.0, ease: EASE_TEXT }, 0)
                      .from([title, desc].filter(Boolean), { opacity: 0, y: 28, duration: 0.9, ease: EASE_TEXT, stagger: 0.15 }, 0.2)
                      .from(icons ? icons.querySelectorAll(".cm-icon") : [], { opacity: 0, y: 20, duration: 0.7, ease: EASE_TEXT, stagger: 0.1 }, 0.35)
                      .from(img, { opacity: 0, scale: 0.94, duration: 1.0, ease: EASE_CINEMATIC }, 0.25);
                }
            });

            return;
        }

        // ─ DESKTOP PATH — premium pinned scroll sequence ─────────────────
        //
        // Total scroll = 600vh  (4 panels × 150vh each)
        //
        // Timeline is 0→1. Each panel occupies 0.25 of that range.
        //
        // Per-panel timing (within its 0–0.25 slot):
        //   Entry:  PANEL_DUR = 0.14  (slow cinematic fade+rise)
        //   Hold:   HOLD      = 0.12  (panel stays fully visible — meaningful dwell)
        //   Exit:   EXIT_DUR  = 0.08  (clean dissolve out)
        //
        // With scrub: 2.8, user feels a premium elastic lag behind their scroll.

        gsap.set(panels.current.filter(Boolean), { opacity: 0, y: 50 });
        gsap.set(
            panels.current.flatMap(p => p ? Array.from(p.querySelectorAll(".cm-icon")) : []),
            { opacity: 0, y: 20 }
        );
        gsap.set(panelImages.current.filter(Boolean), { opacity: 0, scale: 0.94 });

        const mainTl = gsap.timeline({
            scrollTrigger: {
                ...pinnedSectionDefaults,
                trigger: section.current,
                start:   "top top",
                end:     "+=600%",            // 150vh per panel — slow, cinematic
                scrub:   SCRUB_SMOOTH,
            } as ScrollTrigger.Vars,
        });

        // Per-panel timing constants
        const PANEL_DUR = 0.14;   // entry duration (fraction of 0–1 progress)
        const HOLD      = 0.12;   // dwell time — how long panel stays fully visible
        const EXIT_DUR  = 0.08;   // exit dissolve
        const SLOT      = 0.25;   // each panel owns 25% of total progress

        [0, 1, 2, 3].forEach((i) => {
            const base   = i * SLOT;
            const panel  = panels.current[i];
            const title  = panelTitles.current[i];
            const desc   = panelDescriptions.current[i];
            const icons  = panel ? Array.from(panel.querySelectorAll(".cm-icon")) : [];
            const img    = panelImages.current[i];
            const isLast = i === 3;

            if (!panel) return;

            // ── Entry: panel rises and fades in ──────────────────────────
            mainTl
                .to(panel,  { opacity: 1, y: 0, duration: PANEL_DUR, ease: EASE_TEXT }, base)
                .to([title, desc].filter(Boolean),
                    { opacity: 1, y: 0, duration: PANEL_DUR * 0.85, ease: EASE_TEXT, stagger: 0.025 },
                    base + 0.025)
                .to(icons,  { opacity: 1, y: 0, duration: PANEL_DUR * 0.75, stagger: 0.018, ease: EASE_TEXT },
                    base + 0.05)
                .to(img,    { opacity: 1, scale: 1, duration: PANEL_DUR, ease: EASE_CINEMATIC }, base);

            // ── Exit: panel dissolves cleanly ────────────────────────────
            if (!isLast) {
                const exitAt = base + PANEL_DUR + HOLD;
                mainTl
                    .to(panel,  { opacity: 0, y: -28, duration: EXIT_DUR, ease: EASE_CINEMATIC }, exitAt)
                    .to([title, desc, ...icons].filter(Boolean),
                        { opacity: 0, duration: EXIT_DUR * 0.8, ease: EASE_CINEMATIC }, exitAt);
            }
        });

    }, section.current);

    return () => {
        ctx.revert();
        ScrollTrigger.getAll()
            .filter(st => st.vars.trigger === section.current)
            .forEach(st => st.kill());
    };
}
