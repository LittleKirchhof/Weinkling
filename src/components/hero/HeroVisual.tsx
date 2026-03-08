"use client";

/**
 * HeroVisual.tsx
 *
 * Renders the stacked image layers (day + night).
 * Receives forwarded refs for GSAP manipulation.
 * No animation logic lives here.
 */

import React from "react";

interface HeroVisualProps {
    dayRef: React.RefObject<HTMLDivElement | null>;
    nightRef: React.RefObject<HTMLDivElement | null>;
    overlayRef: React.RefObject<HTMLDivElement | null>;
    daySrc: string;
    dayAlt: string;
    nightSrc: string;
    nightAlt: string;
}

export default function HeroVisual({
    dayRef,
    nightRef,
    overlayRef,
    daySrc,
    dayAlt,
    nightSrc,
    nightAlt,
}: HeroVisualProps) {
    return (
        <div
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
        >
            {/* Day layer — visible on load; GSAP crossfades to night during scroll */}
            <div
                ref={dayRef}
                className="absolute inset-0 w-full h-full will-change-[opacity,transform]"
                style={{ transformOrigin: "center center" }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={daySrc}
                    alt={dayAlt}
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                    loading="eager"
                />
            </div>

            {/* Night layer — hidden; GSAP fades it in as scroll progresses */}
            <div
                ref={nightRef}
                className="absolute inset-0 w-full h-full will-change-[opacity] pointer-events-none"
                style={{ opacity: 0 }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={nightSrc}
                    alt={nightAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Atmospheric overlay — darkens during transition */}
            <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.15) 100%)",
                    opacity: 0.35,
                }}
            />

            {/* Vignette edge darkening */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,15,0.6) 100%)",
                }}
            />
        </div>
    );
}
