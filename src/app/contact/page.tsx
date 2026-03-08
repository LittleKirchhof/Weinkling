"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main id="contact-content">
                <section
                    className="relative"
                    style={{
                        background: "var(--clr-void)",
                        minHeight: "100vh",
                    }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at 70% 30%, rgba(140,180,184,0.07) 0%, transparent 65%)",
                        }}
                    />

                    <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-screen py-32 relative items-start">
                        {/* Left: Contact information */}
                        <div className="pt-8 lg:pt-16">
                            <span
                                className="block mb-6 text-xs tracking-[0.2em] uppercase"
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    color: "var(--clr-accent)",
                                }}
                            >
                                Get in touch
                            </span>
                            <h1
                                className="mb-8"
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                    fontWeight: 300,
                                    lineHeight: 1.1,
                                    letterSpacing: "-0.025em",
                                    color: "var(--clr-mist)",
                                }}
                            >
                                Let's design your
                                <br />
                                <em>intelligent home.</em>
                            </h1>

                            <p
                                className="mb-12 max-w-[380px]"
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: 300,
                                    fontSize: "0.95rem",
                                    lineHeight: 1.7,
                                    color: "var(--clr-text-secondary)",
                                }}
                            >
                                Every project begins with an exploratory call where we listen
                                first. Share your vision, your timeline, and your property — we
                                handle everything else.
                            </p>

                            <div className="flex flex-col gap-6">
                                {[
                                    {
                                        label: "Email",
                                        value: "hello@weinkling.com",
                                    },
                                    {
                                        label: "Studio",
                                        value: "Monday – Friday, 9am – 6pm",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex flex-col gap-1 pb-5"
                                        style={{ borderBottom: "1px solid rgba(245,244,240,0.07)" }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.68rem",
                                                letterSpacing: "0.18em",
                                                textTransform: "uppercase",
                                                color: "var(--clr-text-muted)",
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                                fontWeight: 300,
                                                fontSize: "0.95rem",
                                                color: "var(--clr-text-secondary)",
                                            }}
                                        >
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Contact form */}
                        <div
                            id="demo"
                            className="pt-8 lg:pt-16"
                        >
                            <form
                                className="flex flex-col gap-6"
                                aria-label="Contact form"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { id: "contact-name", label: "Full name", type: "text", placeholder: "Your name" },
                                        { id: "contact-email", label: "Email address", type: "email", placeholder: "your@email.com" },
                                    ].map((field) => (
                                        <div key={field.id} className="flex flex-col gap-2">
                                            <label
                                                htmlFor={field.id}
                                                style={{
                                                    fontFamily: "var(--font-sans)",
                                                    fontSize: "0.7rem",
                                                    letterSpacing: "0.15em",
                                                    textTransform: "uppercase",
                                                    color: "var(--clr-text-muted)",
                                                }}
                                            >
                                                {field.label}
                                            </label>
                                            <input
                                                id={field.id}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                required
                                                className="px-4 py-3 rounded-lg outline-none transition-all duration-200 focus:ring-1"
                                                style={{
                                                    background: "rgba(245,244,240,0.04)",
                                                    border: "1px solid rgba(245,244,240,0.1)",
                                                    color: "var(--clr-text-primary)",
                                                    fontFamily: "var(--font-sans)",
                                                    fontWeight: 300,
                                                    fontSize: "0.9rem",
                                                }}
                                                onFocus={(e) =>
                                                    (e.target.style.borderColor = "rgba(140,180,184,0.5)")
                                                }
                                                onBlur={(e) =>
                                                    (e.target.style.borderColor = "rgba(245,244,240,0.1)")
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="contact-property"
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.15em",
                                            textTransform: "uppercase",
                                            color: "var(--clr-text-muted)",
                                        }}
                                    >
                                        Property type
                                    </label>
                                    <select
                                        id="contact-property"
                                        className="px-4 py-3 rounded-lg outline-none transition-all duration-200"
                                        style={{
                                            background: "rgba(245,244,240,0.04)",
                                            border: "1px solid rgba(245,244,240,0.1)",
                                            color: "var(--clr-text-primary)",
                                            fontFamily: "var(--font-sans)",
                                            fontWeight: 300,
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        <option
                                            value=""
                                            style={{ background: "#0a0a0f" }}
                                        >
                                            Select property type
                                        </option>
                                        {[
                                            "Private Residence",
                                            "Luxury Development",
                                            "Hospitality Property",
                                            "Commercial Space",
                                        ].map((o) => (
                                            <option key={o} value={o} style={{ background: "#0a0a0f" }}>
                                                {o}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="contact-message"
                                        style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.15em",
                                            textTransform: "uppercase",
                                            color: "var(--clr-text-muted)",
                                        }}
                                    >
                                        Tell us about your project
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        placeholder="Describe your space, your lifestyle, and what you'd like your home to do..."
                                        className="px-4 py-3 rounded-lg outline-none transition-all duration-200 resize-none"
                                        style={{
                                            background: "rgba(245,244,240,0.04)",
                                            border: "1px solid rgba(245,244,240,0.1)",
                                            color: "var(--clr-text-primary)",
                                            fontFamily: "var(--font-sans)",
                                            fontWeight: 300,
                                            fontSize: "0.9rem",
                                            lineHeight: 1.6,
                                        }}
                                        onFocus={(e) =>
                                            (e.target.style.borderColor = "rgba(140,180,184,0.5)")
                                        }
                                        onBlur={(e) =>
                                            (e.target.style.borderColor = "rgba(245,244,240,0.1)")
                                        }
                                    />
                                </div>

                                <button
                                    id="contact-submit"
                                    type="submit"
                                    className="self-start inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 hover:opacity-90 active:scale-95"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(140,180,184,0.2) 0%, rgba(200,169,110,0.15) 100%)",
                                        border: "1px solid rgba(140,180,184,0.45)",
                                        color: "var(--clr-mist)",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.8rem",
                                        fontWeight: 400,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        backdropFilter: "blur(12px)",
                                    }}
                                >
                                    Send Enquiry
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path
                                            d="M3 7h8M7 3l4 4-4 4"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
