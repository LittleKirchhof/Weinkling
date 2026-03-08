"use client";

/**
 * HeroContainer.tsx
 *
 * Orchestrates the hero section:
 * - Manages all DOM refs
 * - Calls useScrollTimeline with buildHeroTimeline
 * - Composes HeroVisual + HeroText
 *
 * No animation logic lives here.
 */

import React, { useRef } from "react";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { buildHeroTimeline } from "@/animations/heroTimeline";
import HeroVisual from "./HeroVisual";
import HeroText from "./HeroText";
import { heroConfig } from "./hero.config";
import type { HeroRefs } from "./hero.types";

export default function HeroContainer() {
    const containerRef = useRef<HTMLElement>(null);
    const dayLayerRef = useRef<HTMLDivElement>(null);
    const nightLayerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textBlockRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLSpanElement>(null);
    const headlineLinesRef = useRef<HTMLSpanElement[]>([]);
    const sublineRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const scrollHintRef = useRef<HTMLDivElement>(null);

    const refs: HeroRefs = {
        container: containerRef,
        dayLayer: dayLayerRef,
        nightLayer: nightLayerRef,
        overlay: overlayRef,
        textBlock: textBlockRef,
        badge: badgeRef,
        headlineLines: headlineLinesRef,
        sublineEl: sublineRef,
        ctaEl: ctaRef,
        scrollHintEl: scrollHintRef,
    };

    useScrollTimeline(buildHeroTimeline, refs);

    return (
        <section
            ref={containerRef}
            id="hero"
            aria-label="Hero — Weinkling Intelligent Living"
            className="relative w-full"
            style={{ height: "100vh" }}
        >
            {/* Visual layers: day & night images */}
            <HeroVisual
                dayRef={dayLayerRef}
                nightRef={nightLayerRef}
                overlayRef={overlayRef}
                daySrc={heroConfig.dayImage.src}
                dayAlt={heroConfig.dayImage.alt}
                nightSrc={heroConfig.nightImage.src}
                nightAlt={heroConfig.nightImage.alt}
            />

            {/* Text content layer */}
            <HeroText
                textRef={textBlockRef}
                badgeRef={badgeRef}
                headlineLinesRef={headlineLinesRef}
                sublineRef={sublineRef}
                ctaRef={ctaRef}
                scrollHintRef={scrollHintRef}
                headline={heroConfig.headline}
                subline={heroConfig.subline}
                ctaLabel={heroConfig.ctaLabel}
                ctaHref={heroConfig.ctaHref}
                scrollHint={heroConfig.scrollHint}
            />
        </section>
    );
}
