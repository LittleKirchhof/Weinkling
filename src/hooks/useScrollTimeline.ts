/**
 * useScrollTimeline.ts
 *
 * A generic hook that:
 * 1. Registers GSAP + ScrollTrigger on the client
 * 2. Calls the provided builder function once on mount
 * 3. Returns a cleanup function when the component unmounts
 */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type TimelineBuilder<T> = (refs: T) => () => void;

/**
 * Registers GSAP plugins and calls the provided timeline builder.
 * The builder receives the current refs and must return a cleanup fn.
 *
 * @param builder - Function that builds GSAP timelines and triggers
 * @param refs    - Object of React refs forwarded to the builder
 * @param deps    - Additional dependencies (default: [])
 */
export function useScrollTimeline<T>(
    builder: TimelineBuilder<T>,
    refs: T,
    deps: React.DependencyList = []
): void {
    const cleanupRef = useRef<() => void>(() => { });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Allow browser to settle before initialising
        const id = requestAnimationFrame(() => {
            cleanupRef.current?.();
            cleanupRef.current = builder(refs);
            ScrollTrigger.refresh();
        });

        return () => {
            cancelAnimationFrame(id);
            cleanupRef.current?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
