/**
 * hero.config.ts
 * Static configuration data for the hero section.
 * Separated from logic for easy content editing.
 */

import type { HeroConfig } from "./hero.types";

export const heroConfig: HeroConfig = {
    dayImage: {
        src: "/hero_night.webp",
        alt: "Weinkling smart home — warm nighttime ambience with intelligent lighting",
        priority: true,
    },
    nightImage: {
        src: "/hero_day.webp",
        alt: "Weinkling smart home — bright daytime living room with automated lighting",
        priority: false,
    },
    headline: ["Smart Is The", "New Home"],
    subline:
        "Premium smart home systems designed for distinctive spaces. Control lighting, climate, security and entertainment seamlessly.",
    ctaLabel: "Explore Systems",
    ctaHref: "/solutions",
    scrollHint: "Scroll to begin",
};
