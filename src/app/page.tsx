import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroContainer from "@/components/hero/HeroContainer";
import ControlMethods from "@/components/sections/ControlMethods";
import IntroVideo from "@/components/sections/IntroVideo";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Weinkling — Intelligent Living",
  description:
    "Weinkling designs premium home automation systems that transform your environment into an extension of your intent. Precision-engineered. Seamlessly invisible.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroContainer />
        <ControlMethods />
        <IntroVideo />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
