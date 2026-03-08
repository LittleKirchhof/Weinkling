"use client";

/**
 * Navbar.tsx
 *
 * Premium top navigation:
 * - 3-column grid: Logo | Nav Links | CTA
 * - Always-on glassmorphism, stronger on scroll
 * - Desktop horizontal nav + mobile hamburger
 * - GSAP-driven entry animation
 */

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link"; // kept for logo anchor only

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Our Products", href: "#products" },
    { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.1,
            });
        }, navRef);

        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            ctx.revert();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {/* ── Main Nav Bar ─────────────────────────────────────── */}
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
                style={{
                    background: scrolled ? "rgba(10,10,15,0.92)" : "rgba(10,10,15,0.55)",
                    backdropFilter: "blur(20px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                    borderBottom: scrolled
                        ? "1px solid rgba(255,255,255,0.10)"
                        : "1px solid rgba(255,255,255,0.07)",
                }}
                aria-label="Main navigation"
            >
            {/*
                Flex bar:
                  [Logo]  ←64px→  [Nav links — truly centered]  ←auto→  [CTA | ☰]
            */}
            <div
                style={{
                    maxWidth:       "1400px",
                    margin:         "0 auto",
                    paddingLeft:    "48px",
                    paddingRight:   "48px",
                    height:         "64px",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "space-between",
                    gap:            "24px",
                }}
            >
                {/* ── Logo (left) ───────────────────────────────────── */}
                <Link
                    href="/"
                    aria-label="Weinkling — Home"
                    style={{ flexShrink: 0, display: "flex", alignItems: "center" }}
                >
                    <Image
                        src="/logo.png"
                        alt="Weinkling logo"
                        width={160}
                        height={36}
                        style={{ height: "36px", width: "auto", objectFit: "contain", display: "block" }}
                        priority
                    />
                </Link>

                {/* ── Nav links (center — flex:1 so they sit mid-point) */}
                <ul
                    className="hidden lg:flex items-center"
                    role="list"
                    style={{
                        flex:            1,
                        justifyContent:  "center",
                        gap:             "2rem",
                        margin:          0,
                        padding:         0,
                        listStyle:       "none",
                    }}
                >
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            {/* Single-page mode: rendered as span, no routing */}
                            <span
                                className="relative group cursor-pointer"
                                style={{
                                    fontFamily:    "var(--font-sans)",
                                    fontSize:      "0.8rem",
                                    fontWeight:    400,
                                    color:         "rgba(245,244,240,0.7)",
                                    letterSpacing: "0.03em",
                                    whiteSpace:    "nowrap",
                                    userSelect:    "none",
                                }}
                            >
                                <span className="group-hover:text-white transition-colors duration-200">
                                    {link.label}
                                </span>
                                <span
                                    className="absolute left-0 w-0 group-hover:w-full transition-all duration-300"
                                    style={{
                                        bottom:     "-2px",
                                        height:     "1px",
                                        background: "var(--clr-accent)",
                                    }}
                                />
                            </span>
                        </li>
                    ))}
                </ul>

                {/* ── CTA + Hamburger (right) ────────────────────────── */}
                <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "16px" }}>

                    {/* Desktop CTA — glass pill, no routing (single-page) */}
                    <button
                        type="button"
                        className="hidden lg:inline-flex"
                        style={{
                            alignItems:          "center",
                            gap:                 "0.5rem",
                            padding:             "0.5rem 1.4rem",
                            borderRadius:        "9999px",
                            background:          "linear-gradient(135deg, rgba(140,180,184,0.22) 0%, rgba(200,169,110,0.18) 100%)",
                            border:              "1px solid rgba(140,180,184,0.45)",
                            color:               "rgba(245,244,240,0.92)",
                            fontFamily:          "var(--font-sans)",
                            fontSize:            "0.72rem",
                            fontWeight:          500,
                            letterSpacing:       "0.09em",
                            textTransform:       "uppercase",
                            backdropFilter:      "blur(12px)",
                            WebkitBackdropFilter:"blur(12px)",
                            cursor:              "pointer",
                            transition:          "opacity 0.25s ease",
                            whiteSpace:          "nowrap",
                        } as React.CSSProperties}
                    >
                        Get Started
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        id="mobile-menu-toggle"
                        className="lg:hidden flex flex-col justify-center gap-1.5 p-2"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span
                            className="block w-6 h-px transition-all duration-300"
                            style={{
                                background: "var(--clr-mist)",
                                transform:  menuOpen ? "rotate(45deg) translateY(4px)" : "none",
                            }}
                        />
                        <span
                            className="block w-4 h-px transition-all duration-300"
                            style={{
                                background: "var(--clr-mist)",
                                opacity:    menuOpen ? 0 : 1,
                            }}
                        />
                        <span
                            className="block w-6 h-px transition-all duration-300"
                            style={{
                                background: "var(--clr-mist)",
                                transform:  menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
                            }}
                        />
                    </button>
                </div>
            </div>
        </nav>


            {/* ── Mobile Menu Overlay ───────────────────────────────── */}
            <div
                id="mobile-menu"
                className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center items-center transition-all duration-500"
                style={{
                    background: "rgba(10,10,15,0.97)",
                    backdropFilter: "blur(20px)",
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? "auto" : "none",
                    transform: menuOpen ? "none" : "translateY(-20px)",
                }}
                aria-hidden={!menuOpen}
            >
                <ul className="flex flex-col items-center gap-10" role="list">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <span
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    fontFamily:    "var(--font-serif)",
                                    fontSize:      "clamp(2rem, 8vw, 3.5rem)",
                                    fontWeight:    300,
                                    color:         "var(--clr-mist)",
                                    letterSpacing: "-0.02em",
                                    cursor:        "pointer",
                                    userSelect:    "none",
                                }}
                            >
                                {link.label}
                            </span>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="mt-14"
                    style={{
                        display:             "inline-flex",
                        alignItems:          "center",
                        gap:                 "0.5rem",
                        padding:             "0.6rem 1.8rem",
                        borderRadius:        "9999px",
                        background:          "linear-gradient(135deg, rgba(140,180,184,0.22) 0%, rgba(200,169,110,0.18) 100%)",
                        border:              "1px solid rgba(140,180,184,0.45)",
                        color:               "rgba(245,244,240,0.92)",
                        fontFamily:          "var(--font-sans)",
                        fontSize:            "0.8rem",
                        fontWeight:          500,
                        letterSpacing:       "0.09em",
                        textTransform:       "uppercase",
                        backdropFilter:      "blur(12px)",
                        WebkitBackdropFilter:"blur(12px)",
                        cursor:              "pointer",
                        transition:          "opacity 0.25s ease",
                        whiteSpace:          "nowrap",
                    } as React.CSSProperties}
                >
                    Get Started
                </button>
            </div>
        </>
    );
}
