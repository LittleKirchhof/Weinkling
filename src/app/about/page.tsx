import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "About — Weinkling",
    description:
        "We are designers, engineers, and craftspeople who believe your home should work as hard as you do — invisibly, intelligently.",
};

const VALUES = [
    {
        number: "01",
        title: "Precision engineering",
        body: "Every system we build is specified down to the cable run, the protocol, and the latency tolerance. There is no guesswork in how we deploy.",
    },
    {
        number: "02",
        title: "Invisible by design",
        body: "The best technology is the kind you never notice. Our systems blend into architecture so seamlessly that what you experience is simply your intention, realised.",
    },
    {
        number: "03",
        title: "Lifetime partnership",
        body: "We don't install and disappear. Every Weinkling home receives proactive monitoring, remote diagnostics, and white-glove support for decades.",
    },
    {
        number: "04",
        title: "Privacy-first architecture",
        body: "Your data never leaves your property. Every Weinkling system runs on a local processor with zero mandatory cloud dependency.",
    },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main id="about-content">
                {/* Page Hero */}
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
                                "radial-gradient(ellipse at 60% 50%, rgba(140,180,184,0.07) 0%, transparent 70%)",
                        }}
                    />
                    <div className="section-container pb-20 pt-40 relative">
                        <span
                            className="block mb-4 text-xs tracking-[0.2em] uppercase"
                            style={{
                                fontFamily: "var(--font-sans)",
                                color: "var(--clr-accent)",
                            }}
                        >
                            About Weinkling
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
                            We build homes
                            <br />
                            <em>that understand you.</em>
                        </h1>
                    </div>
                </section>

                {/* Intro */}
                <section
                    className="section-container py-24 lg:py-32"
                    style={{ borderBottom: "1px solid rgba(245,244,240,0.06)" }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <p
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                                fontWeight: 300,
                                lineHeight: 1.5,
                                color: "var(--clr-mist)",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Founded by architects and systems engineers, Weinkling exists
                            because we were tired of home automation that required manuals
                            and app updates to operate.
                        </p>
                        <div className="flex flex-col gap-6">
                            <p
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: 300,
                                    fontSize: "0.95rem",
                                    lineHeight: 1.7,
                                    color: "var(--clr-text-secondary)",
                                }}
                            >
                                True intelligence doesn't announce itself. It simply makes
                                everything work. The lights that adjust as the sun moves.
                                The thermostat that settles before you notice you're cold.
                                The security system that verifies you without asking.
                            </p>
                            <p
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: 300,
                                    fontSize: "0.95rem",
                                    lineHeight: 1.7,
                                    color: "var(--clr-text-secondary)",
                                }}
                            >
                                We design, install, and maintain these systems for private
                                residences, luxury developments, and hospitality properties
                                across the region.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section
                    id="process"
                    className="section-container py-24 lg:py-32"
                >
                    <h2
                        className="mb-16"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 300,
                            letterSpacing: "-0.02em",
                            color: "var(--clr-mist)",
                        }}
                    >
                        Our principles
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14">
                        {VALUES.map((v) => (
                            <div
                                key={v.number}
                                className="flex flex-col gap-4 pb-10"
                                style={{ borderBottom: "1px solid rgba(245,244,240,0.06)" }}
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.68rem",
                                        fontWeight: 400,
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        color: "var(--clr-accent)",
                                    }}
                                >
                                    {v.number}
                                </span>
                                <h3
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "1.5rem",
                                        fontWeight: 400,
                                        color: "var(--clr-mist)",
                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    {v.title}
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontWeight: 300,
                                        fontSize: "0.9rem",
                                        lineHeight: 1.7,
                                        color: "var(--clr-text-secondary)",
                                    }}
                                >
                                    {v.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
