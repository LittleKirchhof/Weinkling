import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Solutions — Weinkling",
    description:
        "Explore Weinkling's full range of home automation systems — from ambient lighting and climate control to whole-home security and media orchestration.",
};

const SOLUTIONS = [
    {
        id: "lighting",
        category: "01",
        title: "Ambient Lighting",
        sub: "Circadian-aware intelligent lighting",
        description:
            "Our lighting systems go far beyond dimming. Using spectral tuning and occupancy data, Weinkling creates lighting environments that support focus, creativity, rest, and entertaining — automatically.",
        specs: [
            "Full RGB + tunable white spectrum",
            "Circadian automation built-in",
            "Architectural-grade fixture integration",
            "Fail-safe local processing",
        ],
        image:
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=900&q=75&auto=format&fit=crop",
    },
    {
        id: "climate",
        category: "02",
        title: "Climate Management",
        sub: "Multi-zone precision temperature orchestration",
        description:
            "Zone balancing, predictive pre-conditioning, and hyper-local sensor networks mean every room reaches your preferred temperature before you arrive in it.",
        specs: [
            "Sub-zone sensor mesh",
            "Predictive scheduling engine",
            "Integration with HVAC & underfloor systems",
            "Humidity and air quality monitoring",
        ],
        image:
            "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=900&q=75&auto=format&fit=crop",
    },
    {
        id: "security",
        category: "03",
        title: "Security & Access",
        sub: "Perimeter intelligence and biometric access",
        description:
            "From facial recognition entry to encrypted perimeter sensing, our security layer operates completely on-premise — no third-party cloud, no data leakage.",
        specs: [
            "Edge-computed biometric verification",
            "Encrypted local credential storage",
            "Smart perimeter sensing",
            "24/7 remote monitoring options",
        ],
        image:
            "https://images.unsplash.com/photo-1558002038-1055907df827?w=900&q=75&auto=format&fit=crop",
    },
    {
        id: "scenes",
        category: "04",
        title: "Scene Orchestration",
        sub: "Whole-home state composition",
        description:
            "A scene isn't just lighting. It is every system in your home shifting to a unified state in one action — lights, blinds, temperature, media, and access — all choreographed.",
        specs: [
            "Cross-system state orchestration",
            "Trigger-based and voice activation",
            "Geofence scene activation",
            "One-button room transformation",
        ],
        image:
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=900&q=75&auto=format&fit=crop",
    },
];

export default function SolutionsPage() {
    return (
        <>
            <Navbar />
            <main id="solutions-content">
                {/* Hero */}
                <section
                    className="relative min-h-[60vh] flex items-end"
                    style={{
                        background: "var(--clr-void)",
                        borderBottom: "1px solid rgba(245,244,240,0.06)",
                    }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at 30% 60%, rgba(200,169,110,0.07) 0%, transparent 70%)",
                        }}
                    />
                    <div className="section-container pb-20 pt-40 relative">
                        <span
                            className="block mb-4 text-xs tracking-[0.2em] uppercase"
                            style={{
                                fontFamily: "var(--font-sans)",
                                color: "var(--clr-gold)",
                            }}
                        >
                            Our Systems
                        </span>
                        <h1
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 7vw, 6rem)",
                                fontWeight: 300,
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "var(--clr-mist)",
                                maxWidth: "700px",
                            }}
                        >
                            Everything your
                            <br />
                            <em>home needs to think.</em>
                        </h1>
                    </div>
                </section>

                {/* Solution cards */}
                <section className="section-container py-24 lg:py-32">
                    <div className="flex flex-col gap-28">
                        {SOLUTIONS.map((sol, i) => (
                            <div
                                key={sol.id}
                                id={sol.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""
                                    }`}
                            >
                                {/* Image */}
                                <div
                                    className="rounded-2xl overflow-hidden lg:[direction:ltr]"
                                    style={{ aspectRatio: "16/10" }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={sol.image}
                                        alt={sol.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content */}
                                <div className="lg:[direction:ltr]">
                                    <div className="flex items-center gap-3 mb-5">
                                        <span
                                            className="w-6 h-px"
                                            style={{
                                                background:
                                                    i % 2 === 0 ? "var(--clr-accent)" : "var(--clr-gold)",
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.68rem",
                                                letterSpacing: "0.2em",
                                                textTransform: "uppercase",
                                                color:
                                                    i % 2 === 0 ? "var(--clr-accent)" : "var(--clr-gold)",
                                            }}
                                        >
                                            {sol.category} / {sol.sub}
                                        </span>
                                    </div>

                                    <h2
                                        className="mb-5"
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            fontSize: "clamp(2rem, 4vw, 3rem)",
                                            fontWeight: 300,
                                            lineHeight: 1.1,
                                            color: "var(--clr-mist)",
                                        }}
                                    >
                                        {sol.title}
                                    </h2>

                                    <p
                                        className="mb-8"
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontWeight: 300,
                                            fontSize: "0.95rem",
                                            lineHeight: 1.7,
                                            color: "var(--clr-text-secondary)",
                                        }}
                                    >
                                        {sol.description}
                                    </p>

                                    <ul className="flex flex-col gap-3 mb-10" role="list">
                                        {sol.specs.map((spec) => (
                                            <li
                                                key={spec}
                                                className="flex items-center gap-3"
                                                style={{
                                                    fontFamily: "var(--font-sans)",
                                                    fontWeight: 300,
                                                    fontSize: "0.85rem",
                                                    color: "var(--clr-text-secondary)",
                                                }}
                                            >
                                                <span
                                                    className="w-4 h-px flex-shrink-0"
                                                    style={{
                                                        background:
                                                            i % 2 === 0
                                                                ? "var(--clr-accent)"
                                                                : "var(--clr-gold)",
                                                    }}
                                                />
                                                {spec}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all duration-300 hover:opacity-85"
                                        style={{
                                            border: `1px solid ${i % 2 === 0 ? "rgba(140,180,184,0.4)" : "rgba(200,169,110,0.4)"}`,
                                            color: i % 2 === 0 ? "var(--clr-accent)" : "var(--clr-gold)",
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.75rem",
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Enquire about this system
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
