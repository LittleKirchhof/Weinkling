/**
 * hero.types.ts
 * Type definitions for the Hero section components.
 */

export interface HeroImage {
    src: string;
    alt: string;
    priority?: boolean;
}

export interface HeroConfig {
    dayImage: HeroImage;
    nightImage: HeroImage;
    headline: string[];
    subline: string;
    ctaLabel: string;
    ctaHref: string;
    scrollHint: string;
}

export interface HeroRefs {
    container: React.RefObject<HTMLElement | null>;
    dayLayer: React.RefObject<HTMLDivElement | null>;
    nightLayer: React.RefObject<HTMLDivElement | null>;
    overlay: React.RefObject<HTMLDivElement | null>;
    textBlock: React.RefObject<HTMLDivElement | null>;
    badge: React.RefObject<HTMLSpanElement | null>;
    headlineLines: React.RefObject<HTMLSpanElement[]>;
    sublineEl: React.RefObject<HTMLParagraphElement | null>;
    ctaEl: React.RefObject<HTMLAnchorElement | null>;
    scrollHintEl: React.RefObject<HTMLDivElement | null>;
}
